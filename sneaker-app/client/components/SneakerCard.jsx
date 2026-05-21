import { FaEdit, FaTrash } from "react-icons/fa";

export default function SneakerCard({ sneaker, onEdit, onDelete }) {
    
    // function for dollar amounts only
    const formatPrice = (cents) => {
        if (!cents) return "-";
        return `$${(cents / 100).toFixed(2)}`;
    }

    // pill colors
    function getStatusStyle(status) {
        if (status === "owned") return "bg-emerald-100 text-emerald-800";
        if (status === "wanted") return "bg-blue-100 text-blue-800";
        if (status === "sold") return "bg-slate-200 text-slate-600"

        return "bg-s"
    }
}