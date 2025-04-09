// import React, { useState } from "react";
// import "./CreateStudyGroup.css";

// function CreateStudyGroup({ onSubmit, onClose }) {
//   const [groupName, setGroupName] = useState("");
//   const [groupPassword, setGroupPassword] = useState(""); // State for group password
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!groupName.trim()) {
//       setError("Group name is required.");
//       return;
//     }
  
//     if (!groupPassword.trim()) {
//       setError("Group password is required.");
//       return;
//     }
  
//     setIsLoading(true);
//     setError("");
  
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/study/create-groupstudy/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           groupName: groupName,
//           password: groupPassword,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to create study group.");
//       }
  
//       const data = await response.json();
//       console.log("Study group created:", data);
  
//       onSubmit(data);
//       onClose();
//     } catch (error) {
//       console.error("Error creating study group:", error);
//       setError("An error occurred while creating the study group. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   return (
//     <div className="create-study-group">
//       <h2>Create a New Study Group</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="groupName">Group Name</label>
//           <input
//             type="text"
//             id="groupName"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             placeholder="Enter study group name"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="groupPassword">Group Password</label>
//           <input
//             type="password"
//             id="groupPassword"
//             value={groupPassword}
//             onChange={(e) => setGroupPassword(e.target.value)}
//             placeholder="Set a password for the group"
//           />
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <div className="modal-buttons">
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? "Creating..." : "Create"}
//           </button>
//           <button type="button" onClick={onClose} disabled={isLoading}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateStudyGroup;

import React, { useState, useEffect } from "react";
import "./CreateStudyGroup.css";

function CreateStudyGroup({ onSubmit, onClose }) {
  const [groupName, setGroupName] = useState(""); // State for group name
  const [groupPassword, setGroupPassword] = useState(""); // State for group password
  const [error, setError] = useState(""); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [token, setToken] = useState(""); // State for storing the token

  useEffect(() => {
    // Fetch the token from localStorage when the component mounts
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log("Token from localStorage:", storedToken); // Debugging token
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if group name and password are provided
    if (!groupName.trim()) {
      setError("Group name is required.");
      return;
    }

    if (!groupPassword.trim()) {
      setError("Group password is required.");
      return;
    }

    // Ensure that the token is available and valid
    if (!token) {
      setError("You are not authenticated. Please sign in.");
      console.log("No token available"); // Debugging no token
      return;
    }

    setIsLoading(true);
    setError(""); // Reset any previous errors

    try {
      console.log("Making POST request with token:", token); // Debugging request details

      const response = await fetch("http://127.0.0.1:8000/api/study/create-groupstudy/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Sending token with Authorization header
        },
        body: JSON.stringify({
          groupName: groupName,
          password: groupPassword,
        }),
      });

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData); // Log full response data for debugging
        throw new Error(errorData.message || "Failed to create study group.");
      }

      const data = await response.json();
      console.log("Study group created:", data); // Log successful response data

      // Call onSubmit with the created group data
      onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error creating study group:", error);
      setError(error.message || "An error occurred while creating the study group. Please try again.");
    } finally {
      setIsLoading(false); // Disable loading state when request is complete
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

        {/* Display error message if any */}
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






