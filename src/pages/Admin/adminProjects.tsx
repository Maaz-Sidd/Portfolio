import { HoverEffect} from "../../components/ui/card-hover-effect";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea
} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import React, { useState, useMemo} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";



export function ProjectCardsAdmin() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [newTitle, setNewTitle] = React.useState('');
    const [newDes, setNewDes] = React.useState('');
    const [newLang, setNewLang] = React.useState('');
    const [newFrame, setNewFrame] = React.useState('');
    const [newLinks, setNewLinks] = React.useState('');
    const [Action, setAction] = useState<string>('');
    const [Index, setIndex] = useState<number>(0);
    const [ID, setID] = useState<any>(null);

    const addProject = async (e: React.FormEvent) =>{
        e.preventDefault();

       const langArray = newLang.split(",");
       const frameArray = newFrame.split(",");
       const linkArray = newLinks.split(",");
       const {_id} = project[Index]! as ProjectType;

    const updateProject = {
        title: newTitle,
        description: newDes,
        languages: langArray,
        frameworks: frameArray,
        link: linkArray
      };
      let response : any = null;
    try {
      if(Action == 'Delete'){
        response = await axios.post('http://192.168.2.199:8000/api/portfolio/delete-project', {
            _id : _id
        });
      } else if(Action == 'Edit'){
        response = await axios.post('http://192.168.2.199:8000/api/portfolio/update-project', {
            ...updateProject, _id:  _id 
        });
      } else {
        response = await axios.post('http://192.168.2.199:8000/api/portfolio/add-project', {
            ...updateProject 
        });
      }
        if(response.data.success){
            console.log("yes");
                toast.success('Intro successfully updated!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            setNewTitle('');
            setNewDes('');
            setNewLang('');
            setNewFrame('');
            setNewLinks('');
                    
        }
    } catch (error) {
          console.log(error);
          toast.error('Error updating Intro', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
    }
  };

  const {portfolioData} = useSelector((state: RootState) => state.root);
  
  if (!portfolioData) {
    return null; 
  }
  const  {project} = portfolioData!;

  if (!project) {
    return null; 
  }

  
  type ProjectType = {
    _id: any;
    title: string; 
    description: string;
    languages: string[];
    frameworks: string[];
    link: string[];
  };

  const handleDelete = (index: number) => {
    setAction('Delete');
    setIndex(index);
    const {_id} = project[index]! as ProjectType;
    setID(_id);    
    onOpen();
  };
  const handleAdd = () => {
    setAction('');
    onOpen();
  };

  const handleEdit = (index: number) => {
    setAction('Edit');
    setIndex(index);
    const {_id, title, description, languages, frameworks, link} = project[index]! as ProjectType;
    const newLang = Array.isArray(languages) ? languages.join(',') : '';
    const newFrame = Array.isArray(frameworks) ? frameworks.join(',') : '';
    const newLinks = Array.isArray(link) ? link.join(',') : '';

    setNewTitle(title);
    setNewDes(description);
    setNewLang(newLang);
    setNewFrame(newFrame);
    setNewLinks(newLinks);
    setID(_id);
    onOpen();
    console.log(index);
  };


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
    <div className="mx-auto px-5">
      <div className="flex-row flex items-center justify-between flex-wrap mt-3">
      <div className="flex items-center mb-2 md:mb-0">
        <h3 className="font-serif text-white font-semibold ml-2 mr-4 text-sm md:text-md">Filter by: </h3>
        <div className="flex items-center mr-2">
          <Filter projects={project} type="language" onFilterChange={handleLanguageFilterChange}/>
        </div>
            <Filter projects={project} type="framework" onFilterChange={handleFrameworkFilterChange}/>
        </div>
        <div className=" mr-2">
            <Button color="primary" onClick={handleAdd}>Add project</Button>
        </div>
      </div>
      <HoverEffect items={filteredProjects} className='md:grid-cols-4' admin handleDelete={handleDelete} handleEdit={handleEdit}/>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> {Action == 'Delete' ? 'Delete project' : Action == 'Edit' ? 'Edit project' : 'Add project'}</ModalHeader>
              <ModalBody>
                {Action == 'Delete' ? 
                <div>
                  Are you sure you want to delete this project? 
                </div>
                : 
                <div>
                  <p className="mb-2"> 
                    Project Title: 
                  </p>
                  <Input type="Name" label="Name"  value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></Input>
                  <p className="mb-2 mt-2"> 
                    Project description: 
                  </p>
                  <Textarea label="Description"  value={newDes} onChange={(e) => setNewDes(e.target.value)}></Textarea>
                  <p className="mb-2 mt-2"> 
                    Project Languages: 
                  </p>
                  <Input type="Name" label="Languages"  value={newLang} onChange={(e) => setNewLang(e.target.value)}></Input>
                  <p className="mb-2 mt-2"> 
                    Project Frameworks: 
                  </p>
                  <Input type="Name" label="Frameworks"  value={newFrame} onChange={(e) => setNewFrame(e.target.value)}></Input>
                  <p className="mb-2 mt-2"> 
                    Project Links: 
                  </p>
                  <Input type="Name" label="Links"  value={newLinks} onChange={(e) => setNewLinks(e.target.value)}></Input>
                </div>
                }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose} onClick={addProject}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}/>

      
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