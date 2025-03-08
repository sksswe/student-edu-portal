import React from "react";
import { Link } from "react-router-dom";
import "./StudyGroup.css"; // Import the CSS file

function StudyGroup() {
  // Example data for study groups
  const studyGroups = [
    { id: 1, name: "Math Study Group", description: "Focus on algebra and calculus." },
    { id: 2, name: "Science Study Group", description: "Discuss physics and chemistry topics." },
    { id: 3, name: "History Study Group", description: "Explore world history events." },
  ];

  return (
    <div className="study-group-container">
      <h1>Study Groups</h1>
      <div className="study-group-list">
        {studyGroups.map((group) => (
          <div key={group.id} className="study-group-item">
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            <button>Join Group</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyGroup;