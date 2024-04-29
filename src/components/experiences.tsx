"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";

export function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-12/12 md:max-w-9/12 ml-10 md:ml-5 antialiased pt-10 relative">
        {experiences_list.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className= "text-white text-bold text-2xl md:text-5xl font-serif w-fit py-1 mb-1">
              {item.company}
            </h2>


            <p className={"text-md md:text-xl mb-1 text-[#d8895b] font-serif"}>
              {item.title}
            </p>
            <p className="text-sm md:text-md font-serif text-white mb-2 font-bold border-b-2 border-[#d8895b]">{item.date_start} - {item?.date_end == 'Invalid Date' ? 'Present' : item.date_end }</p>

            <div className="text-sm md:text-lg  prose prose-sm dark:prose-invert text-white">
              {item.description}
            </div>
            <Skills items={item.skills}/>

          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const experiences_list = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <p>
          Sit duis est minim proident non nisi velit non consectetur. Esse
          adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
          Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
          incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
          fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
          nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
          occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
          officia sint labore. Tempor consectetur excepteur ut fugiat veniam
          commodo et labore dolore commodo pariatur.
        </p>
        <p>
          Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
          veniam in commodo id reprehenderit adipisicing. Proident duis
          exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
        </p>
        <p>
          Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
          reprehenderit deserunt amet laborum consequat adipisicing officia qui
          irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
          Amet culpa officia aliquip deserunt veniam deserunt officia
          adipisicing aliquip proident officia sunt.
        </p>
      </>
    ),
    company: "React",
    date_start: new Date(2023, 0).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    date_end: new Date('').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    skills: ['Python'],
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
        <p>
          In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
          veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
          reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
          cillum ut mollit.
        </p>
      </>
    ),
    company: "Changelog",
    date_start: new Date(2023, 5).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    date_end: new Date(2023, 5).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    skills: ['Communication', 'Problem Solving'],
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <p>
          Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
          deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
          non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
          sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
          velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
          commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
        </p>
      </>
    ),
    company: "Launch Week",
    date_start: new Date(2023, 3).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    date_end: new Date(2023, 5).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    skills: ['Excel'],
  },
];

export const Skills = ({
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
      <p className="text-[#d8895b] font-serif mt-4 text-md">
              Skills:
            </p>
      {items.map((item:string, index:number) => (
          <span
            key={index} // Adding a unique key to each item
            className="inline-block bg-slate-700 rounded-lg px-2 py-1 font-serif font-semibold mt-2 mr-2 text-zinc-100 tracking-wide leading-relaxed text-md"
          >
            {item}
          </span>
      ))}
    </div>
  );
};