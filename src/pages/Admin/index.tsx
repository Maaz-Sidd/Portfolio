import React, { useEffect } from 'react'
import { Tabs } from '../../components/ui/tabs'
import AdminIntro from './adminIntro';
import { ProjectCardsAdmin } from './adminProjects';
import AdminContact from './adminContact';
import { Button } from '@nextui-org/button';
import Loader from '../../components/loading';
import AdminExperiences from './adminExperiences';
import AdminSkills from './adminSkills';

function Admin() {
  const [Logged, setLogged] = React.useState(false);

  useEffect(() => {
    if(!localStorage.getItem('token')){
      window.location.href = '/admin-login';
    } else {
      setLogged(true);
    }
  }, []);
    
    const tabs = [
        {
          title: "Intro",
          value: "Intro",
          content: (
            <div className="h-full w-full relative  rounded-2xl  bg-gradient-to-br from-purple-700 to-violet-900">
              <p className='p-5 md:p-10 text-xl md:text-4xl font-bold text-white'>Intro</p>
                <AdminIntro/>
            </div>
          ),
        },
        {
          title: "Skills",
          value: "Skills",
          content: (
            <div className="h-full w-full relative rounded-2xl  bg-gradient-to-br from-purple-700 to-violet-900">
              <p className='p-10 text-xl md:text-4xl font-bold text-white'>Skills</p>
              <AdminSkills/>
            </div>
          ),
        },
        {
          title: "Projects",
          value: "Projects",
          content: (
            <div className="w-full relative rounded-2xl  bg-gradient-to-br from-purple-700 to-violet-900">
              <p className='p-10 text-xl md:text-4xl font-bold text-white'>Projects</p>
              <ProjectCardsAdmin/>
              
            </div>
          ),
        },
        {
          title: "Experiences",
          value: "Experiences",
          content: (
            <div className="w-full relative rounded-2xl  bg-gradient-to-br from-purple-700 to-violet-900">
              <p className='p-10 text-xl md:text-4xl font-bold text-white'>Experiences</p>
              <AdminExperiences/> 
            </div>
          ),
        },
        {
          title: "Contact",
          value: "Contact",
          content: (
            <div className="h-full w-full relative rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900">
              <p className='p-10 text-xl md:text-4xl font-bold text-w'>Contact</p>
              <AdminContact/>
            </div>
          ),
        },
      ];
  return (

    <div>
      {Logged ? 
        <div className="w-screen m-0 p-0 bg-[#1A202C] relative flex flex-grow flex-col justify-center items-center antialiased">
            <div className="flex items-end justify-end w-full mr-5 mt-5">
              <Button className="mr-5" onClick={()=>{
                localStorage.removeItem("token");
                window.location.href = "/admin-login";}}>Logout</Button>
            </div>
            <div className="h-screen [perspective:1000px] relative b flex flex-col w-11/12 items-start justify-start my-5 mb-20">
                <Tabs tabs={tabs} />
            </div>
        </div>
                : <Loader/>}
    </div>
  )
}


export default Admin