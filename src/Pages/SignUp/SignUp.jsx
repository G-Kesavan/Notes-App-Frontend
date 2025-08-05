import Navbar from '../../Components/Navbar/Navbar'
import Password from '../../Components/Input/Password'
import { Link, useNavigate } from 'react-router-dom'
import { validEmail } from '../../utils/helper'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

   const navigate = useNavigate()

  const handleSignUp = async (e) =>{
    e.preventDefault();

     if(!validEmail(email)) {
      setError("Please enter a valid email address")
      return;
     }

     if(!name){
      setError("Please enter a name")
      return;
     }

     if(!password){
      setError("Please enter a password")
      return;
     }

     setError('')

      try{
        const response = await axiosInstance.post("/create-account",{
          fullName:name,
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
      <Navbar/>
      <div className='flex justify-center items-center h-[92vh] w-full'>
        <div className='flex border-[1px]  rounded-lg px-4 py-5'>
          <form className='flex flex-col gap-2' onSubmit={handleSignUp}>
            <h4 
              className='flex w-full items-center justify-center'
            >Login</h4>
            <input 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              type="text" 
              placeholder='Name'
              className="input—box border-[1px] p-2 rounded-sm"
            />
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
              Sign Up
            </button>
            <p className='text-center' >
              Already have an account?{" "}
              <Link to= '/login' >Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp