import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function useSneakers() {
    // Use states
    const [sneakers, setSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all sneakers for user
        async function fetchSneakers() {
            try {
                setLoading(true);
                setError(null)

                const response = await fetch(`${API_URL}/api/sneakers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                })
                
                if (!response.ok) {
                    // JWT token from local storage
                    throw new Error("Couldn't fetch your sneaker data");
                }

                // Step 2
                const data = await response.json();
                setSneakers(data);

            } catch (error) {
                console.error("Sneaker fetching error:", error);
                setError(error.message)

            } finally {
                // Stop loading if fetch is successful or failure
                setLoading(false);
            }
        }


    useEffect(() => {
        // Call async function
        fetchSneakers();
    }, []);

    return { loading, sneakers, setSneakers, error, fetchSneakers };
}

