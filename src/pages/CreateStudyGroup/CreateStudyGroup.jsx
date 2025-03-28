import React, { useState } from "react";
import "./CreateStudyGroup.css";

function CreateStudyGroup({ onSubmit, onClose }) {
  const [groupName, setGroupName] = useState("");
  const [groupPassword, setGroupPassword] = useState(""); // State for group password
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      setError("Group name is required.");
      return;
    }

    if (!groupPassword.trim()) {
      setError("Group password is required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Replace this URL with your actual backend API endpoint
      const response = await fetch("https://your-backend-api.com/study-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: groupName,
          password: groupPassword, // Include the password in the request body
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create study group.");
      }

      const data = await response.json();
      console.log("Study group created:", data);

      // Call the onSubmit prop to notify the parent component
      onSubmit(data);

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error("Error creating study group:", error);
      setError("An error occurred while creating the study group. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-study-group">
      <h2>Create a New Study Group</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="groupName">Group Name</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter study group name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="groupPassword">Group Password</label>
          <input
            type="password"
            id="groupPassword"
            value={groupPassword}
            onChange={(e) => setGroupPassword(e.target.value)}
            placeholder="Set a password for the group"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="modal-buttons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </button>
          <button type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateStudyGroup;