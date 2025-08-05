import Navbar from '../../Components/Navbar/Navbar'
import Password from '../../Components/Input/Password'
import { Link, useNavigate } from 'react-router-dom'
import { validEmail } from '../../utils/helper'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

const loginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault();

     if(!validEmail(email)) {
      setError("Please enter a valid email address")
      return;
     }

     if(!password){
      setError("Please enter a password")
      return;
     };

     setError('')

     try{
        const response = await axiosInstance.post("/login",{
          email : email,
          password : password
        })

        if(response.data && response.data.accessToken){
          localStorage.setItem("token",response.data.accessToken);
          navigate("/dashboard")
        }
     }catch(error){
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
        }else{
          setError("An Unexpected error occurred. pleace try again")
        }
     }
  }
  return (
    <>

      <div className='flex justify-center items-center h-[92vh] w-full'>
        <div className='flex border-[1px]  rounded-lg px-4 py-5'>
          <form className='flex flex-col gap-2' onSubmit={handleLogin}>
            <h4 
              className='flex w-full items-center justify-center'
            >Login</h4>
            <input 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email" 
              placeholder='Email'
              className="input—box border-[1px] p-2 rounded-sm"
            />
            <Password
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            {error&&<p>{error}</p>}

            <button 
              type="submit" 
              className="btn—primary border-[1px] rounded-sm p-1"
            >
              Login
            </button>
            <p className=' text-center' >
              Not registered yet?{" "}
              <Link to= '/signup' >Create an Account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default loginPage