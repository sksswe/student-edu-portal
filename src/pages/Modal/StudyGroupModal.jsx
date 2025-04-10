import React, { useState } from 'react';
import './StudyGroupModal.css';
import CreateStudyGroup from '../CreateStudyGroup/CreateStudyGroup';
import JoinStudyGroup from '../JoinStudyGroup/JoinStudyGroup';

const StudyGroupModal = ({ onClose, onCreateGroup, onJoinGroup }) => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create Group
          </button>
          <button 
            className={`tab-btn ${activeTab === 'join' ? 'active' : ''}`}
            onClick={() => setActiveTab('join')}
          >
            Join Group
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'create' ? (
            <CreateStudyGroup onCreate={onCreateGroup} />
          ) : (
            <JoinStudyGroup onJoin={onJoinGroup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyGroupModal;