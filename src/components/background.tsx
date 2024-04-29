"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import Typewriter from 'typewriter-effect';

export function BackgroundBeamsDemo() {
  return (
    <div className="h-screen w-screen m-0 p-0 bg-[#1A202C] relative flex flex-col justify-center items-center antialiased">
      <div className="max-w-2xl mx-auto p-0">
        <h1 className="relative z-10 text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-serif font-bold">
          Hi, I'm <br></br>Maaz Siddiqi
        </h1>
        <p></p>
        <p className="text-[#d8895b] max-w-lg font-serif mx-auto my-2 text-base text-center relative z-10">
        <Typewriter
          options={{
            strings: ['Mechatronics Engineer', 'Software Developer', 'Athlete'],
            autoStart: true,
            loop: true,
            deleteSpeed: 12,
          }} 
        />
        </p>
        

      </div>
      <BackgroundBeams />
    </div>
  );
}
