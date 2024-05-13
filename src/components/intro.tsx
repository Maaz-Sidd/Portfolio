"use client";
import { BackgroundBeams } from "./ui/background-beams";
import Typewriter from 'typewriter-effect';
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { Fade } from "react-awesome-reveal";

export function IntroSection() {

  const {portfolioData} = useSelector((state: RootState) => state.root);

  if (!portfolioData) {
    return null; // or any other handling for null portfolioData
  }

  const  {intro}  = portfolioData!;
  type IntroType = {
    name: string;
    info: string[]; 
  };

  const { name, info} = intro[0]! as IntroType;

  return (
    <div className="h-screen w-screen m-0 p-0 bg-[#1A202C] relative flex flex-col justify-center items-center antialiased">
      <BackgroundBeams />

      {portfolioData && (
      
      <div className="max-w-2xl mx-auto p-0">
      <Fade direction="down" triggerOnce>  
        <h1 className="relative z-10 text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-serif font-bold">
          Hi, I'm <br></br>{name || ''}
        </h1>
        </Fade>

        <Fade direction="up" triggerOnce>
        <p className="text-[#d8895b] max-w-lg font-serif mx-auto my-2 text-base text-center relative z-10">
        <Typewriter
          options={{
            strings: info || [''],
            autoStart: true,
            loop: true,
            deleteSpeed: 12,
          }} 
        />
        </p> 
        </Fade>
      </div>
      )}
    </div>
  );
}
