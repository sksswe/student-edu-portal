import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chats = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('token'); // get token from localStorage
        const response = await axios.get('http://127.0.0.1:8000/api/message/groups/list/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className='chats'>
      {groups.map(group => (
        <div className='userChat' key={group.id}>
          <img src='https://cdn.pixabay.com/photo/2022/09/08/15/16/cute-7441224_1280.jpg' alt='group' />
          <div className='userChatInfo'>
            <span>{group.group_name}</span>
            <p>Members: {group.members.length}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
