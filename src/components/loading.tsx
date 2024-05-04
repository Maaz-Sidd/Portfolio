import React from 'react'
import { BackgroundBeams } from "./ui/background-beams";

function Loader() {
  return (
    <div className="h-screen w-screen m-0 p-0 bg-[#1A202C] relative flex flex-col justify-center items-center antialiased">
      <BackgroundBeams />
    </div>
  )
}

export default Loader