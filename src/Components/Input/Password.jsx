import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'
import { useState } from 'react'

const Input = ({value,onChange,placeholder}) => {

  const [showPassword, setShowPassword] = useState(false)

  const taggleShowPassword = () =>{
    setShowPassword(!showPassword)
  }
  return (
    <div className='h-full w-full flex items-center justify-center border-[1px] p-2 rounded-sm'>
      <input 
        value={value}
        onChange={onChange}
        type={showPassword?"text":"password"} 
        placeholder={placeholder||"Password"}
        className='h-full w-full outline-none'
      />

      {showPassword?<FaRegEye
        className=' flex items-center justify-center mx-1'
        size={22}
        onClick={()=>taggleShowPassword()}
      />:<FaRegEyeSlash
        className=' flex items-center justify-center mx-1'
        size={22}
        onClick={()=>taggleShowPassword()}
      />}
    </div>
  )
}

export default Input