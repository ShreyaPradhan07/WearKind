import React, { useState } from "react";
import "./Ngo.css";

const Ngo = () => {
    const [ngoData, setNgoData] = useState({ name: "", url: "" });
    const [message, setMessage] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setNgoData({ ...ngoData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ngoData.name || !ngoData.url) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/addngo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ngoData),
            });

            const data = await response.json();

            if (data.success) {
                setMessage("NGO added successfully!");
                setNgoData({ name: "", url: "" }); // Clear the form
            } else {
                setMessage(data.message || "Failed to add NGO.");
            }
        } catch (error) {
            setMessage("Error: Could not connect to the server.");
        }
    };

    return (
        <div className="ngo-container">
            <h2>Add New NGO</h2>
            <form onSubmit={handleSubmit} className="ngo-form">
                <label>NGO Name:</label>
                <input
                    type="text"
                    name="name"
                    value={ngoData.name}
                    onChange={handleChange}
                    placeholder="Enter NGO Name"
                    required
                />

                <label>NGO URL:</label>
                <input
                    type="url"
                    name="url"
                    value={ngoData.url}
                    onChange={handleChange}
                    placeholder="Enter NGO Website URL"
                    required
                />

                <button type="submit">Submit</button>
            </form>
            {message && <p className="ngo-message">{message}</p>}
        </div>
    );
};

export default Ngo;
