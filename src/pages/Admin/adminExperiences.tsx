import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { Button } from '@nextui-org/button';
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from '@nextui-org/react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ReloadData, ShowLoading, hideLoading } from '../../Redux/rootslice';

function AdminExperiences() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [newTitle, setNewTitle] = React.useState('');
    const [newDes, setNewDes] = React.useState('');
    const [newComp, setNewComp] = React.useState('');
    const [newStart, setNewStart] = React.useState('');
    const [newEnd, setNewEnd] = React.useState('');
    const [newSkill, setNewSkill] = React.useState('');
    const [Action, setAction] = useState<string>('');
    const [Index, setIndex] = useState<number>(0);
    const [ID, setID] = useState<any>(null);
    const dispatch = useDispatch();
    
    const {portfolioData} = useSelector((state: RootState) => state.root);
  
    
  if (!portfolioData) {
    return null; // or any other handling for null portfolioData
  }

  const  {experience}  = portfolioData!;
  
  if(!experience){
    return null;
  }

  type Experience = {
    _id: any;
    title: string;
    description: string;
    company: string;
    date_start: string;
    date_end: string;
    skills: string[];
  }

  const [Items, setItems] = useState<Experience[]>(experience);


const addExperience = async (e: React.FormEvent) =>{
    e.preventDefault();

    const skillArray = newSkill.split(",");
    const {_id} = experience[Index]! as Experience;
    

    const updateExperience = {
        title: newTitle,
        description: newDes,
        company: newComp,
        date_start: newStart,
        date_end: newEnd,
        skills: skillArray
    };
  let response : any = null;
    try {
        dispatch(ShowLoading());
        if(Action == 'Delete'){
            response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/portfolio/delete-experience`, {
                _id : _id
            });
        } else if(Action == 'Edit'){
            response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/portfolio/update-experience`, {
                ...updateExperience, _id:  _id 
            });
        } else {
            response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/portfolio/add-experience`, {
                ...updateExperience
            });
    }
    console.log(response);
    if(response.data.success){
        
        toast.success('Experiences successfully updated!', {
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

                
        dispatch(hideLoading());
        dispatch(ReloadData(true));
        setNewTitle('');
        setNewDes('');
        setNewComp('');
        setNewStart('');
        setNewEnd('');
        setNewSkill('');
                
    }
} catch (error) {
      console.log(error);
      dispatch(hideLoading());
      toast.error('Error updating Experiences', {
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

const handleDelete = (index: number) => {
    setAction('Delete');
    setIndex(index);
    const {_id} = experience[index]! as Experience;
    setID(_id);    
    onOpen();
  };
  const handleAdd = () => {
    setNewTitle('');
    setNewDes('');
    setNewComp('');
    setNewStart('');
    setNewEnd('');
    setNewSkill('');
    setAction('');
    onOpen();
  };

  const handleEdit = (index: number) => {
    setAction('Edit');
    setIndex(index);
    const {_id, title, description, company, date_start, date_end, skills} = experience[index]! as Experience;
    const newSkill = Array.isArray(skills) ? skills.join(',') : '';

    setNewTitle(title);
    setNewDes(description);
    setNewComp(company);
    setNewStart(date_start);
    setNewEnd(date_end);
    setNewSkill(newSkill);
    setID(_id);
    onOpen();
    console.log(index);
  };
  return (
    <div >
        
    <div className='grid grid-cols-1 md:grid-cols-4  py-6 ml-5 '>
       {Items.map((item, index) => (
            <div className='rounded-2xl bg-black flex items-center justify-center z-[1000] mx-5 mt-2 md:mt-0' style={{display: 'inline-block'}}>
            <h2 className= "text-white text-bold text-md font-serif w-fit mx-4 mt-3">
              {item.company}
            </h2>
            <p className={"text-sm mb-1 text-[#d8895b] font-serif ml-4"}>
              {item.title}
            </p>
            <p className="text-sm  font-serif text-white mb-2 font-bold border-b-2 border-[#d8895b] mx-4 ">{item.date_start} - {item?.date_end == '' ? 'Present' : item.date_end }</p>

            <div className="text-sm prose prose-sm dark:prose-invert text-white mx-4">
              {item.description}
            </div>
            <Skills items={item.skills}/>
            <div className="flex flex-column mt-2 items-center align-end justify-end bottom-0 w-full"> 
                <Button className="mr-3 mb-4" color="danger" onClick={()=>{handleDelete(index)}} >Delete</Button>
                <Button className='mr-3 mb-4' onClick={()=>{handleEdit(index)}}>Edit</Button>
            </div>

          </div>
        ))}
        <div className='flex content-end justify-end'>
            <Button color='primary' className='mr-6 ml-4 font-serif font-bold mt-2 md:mt-0' onClick={handleAdd}> Add new Experience</Button>
        </div>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> {Action == 'Delete' ? 'Delete project' : Action == 'Edit' ? 'Edit project' : 'Add project'}</ModalHeader>
              <ModalBody>
                {Action == 'Delete' ? 
                <div>
                  Are you sure you want to delete this experience? 
                </div>
                : 
                <div>
                  <p className="mb-2"> 
                    Company Name: 
                  </p>
                  <Input type="Name" label="Company"  value={newComp} onChange={(e) => setNewComp(e.target.value)}></Input>
                  <p className="mb-2 mt-2"> 
                    Position Title: 
                  </p>
                  <Input type="Name" label="Title"  value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></Input>
                  <p className="mb-2 mt-2"> 
                    Position description: 
                  </p>
                  <Textarea label="Description"  value={newDes} onChange={(e) => setNewDes(e.target.value)}></Textarea>
                  <p className="mb-2 mt-2"> 
                    Start Date (Month, Year): 
                  </p>
                  <Input type="Name" label="Start Date"  value={newStart} onChange={(e) => setNewStart(e.target.value)}></Input>
                  <p className="mb-2 mt-2"> 
                    End date (Month, Year): 
                  </p>
                  <Input type="Name" label="End Date"  value={newEnd} onChange={(e) => setNewEnd(e.target.value)}></Input>
                  <p className="mb-2 mt-2"> 
                    Skills: 
                  </p>
                  <Input type="Name" label="Skills"  value={newSkill} onChange={(e) => setNewSkill(e.target.value)}></Input>
                </div>
                }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose} onClick={addExperience}>
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
  )
};

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
        <p className="text-[#d8895b] font-serif mt-4 text-sm mx-4">
                Skills:
              </p>
        {items.map((item:string, index:number) => (
            <span
              key={index} // Adding a unique key to each item
              className="inline-block bg-slate-700 rounded-lg px-2 py-1 font-serif font-semibold mt-2 mr-2 text-zinc-100 tracking-wide leading-relaxed text-sm mx-4 mb-1"
            >
              {item}
            </span>
        ))}
      </div>
    );
  };

export default AdminExperiences