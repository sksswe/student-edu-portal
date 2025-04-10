import React from 'react'

export const Message = () => {
  return (
    <div className='message owner'>
        <div className="messageInfo">
            <img src='https://cdn.pixabay.com/photo/2016/03/12/21/05/boy-1252771_1280.jpg'/>
            <span>Just now</span>
        </div>
        <div className="messageContent">
            <p>Hello, How are you?</p>
            <img src='https://cdn.pixabay.com/photo/2019/07/09/08/03/boy-4326461_1280.jpg'/>
        </div>
    </div>
  )
}

export default Message