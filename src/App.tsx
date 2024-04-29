import { useState } from 'react'
import './App.css'
import { ThreeDCardDemo } from './components/3d-comp'
import { BackgroundBeamsDemo } from './components/background.tsx'
import { BackgroundGradient } from "./components/ui/background-gradient";
import { CardHoverEffectDemo } from './components/projects-card.tsx';
import { TracingBeamDemo } from './components/experiences.tsx';



function NavbarLink({text = '', link = '', border = false}){

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = link.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        smoothScrollTo(targetElement, 800); // Adjust the duration as needed
    }
  };
  return (
      <>
          <a className={` text-xs sm:text-base header-link transition font-serif font-bold hover:text-[#d48759] m-1 sm:m-2 p-[10px] text-center rounded-[100px] text-slate-200 ${
      border ? "border-2 border-[#d48759]" : ""} `} href={link} onClick={handleClick}>
              {text}
          </a>
      </>
  )
}

function smoothScrollTo(targetElement: HTMLElement, duration: number) {
  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.offsetTop - 120;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
      if (startTime === null) {
          startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      const scrollProgress = Math.min(timeElapsed / duration, 1);
      const easing = easeInOutQuad(scrollProgress);
      window.scrollTo(0, startPosition + distance * easing);
      if (timeElapsed < duration) {
          requestAnimationFrame(animation);
      }
  }

  function easeInOutQuad(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  requestAnimationFrame(animation);
}



function App() {

  const navLinks = [
    { text: 'Home',        link: '#home' },
    { text: 'About',        link: '#about' },
    { text: 'Projects',     link: '#projects'},
    { text: 'Experiences',  link: '#experiences'},
    { text: 'Contact',      link: '#contact', border: true},
]

  return (
    <>
    <div id='home' className='flex flex-col'>

      <div className="relative w-full flex items-center justify-center">
        <div className={`fixed top-6 inset-x-0 max-w-2xl mx-auto z-50 flex items-center justify-center `} >
            <div className=" bg-[#0b0d0e] border-[#d8895b] border-2 rounded-[100px] flex items-center justify-center shadow">
                            {navLinks.map((navLink, index)=>{
                                return (
                                    <NavbarLink text={navLink.text} link={navLink.link} border={navLink.border}/>
                                )
                            })}
            </div>
        </div>
    </div>
      <BackgroundBeamsDemo/>
      
    </div>
    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
      <div id='about' className='flex flex-col min-h-content w-11/12 md:w-7/12 mb-5'> 
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-[#d69f1e] dark:bg-[#d69f1e]">
        <div id='about' className='p-3 rounded-[19px] bg-[#1A202C]'> 
        <h1 className="relative z-10 text-2xl md:text-4xl  bg-clip-text text-transparent text-white text-center font-serif font-bold mt-3">
          About me</h1>
          <p className='text-slate-200 mt-6 mx-2 text-sm md:text-base font-serif mb-10'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged. 
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
          including versions of Lorem Ipsum. fjiosdjfisjf isdf jais jfdiojsofi jsdif jsdiof jsodjf sidjf sdofojfosj fosjdfoisj f js dfosjdf 
          idjfisjfisjfis jfisjfiosj foidjoisfj siodfjiosj fiojsfoij siofjsoijfoisjfois jfos jfosjfoijs fiojsiof jsiof jisjfisjfijsiodjfosijf oisj fois jfois jof joidf jsoij isjof
          si fjoisj dfio jsiodfj siofj iosfj oisf joisjfiosdjfoisj dfoisjfi jij dfj dsijf isojiofsdj fios fjsdijfosdjf;osjf;sjfisjf;s fjsi fjisj fi jsfijsdojfsoj</p>
        </div>
       </BackgroundGradient>                     
      </div>
    </div>
    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
      <div  className=' flex flex-col min-h-content w-11/12 md:w-7/12 mb-20'>  
        <h1 className="relative z-10 text-2xl md:text-4xl  bg-clip-text text-transparent text-white text-center font-serif font-bold mt-3">
          Skills</h1>
         

      </div>
    </div>

    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
      <div id='projects' className=' flex flex-col min-h-content w-11/12 xl:w-7/12 mb-10'>  
        <h1 className="relative z-10 text-2xl md:text-4xl  bg-clip-text text-transparent text-white text-center font-serif font-bold mt-6">
          Projects</h1>
         <CardHoverEffectDemo/>

      </div>
    </div>
    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
      <div id='experiences' className=' flex flex-col min-h-content w-11/12 lg:w-7/12 mb-40'>  
        <h1 className="relative z-10 text-2xl md:text-4xl  bg-clip-text text-transparent text-white text-center font-serif font-bold mt-6">
          Experiences</h1>
          <TracingBeamDemo/>

      </div>
    </div>
    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
      <div id='contact' className=' flex flex-col min-h-content w-11/12 lg:w-7/12 '>  
        <h1 className="relative z-10 text-2xl md:text-4xl  bg-clip-text text-transparent text-white text-center font-serif font-bold mt-6">
          Contact</h1>
          <div className='border-b-2 border-[#d8895b]'></div>
            <p className='text-white text-center mt-4 font-serif text-lg'>Get in touch with me</p> 
            <div className='flex items-center justify-center content-center mt-4'>
              <a href='https://github.com/Maaz-Sidd'>
              <div className="rounded-full overflow-hidden mr-2">
                <img src='/src/assets/github2.png' className='w-6 h-auto bg-transparent' ></img>
              </div>
              </a>
              <button onClick={() => window.location.href = 'mailto:m.maaz_6@hotmail.com'}>
              <div className="rounded-full overflow-hidden mr-2">
                <img src='/src/assets/email.png' className='w-6 h-auto bg-transparent' ></img>
              </div>
              </button>
              <a href='https://www.linkedin.com/in/muhammad-maaz-sidd/'>
              <div className="rounded-full overflow-hidden mr-2">
                <img src='/src/assets/linkedin.png' className='w-6 h-auto bg-transparent' ></img>
              </div>
              </a>
          </div>  
          
      </div>
      
    </div>
    <div className='flex item-center w-screen bg-[#1A202C] justify-center'>
            <p className='font-serif text-white mt-5 mb-20'>© 2024 Maaz Siddiqi, All Rights Reserved</p>
          </div>
    </>
  )
}

export default App
