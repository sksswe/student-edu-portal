import React from 'react'

const Search = () => {
  return (
    <div className='search'>
        <div className="searchForm">
            <input type="text" placeholder='Find a User'/>
        </div>
        <div className='userChat'>
            <img src='https://cdn.pixabay.com/photo/2022/09/08/15/16/cute-7441224_1280.jpg'/>
            <div className='userChatInfo'>
                <span>Rayhan Khan</span>
            </div>
        </div>
    </div>
  )
}


export default Search