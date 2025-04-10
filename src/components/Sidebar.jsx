// import React from 'react'
// import Navbar from './Navbar'
// import Search from './Search'
// import Chats from './Chats'

// const Sidebar = () => {
//   return (
//     <div className='sidebars'>
//         <Navbar/>
//         <Search/>
//         <Chats/>
//         <div className="createGroupWrapper">
//           <button className="createGroupBtn">Create GroupChat</button>
//         </div>
//     </div>
    
//   )
// }

// export default Sidebar

import React, { useState } from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';
import MessageGroupModal from '../pages/Modal/MessageGroupModal';

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='sidebars'>
      <Navbar />
      <Search />
      <Chats />

      <div className="MessageGroupWrapper">
        <button className="createGroupBtn" onClick={() => setShowModal(true)}>
          Create GroupChat
        </button>
      </div>

      {showModal && <MessageGroupModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Sidebar;
