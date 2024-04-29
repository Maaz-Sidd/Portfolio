import { HoverEffect, Languages } from "./ui/card-hover-effect";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useState, useMemo} from "react";

export function CardHoverEffectDemo() {

  const [selectedLanguageKeys, setSelectedLanguageKeys] = useState(new Set<string>());
  const [selectedFrameworkKeys, setSelectedFrameworkKeys] = useState(new Set<string>());

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects_list);

  const handleLanguageFilterChange = (selectedKeys: Set<string>) => {
    setSelectedLanguageKeys(selectedKeys);
    filterProjects(selectedKeys, selectedFrameworkKeys);
  };

  const handleFrameworkFilterChange = (selectedKeys: Set<string>) => {
    setSelectedFrameworkKeys(selectedKeys);
    filterProjects(selectedLanguageKeys, selectedKeys);
  };

  const filterProjects = (languageKeys: Set<string>, frameworkKeys: Set<string>) => {
      const filteredProjects = projects_list.filter((project) => {
      if (languageKeys.size === 0 && frameworkKeys.size === 0) return true; // No filter selected, include all projects

      const matchesLanguage = languageKeys.size === 0 || project.languages.some(l => languageKeys.has(l));
      const matchesFramework = frameworkKeys.size === 0 || project.frameworks.some(f => frameworkKeys.has(f));

      return matchesLanguage && matchesFramework;
    });

    setFilteredProjects(filteredProjects);
  };
  return (
    <div className="mx-auto px-1">
      <div className="flex-row flex items-center mt-3">
        <h3 className="font-serif text-white font-semibold ml-2 mr-4 text-sm md:text-md">Filter by: </h3>
        <div className="mr-2">
          <Filter projects={projects_list} type="language" onFilterChange={handleLanguageFilterChange}/>
        </div>
        <Filter projects={projects_list} type="framework" onFilterChange={handleFrameworkFilterChange}/>
      </div>
      <HoverEffect items={filteredProjects} />
    </div>
  );
}

type Project = {
  title: string;
  description: string;
  frameworks: string[];
  languages: string[];
  link: string[];
};
export const projects_list: Project[] = [
  {
    title: "IoT Snow Removal Robot App",
    description:
      "Developed an App to that connects to a robot using Websocket connection for teleoperation, live view of robot, mapping and more",
    
    frameworks: ['React Native'],
    languages: ['Javascript', 'python'],
    link: ['https://github.com/Maaz-Sidd/IoT-snow-Removal-App','https://www.google.com/'],
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    frameworks: ['React Native'],
    languages: ['C'],
    link: ['https://github.com/Maaz-Sidd/IoT-snow-Removal-App'],
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
      frameworks: ['React Native'],
    languages: ['C++'],
    link: ['https://github.com/Maaz-Sidd/IoT-snow-Removal-App'],
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    frameworks: ['React'],

    languages: ['typeScript', 'python'],
    link: ['https://github.com/Maaz-Sidd/IoT-snow-Removal-App'],
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      frameworks: ['React Native'],

    languages: [],
    link: ['https://github.com/Maaz-Sidd/IoT-snow-Removal-App'],
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      frameworks: [],

      languages: [],
    link: [],
  },
];

export function Filter({ projects, type, onFilterChange }: { projects: Project[], type: string,  onFilterChange: (selectedKeys: Set<string>) => void}) {

  const uniqueItems: string[] = Array.from(
    new Set(projects.flatMap((project) => type === 'language' ? project.languages : project.frameworks))
  );

  
  const items: { key: string; label: string }[] = uniqueItems.map(
    (item) => ({
      key: item,
      label: item,
    })
  );

  const [selectedKeys, setSelectedKeys] = useState(new Set<string>());

  const selectedValue = useMemo(
    () => {
      const selected = Array.from(selectedKeys).join(", ");
      return selected.length > 1 ? selected : ''; // Render empty string if selected is empty
    },
    [selectedKeys]
  );
  useMemo(() => {
    onFilterChange(selectedKeys);
  }, [selectedKeys]);

  return (
    <Dropdown className="bg-black ">
      <DropdownTrigger>
        <Button 
          variant="faded" 
          className="bg-black text-white border-[#d8895b]"
        >
          {selectedValue == '' ? type == 'language' ? 'Languages' : 'frameworks' : selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" 
        selectionMode="multiple"
        selectedKeys={selectedKeys} 
        onSelectionChange={setSelectedKeys}
        className="bg-black"
        items={items}>
        {(item) => (
          <DropdownItem 
            key={item.key}
            className="bg-black text-white font-serif "
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}