import React from 'react'
import {FaMagnifyingGlass} from 'react-icons/fa6'

const Search = ({value,onChange}) => {
  return (
    <div className='flex bg-blue-100 items-center justify-center px-2 rounded-lg'>
      <input 
        value={value}
        type="search" 
        className=' h-[5vh] md:w-full w-20.5
         px-2 outline-none'
        placeholder='Search Item'
        onChange={onChange}
      />
      <FaMagnifyingGlass/>
    </div>
  )
}

export default Search