"use client";
import  { useState } from "react";
import { TracingBeam } from "./ui/tracing-beam";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Fade } from "react-awesome-reveal";

export default function ExperiencesSection() {

  const {portfolioData} = useSelector((state: RootState) => state.root);
  

  if (!portfolioData) {
    return null; // or any other handling for null portfolioData
  }

  const  {experience}  = portfolioData!;
  
  if(!experience){
    return null;
  }

  type Experience = {
    title: string;
    description: string;
    company: string;
    date_start: string;
    date_end: string;
    skills: string[];
  }

  const [Items] = useState<Experience[]>(experience);
  //setItems(experience);
  return (
    <TracingBeam>        
          <div className="max-w-12/12 lg:max-w-9/12 ml-10 lg:ml-5 antialiased pt-10 relative">
        {Items.slice().reverse().map((item, index) => (
          <Fade direction='right' className='flex items-center justify-center' delay={200}>

          <div key={`content-${index}`} className="mb-10">
            <h2 className= "text-white text-bold text-2xl lg:text-4xl font-serif w-fit py-1 mb-1">
              {item.company}
            </h2>


            <p className={"text-md lg:text-xl mb-1 text-[#d8895b] font-serif"}>
              {item.title}
            </p>
            <p className="text-sm lg:text-md font-serif text-white mb-2 font-bold border-b-2 border-[#d8895b]">{item.date_start} - {item?.date_end == '' ? 'Present' : item.date_end }</p>

            <div className="text-sm lg:text-lg  prose prose-sm dark:prose-invert text-white">
              {item.description}
            </div>
            <Skills items={item.skills}/>

          </div>
          </Fade>
        ))}
      </div>
    </TracingBeam>
  );
}



export const Skills = ({
  items,
}: {
  items: string[];
}) => {
  if (items[0] == null){
    return null;
  }
  return (
    <div>
      <p className="text-[#d8895b] font-serif mt-4 text-md">
              Skills:
            </p>
      {items.map((item:string, index:number) => (
          <span
            key={index} // Adding a unique key to each item
            className="inline-block bg-slate-700 rounded-lg px-2 py-1 font-serif font-semibold mt-2 mr-2 text-zinc-100 tracking-wide leading-relaxed text-sm lg:text-md"
          >
            {item}
          </span>
      ))}
    </div>
  );
};