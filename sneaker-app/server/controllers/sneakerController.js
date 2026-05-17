const Sneaker = require("../models/Sneaker");

const getAllSneakers = async (req, res) => {
    try {
        const sneakers = await Sneaker.findAll({
            where: { user_id: req.user.id },
            order: [["created_at", "DESC"]],
        })
        res.json(sneakers);

    } catch(error) {
        console.error("Get sneakers error:", error);
        res.status(500).json({ error: "Failed to fetch sneakers"})
    }
}

const createSneaker = async (req, res) => {
    try {
        const { brand, model, size, status, purchase_price, current_value, condition } = req.body;

        if (!brand || !model || !size || !status) {
            return res.status(400).json({ error: "Brand, size, model, and status are required!"})
        }

        const statusValidation = ["owned", "wanted", "sold"];
        if (!statusValidation.includes(status)) {
            return res.status(400).json({ error: "Status must be wanted, owned, or sold!"})
        }

        const sneaker = await Sneaker.create({
            user_id: req.user.id,
            brand,
            model,
            size,
            status,
            purchase_price: purchase_price || null,
            current_value: current_value || null,
            condition: condition || null
        })

        res.status(201).json(sneaker);
    } catch(error) {
        console.error("Uh oh! Something went wrong:", error);
        res.status(500).json({ error: "Failed to create sneaker"})
    }
}

const updateSneaker = async (req, res) => {
    try {
        const sneaker = await Sneaker.findByPk(req.params.id);

        if (!sneaker) return res.status(404).json({ error: "Sneaker not found!"});
        if (sneaker.user_id !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" })
        }

        await sneaker.update(req.body);
        res.json(sneaker)
        
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong on our end!"})
    }
}

const deleteSneaker = async (req, res) => {
    try {
        const sneaker = await Sneaker.findByPk(req.params.id);

        if (!sneaker) return res.status(404).json({ error: "Sneaker not found!"});
        if (sneaker.user_id !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" })
        }

        await sneaker.destroy();
        res.json({ message: "Sneaker deleted successfully!"});

    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Oops! Something went wrong on our end!" });
    }
}

module.exports = { getAllSneakers, createSneaker, updateSneaker, deleteSneaker};

