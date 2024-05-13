import './App.css'
import { IntroSection } from './components/intro.tsx'
import { BackgroundGradient } from "./components/ui/background-gradient.tsx";
import { ProjectCards } from './components/projects-card.tsx';
import ExperiencesSection  from './components/experiences.tsx';
import  Skills  from './components/skills.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store.ts';
import emailImage from './assets/email.png';
import GithubImage from './assets/github2.png';
import LinkedInImage from './assets/linkedin.png'
import { Fade } from "react-awesome-reveal";



function NavbarLink({text, link, border }: {text:string, link:string, border:boolean}){

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



function Home() {
//className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-[#d69f1e] dark:bg-[#d69f1e]"
  const navLinks = [
    { text: 'Home',        link: '#home' , border: false},
    { text: 'About',        link: '#about' , border:false},
    { text: 'Projects',     link: '#projects', border: false},
    { text: 'Experiences',  link: '#experiences', border: false},
    { text: 'Contact',      link: '#contact', border: true},
]
  const {portfolioData} = useSelector((state: RootState) => state.root);
  

  if (!portfolioData) {
    return null; // or any other handling for null portfolioData
  }

  type IntroType = {
    about: String; 
  };

  type ContactType = {
    gitHub: string;
    email: string;
    linkedIn: string;
  };
  const {contact} = portfolioData!;
  const  {intro}  = portfolioData!;
  const { about } = intro[0]! as IntroType;
  const { gitHub, email, linkedIn } = contact[0]! as ContactType;
  
  return (
    <>
    <div id='home' className='flex flex-col'>
      <div className="relative w-full flex items-center justify-center">
        <div className={`fixed top-6 inset-x-0 max-w-2xl mx-auto z-50 flex items-center justify-center `} >
            <div className=" bg-[#0b0d0e] border-[#d8895b] border-2 rounded-[100px] flex items-center justify-center shadow">
                            {navLinks.map((navLink, index)=>{
                                return (
                                    <NavbarLink key={index} text={navLink.text} link={navLink.link} border={navLink.border}/>
                                )
                            })}
            </div>
        </div>
    </div>
      <IntroSection/>
      
    </div>
    
    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
      <Fade className='flex items-center justify-center' delay={200}>
        <div id='about' className='flex flex-col min-h-content w-11/12 md:w-7/12 mb-5'> 
          <BackgroundGradient >
            <div id='about' className='p-3 rounded-[19px] bg-[#1A202C]'> 
            <h1 className="relative z-10 text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center font-serif font-bold mt-3">
                About me</h1>
            <p className='text-slate-200 mt-6 mx-2 text-sm md:text-base font-serif mb-10'> {about || ''}</p>
            </div>
          </BackgroundGradient>                     
          </div>
      </Fade>
    </div>
    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
    <Fade className='flex justify-center' delay={200}>
      <div  className=' flex flex-col min-h-content w-11/12 md:w-7/12 mb-20'>  
        <h1 className="relative z-10 text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center font-serif font-bold mt-3">
          Skills</h1>
         <Skills/>

      </div>
      </Fade>
    </div>

    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
    
      <div id='projects' className=' flex flex-col w-11/12 xl:w-7/12 mb-10'>  
      <h1 className="relative z-10 text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center font-serif font-bold mt-6 mb-10">
          Projects</h1>
         <ProjectCards/>

      </div>
    </div>
    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
      <div id='experiences' className=' flex flex-col min-h-content w-11/12 lg:w-7/12 mb-20'>  
        <h1 className="relative z-10 text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center font-serif font-bold mt-6">
          Experiences</h1>
          <ExperiencesSection/>

      </div>
    </div>
    <div className=' w-screen flex bg-[#1A202C] justify-center'> 
      <div id='contact' className=' flex flex-col min-h-content w-11/12 lg:w-7/12 '>  
        <h1 className="relative z-10 text-5xl md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center font-serif font-bold mt-6">
          Contact</h1>
          <div className='border-b-2 border-[#d8895b]'></div>
            <p className='text-white text-center mt-4 font-serif text-lg'>Get in touch with me</p> 
            <div className='flex items-center justify-center content-center mt-4'>
              <a href= {gitHub}>
              <div className="rounded-full overflow-hidden mr-2">
                <img src={GithubImage} className='w-6 h-auto bg-transparent' ></img>
              </div>
              </a>
              <button onClick={() => window.location.href = `mailto:${email}`}>
              <div className="rounded-full overflow-hidden mr-2">
                <img src={emailImage} className='w-6 h-auto bg-transparent' ></img>
              </div>
              </button>
              <a href= {linkedIn}>
              <div className="rounded-full overflow-hidden mr-2">
                <img src={LinkedInImage} className='w-6 h-auto bg-transparent' ></img>
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

export default Home
