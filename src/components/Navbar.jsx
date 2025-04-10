import React from 'react'

const Navbar = () => {
  return (
    <div className='navbars'>
        <span className="logo">Group Chat</span>
        <div className="user">
            <img src='https://cdn.pixabay.com/photo/2022/09/08/15/16/cute-7441224_1280.jpg' alt=''/>
            <span>Rayhan</span>
            <button className='btn'>logout</button>
        </div>
    </div>
  )
}

export default Navbar