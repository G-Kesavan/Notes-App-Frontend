import React from 'react'
import { initialOfName } from '../../utils/helper'

const Profile = ({LogOut, userInfo}) => {
  return (
    <div className='flex gap-2 items-center justify-center'>
        <div className='bg-blue-100 p-2 h-[5vh] w-[5vh] flex items-center justify-center rounded-full'>
            <h1>{initialOfName(userInfo?.fullName)}</h1>
        </div>
        <div className='flex flex-col items-center justify-cente px-2.5'>
            <p>{userInfo?.fullName}</p>
            <button className='underline cursor-pointer' onClick={LogOut}>Logout</button>
        </div>
    </div>
  )
}

export default Profile