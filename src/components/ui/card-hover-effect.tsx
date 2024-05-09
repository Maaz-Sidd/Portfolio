import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { Button } from "@nextui-org/react";

export const HoverEffect = ({
  items,
  className,
  admin,
  handleDelete,
  handleEdit
}: {
  items: {
    title: string;
    description: string;
    languages: string[];
    frameworks: string[];
    link: string[];
    
  }[];
  className?: string;
  admin?: boolean;
  handleDelete: (index: number) => void;
  handleEdit: (index: number) => void;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  return (
    <div
      className={
        `grid grid-cols-1 md:grid-cols-2  py-6 ${className}`
      }
    >
      {items.slice().reverse().map((item, idx) => (
        <div
          className="relative group  block p-1 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#d8895b] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <Links items={item.link}/>
            <CardDescription>{item.description}</CardDescription>
            
            <Languages items={item.languages}/>
            
            <FrameWorks items={item.frameworks}/>
            {admin  && (
            <div className="flex flex-column mt-2 items-center align-end justify-end bottom-0 w-full"> 
                <Button className="mr-3" color="danger" onClick={()=>{handleDelete(Math.abs(idx-items.length+1))}}>Delete</Button>
                <Button onClick={()=>{handleEdit(Math.abs(idx-items.length+1))}}>Edit</Button>
            </div>)}
            
          </Card>
        </div>
      ))}
      
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={
        "rounded-3xl h-full w-full p-1 overflow-hidden bg-black border border-[#d8895b]/[0.2] group-hover:border-slate-700 relative z-20"
      }
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={"text-zinc-100 font-bold tracking-wide border-[#d8895b] border-b-2 font-serif text-md md:text-2xl"}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={
        " text-zinc-300 tracking-wide leading-relaxed font-serif text-sm md:text-md"}
    >
      {children}
    </p>
  );
};

export const Languages = ({
  className,
  items,
}: {
  className?: string;
  items: string[];
}) => {
  if (items[0] == null){
    return null;
  }
  return (
    <div>
      <p className="text-zinc-100 font-serif mt-4 text-sm">
              Languages:
            </p>
      {items.map((item:string, index:number) => (
          <span
            key={index} // Adding a unique key to each item
            className="inline-block bg-slate-700 rounded-lg px-2 py-1 font-serif font-semibold mt-2 mr-2 text-zinc-100 tracking-wide leading-relaxed text-xs"
          >
            {item}
          </span>
      ))}
    </div>
  );
};

export const FrameWorks = ({
  className,
  items,
}: {
  className?: string;
  items: string[];
}) => {

  if (items[0] == null){
    return null;
  }
  return (
    <div >
      <p className="text-zinc-100 font-serif mt-1 text-sm">
              Frameworks:
            </p>
      {items.map((item:string, index:number) => (

        
          <span
            key={index} // Adding a unique key to each item
            className="inline-block bg-slate-700 rounded-lg px-2 py-1 font-serif font-semibold mt-2 mr-2 text-zinc-100 tracking-wide leading-relaxed text-xs"
          >
            {item}
          </span>
      ))}
    </div>
  );
};

export const Links = ({
  className,
  items,
}: {
  className?: string;
  items: string[];
}) => {
  const gitHubPattern = /^https?:\/\/github\.com\//;
  const YoutubePattern = /^https?:\/\/youtube\.com\//;
  if (!Array.isArray(items)) {
    return null; // Return null or handle the case where items is not an array
  }
  const githubLinks = items.filter(item => gitHubPattern.test(item));
  const youtubeLinks = items.filter(item => YoutubePattern.test(item));
  // Filter non-GitHub links
  const otherLinks = items.filter(item => !gitHubPattern.test(item));

  return (
    <div className="flex flex-row-reverse mt-2">
      {otherLinks.map((item:string, index:number) => (
        <a key={index} href={item} target="_blank" rel="noopener noreferrer">
          <img
            src="/src/assets/redirect.svg"
            alt="Redirect Logo"
            className="w-5 h-auto mr-2 bg-transparent"
          />
        </a>
      ))}
      {githubLinks.map((item:string, index:number) => (
        <a key={index} href={item} target="_blank" rel="noopener noreferrer">
          
          <img
            src="/src/assets/github.svg"
            alt="GitHub Logo"
            className="w-5 h-auto mr-2 bg-transparent"
          />
        </a>
      ))}
      {youtubeLinks.map((item:string, index:number) => (
        <a key={index} href={item} target="_blank" rel="noopener noreferrer">
          <img
            src="/src/assets/youtube.png"
            alt="GitHub Logo"
            className="w-5 h-auto mr-2 bg-transparent"
          />
        </a>
      ))}
      
    </div>
  );
};
