import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from '@nextui-org/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ReloadData, ShowLoading, hideLoading } from '../../Redux/rootslice';

function AdminContact() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    const {portfolioData} = useSelector((state: RootState) => state.root);
  
    if (!portfolioData) {
      return null; // or any other handling for null portfolioData
    }
    type IntroType = {
      _id: any;
      gitHub: string; 
      email: string;
      linkedIn: string;
    };
  
    const  {contact}  = portfolioData!;
    if (!contact) {
        return null;
    }

    const {_id, gitHub, email, linkedIn } = contact[0]! as IntroType;
    
    const [newGitHub, setNewGitHub] = React.useState(gitHub);
    const [newEmail, setNewEmail] = React.useState(email);
    const [newLinked, setNewLinked] = React.useState(linkedIn);

    const dispatch = useDispatch();
  
  
    const update = async (e: React.FormEvent) =>{
      e.preventDefault();
  
      const updatedIntro = {
          gitHub: newGitHub,
          email: newEmail,
          linkedIn: newLinked
        };
  
      try {
           dispatch(ShowLoading());
          const response = await axios.post('http://192.168.2.180:8000/api/portfolio/update-contact', {
              ...updatedIntro, _id: _id, 
          });
          if(response.data.success){
            dispatch(hideLoading());
            dispatch(ReloadData(true));
                  toast.success('Contact successfully updated!', {
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
            toast.error('Error updating contact', {
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
                      <Input type="Text" label="GitHub"  value={newGitHub} onChange={(e) => setNewGitHub(e.target.value)} className='m-4'/>
                      <Input type="Text" label="Email"  value={newEmail} onChange={(e) => setNewEmail(e.target.value)}  className='m-4'/>
                      <Input type="Text" label="linkedIn" value={newLinked} onChange={(e) => setNewLinked(e.target.value)}  className="m-4"/>
                      <div className='flex justify-end w-full'>
                      <Button onPress={onOpen}>Save changes</Button>
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
                      gitHub Link: 
                      <p className='font-normal'> {newGitHub} </p>
                  </p>
                  <p className=' font-bold'>
                      email Link: 
                          <p className=' font-normal'> {newEmail}</p>
                  </p>
                  <p className=' font-bold'>
                      linkedIn link: <p className='font-normal'>{newLinked}</p>
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

export default AdminContact