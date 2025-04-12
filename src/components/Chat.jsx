import React from 'react';
import { Link } from 'react-router-dom'; // 🔄 Import Link
import more from "../components/More/more.png";
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Rayhan Khan</span>
        <div className="chatIcons">
          {/* ✅ Updated button to a Link */}
          <Link to="/user-dashboard" className="btnn">Dashboard</Link>
          <img src={more} alt="More" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
