import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStudyGroup.css";

function CreateStudyGroup({ onSubmit, onClose }) {
  const [groupName, setGroupName] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      setError("Group name is required.");
      return;
    }

    if (groupPassword && !groupPassword.trim()) {
      setError("Group password cannot be just spaces.");
      return;
    }

    if (!token) {
      setError("You are not authenticated. Please sign in.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/study/create-groupstudy/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          groupName: groupName,
          password: groupPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create study group.");
      }

      const data = await response.json();
      alert(data.message || "Group successfully created!");

      // Navigate to /study-group after creating the group
      navigate("/study-group");

      if (typeof onSubmit === "function") {
        onSubmit(data);
      }

      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      console.error("Error creating study group:", error);
      setError(error.message || "An error occurred while creating the study group.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (typeof onClose === "function") {
      onClose();
    }
    navigate("/study-group"); // Navigate to study-group page if cancel
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
          <button type="button" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateStudyGroup;
