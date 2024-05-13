import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { Input } from '@nextui-org/react';
import {Textarea} from "@nextui-org/react";
import axios from 'axios';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { ReloadData, ShowLoading, hideLoading } from '../Redux/rootslice';


function AdminIntro() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const {portfolioData} = useSelector((state: RootState) => state.root);
  const dispatch = useDispatch();

  if (!portfolioData) {
    return null; // or any other handling for null portfolioData
  }
  type IntroType = {
    _id: any;
    name: string; 
    info: string[];
    about: string;
  };

  const  {intro}  = portfolioData!;

  if(!intro){
    return null;
  }
  const {_id, name, info, about } = intro[0]! as IntroType;
  
  const [newName, setNewName] = React.useState(name);
  const [newInfo, setNewInfo] = React.useState(info.join(", "));
  const [newAbout, setNewAbout] = React.useState(about);

  let infoArray = ['']

  const updateInfo = () =>{
    infoArray = newInfo.split(', ');
  } 

  const update = async (e: React.FormEvent) =>{
    e.preventDefault();

    const updatedIntro = {
        name: newName,
        info: infoArray,
        about: newAbout
      };

    try {
        dispatch(ShowLoading());
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/portfolio/update-intro`, {
            ...updatedIntro, _id: _id, 
        });
        if(response.data.success){
            dispatch(hideLoading());
            dispatch(ReloadData(true));
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
        }
    } catch (error) {
          console.log(error);
          dispatch(hideLoading());
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
  }

  return (
    <div className="flex w-11/12 mb-20 mx-1 md:mx-5">
                <form className='w-full size-5 text-xl' onSubmit={update}>
                    <Input type="Name" label="Name"  value={newName} onChange={(e) => setNewName(e.target.value)} className='m-4'/>
                    <Input type="Text" label="Info"  value={newInfo} onChange={(e) => setNewInfo(e.target.value)}  className='m-4'/>
                    <Textarea label="Description" value={newAbout} onChange={(e) => setNewAbout(e.target.value)}  className="m-4"/>
                    <div className='flex justify-end w-full'>
                    <Button onPress={onOpen} onClick={updateInfo}>Save changes</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Info page Changes</ModalHeader>
              <ModalBody>
                <p> 
                  Are you sure you want to make the following changes? 
                </p>
                <p className=' font-bold'>
                    Name: 
                    <p className='font-normal'> {name} </p>
                </p>
                <p className=' font-bold'>
                    Info: {infoArray.map((item, idx) => ( 
                        idx == infoArray.length - 1 ? 
                        <p className=' font-normal' key={idx}> {item}</p> : <p className=' font-normal' key={idx}> {item},</p>
                    )) }
                </p>
                <p className=' font-bold'>
                    About me: <p className='font-normal'>{about}</p>
                </p>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose} onClick={update}>
                  Yes
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
                </form>
                
              </div>
              
  )
}

export default AdminIntro