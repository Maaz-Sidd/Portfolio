import { HoverEffect} from "./ui/card-hover-effect";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { RootState } from "../Redux/store";
import { useState, useMemo} from "react";
import { useSelector } from "react-redux";

export function ProjectCards() {

  const {portfolioData} = useSelector((state: RootState) => state.root);
  
  if (!portfolioData) {
    return null; // or any other handling for null portfolioData
  }
  const  {project} = portfolioData!;

  if (!project) {
    return null; // or any other handling for null project
  }
  const [Items, setItems] = useState<Project_type[]>(project);
  
  const [selectedLanguageKeys, setSelectedLanguageKeys] = useState(new Set<string>());
  const [selectedFrameworkKeys, setSelectedFrameworkKeys] = useState(new Set<string>());

  const [filteredProjects, setFilteredProjects] = useState<Project_type[]>(project);

  const handleLanguageFilterChange = (selectedKeys: Set<string>) => {
    setSelectedLanguageKeys(selectedKeys);
    filterProjects(selectedKeys, selectedFrameworkKeys);
  };

  const handleFrameworkFilterChange = (selectedKeys: Set<string>) => {
    setSelectedFrameworkKeys(selectedKeys);
    filterProjects(selectedLanguageKeys, selectedKeys);
  };

  const filterProjects = (languageKeys: Set<string>, frameworkKeys: Set<string>) => {
    const filteredProjects = Items.filter((project) => {
      if (languageKeys.size === 0 && frameworkKeys.size === 0) return true; // No filter selected, include all projects
  
      const matchesLanguage = Array.from(languageKeys).every(l => project.languages.includes(l));
      const matchesFramework = Array.from(frameworkKeys).every(f => project.frameworks.includes(f));
  
      return matchesLanguage && matchesFramework;
    });
  
    setFilteredProjects(filteredProjects);
  };
  return (
    <div className="mx-auto px-1">
      <div className="flex-row flex items-center mt-3">
        <h3 className="font-serif text-white font-semibold ml-2 mr-4 text-sm md:text-md">Filter by: </h3>
        <div className="mr-2">
          <Filter projects={project} type="language" onFilterChange={handleLanguageFilterChange}/>
        </div>
        <Filter projects={project} type="framework" onFilterChange={handleFrameworkFilterChange}/>
      </div>
      <HoverEffect items={filteredProjects} />
    </div>
  );
}
type Project_type = {
  title: string;
  description: string;
  frameworks: string[];
  languages: string[];
  link: string[];
};


export function Filter({ projects, type, onFilterChange }: { projects: Project_type[], type: string,  onFilterChange: (selectedKeys: Set<string>) => void}) {

  const uniqueItems: string[] = Array.from(
    new Set(
      projects.flatMap((project) => {
        if (type === 'language') {
          return project.languages.filter(item => item !== ''); // Exclude empty strings
        } else {
          return project.frameworks.filter(item => item !== ''); // Exclude empty strings
        }
      })
    )
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
      return selected.length > 1 ? selected : ''; 
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
          {selectedValue == '' ? type == 'language' ? 'Languages' : 'Frameworks' : selectedValue}
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
            className="bg-black text-white font-serif text-bold"
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}