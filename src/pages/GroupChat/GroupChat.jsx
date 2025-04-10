import React, { useState } from 'react';
import './GroupChat.css';
import Sidebar from '../../components/Sidebar';
import Chat from '../../components/Chat';

const GroupChat = () =>{
  return(
    <div className='home'>
      <div className="containers">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default GroupChat