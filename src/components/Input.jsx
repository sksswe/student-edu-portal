import React from 'react'
import img from "../components/More/picture.png"
import attach from "../components/More/attach.png"

const Input = () => {
  return (
    <div className='input'>
        <input type='text' placeholder='Type message'/>
        <div className="send">
            <img className='images' src={img}/>
            <input type='file' style={{display: "none"}} id='file'/>
            <label htmlFor='file'>
                <img className='images' src={attach}/>
            </label>
            <button className='btnn'>Send</button>
        </div>
    </div>
  )
}


export default Input