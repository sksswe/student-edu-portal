import React from 'react'
import more from "../components/More/more.png"
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
  return (
    <div className='chat'>
        <div className='chatInfo'>
            <span>Rayhan Khan</span>
            <div className="chatIcons">
                <button className='btnn'>Dashboard</button>
                <img src={more}/>
            </div>
        </div>
        <Messages/>
        <Input/>
    </div>
  )
}


export default Chat