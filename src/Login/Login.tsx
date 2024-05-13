import React from 'react'
import { BackgroundBeams } from '../components/ui/background-beams'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';


function Login() {
  ;

    const [user, setUser] = React.useState({
        username: "",
        password: ""
    });

    const login = async()=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/portfolio/admin-login`, user);
            if(response.data.success){
                localStorage.setItem('token', JSON.stringify(response.data));
                window.location.href = '/admin';
                toast.success('Logged in successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            } else {
                toast.error('Invalid username or password', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            }
        } catch (error) {
            toast.error('Internal error', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        }
    }
  return (
    <div className="h-screen w-screen m-0 p-0 bg-[#1A202C] relative flex flex-col justify-center items-center antialiased">
    <div className='w-11/12 md:w-1/5 rounded-2xl bg-black flex flex-col items-center justify-center z-[1000] h-[50%]'>
      <h1 className='text-white font-serif my-5 text-3xl font-bold'>Admin Login</h1>
      <form className="flex flex-col items-center">
        <Input type="Name" label="username" className='mt-4' value={user.username} onChange={(e) =>  setUser({...user, username: e.target.value})}/>
        <Input type="password" label="password" className='mt-4' value={user.password} onChange={(e) =>  setUser({...user, password: e.target.value})}/>
        <Button className='mb-10 mt-10' onClick={login}>Login</Button>
      </form>
    </div>
    <BackgroundBeams />

    <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}/>
  </div>
  )
}

export default Login