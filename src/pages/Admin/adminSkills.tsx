import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import { Tab, Tabs } from '@nextui-org/tabs'
import React, { useEffect, useRef, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import app from '../../firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ReloadData, ShowLoading, hideLoading } from '../../Redux/rootslice';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { set } from 'firebase/database';


function AdminSkills() {
    const hiddenFileInput = useRef<any>(null); 
    const [newPic, setNewPic] = useState<File>();
    const [newLink, setNewLink] = useState<string>('');
    const [newTab, setNewTab] = useState<string>('');
    const [newFile, setNewFile] = useState<string>('');
    const [newID, setNewID] = useState<any>();
    const [newPicPercent, setNewPicPercent] = useState<number>();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const dispatch = useDispatch();

    const {portfolioData} = useSelector((state: RootState) => state.root);
  
    if (!portfolioData) {
        return null; 
    }
    const  {skill} = portfolioData!;

    if (!skill) {
        return null; 
    }

    const handleClick = (tab:string) => {
        hiddenFileInput.current.click();   
        setNewTab(tab);
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        if (file) {
            setNewPic(file);
        }
    };
    

    useEffect(()=>{
        newPic && uploadFile(newPic, newTab);
    }, [newPic]);

    const uploadFile = (file:File, folder:string) => {
        const storage = getStorage(app);
        setNewFile(file.name);
        const storageRef = ref(storage, folder + '/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setNewLink(downloadURL);
            });

        }
        );
    };
    useEffect (()=> {
        newLink && addSkill('add');
    }, [newLink]);

    const addSkill  = async (action: string) =>{
        const storage = getStorage();


        // Delete the file
        
        const updateSkill = {
            Link: newLink,
            File: newFile,
            Tab: newTab,
        };
        let response: any = null;
        try {
            dispatch(ShowLoading());
            console.log({...updateSkill});
            if(action === 'add'){
                response = await axios.post('http://192.168.2.180:8000/api/portfolio/add-skill', {...updateSkill});
            } else {
                response = await axios.post('http://192.168.2.180:8000/api/portfolio/delete-skill', {_id : newID});
            }
            if(response.data.success){
                if (action == 'delete'){            
                    // Create a reference to the file to delete
                    const desertRef = ref(storage, newTab + '/' + newFile + '.png');
                    deleteObject(desertRef).then(() => {
                        console.log('file deleted from firebase!');
                        }).catch((error) => {
                        console.log('error deleting file on firebase:', error);
                        });

                }
                dispatch(hideLoading());
                dispatch(ReloadData(true));
                toast.success('Skill successfully updated!', {
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
                    setNewLink('');
            } 
            
        } catch (error) {
            console.log(error);
            toast.error('Error updating Skill', {
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

    const handleDelete = (id: any, file:string, tab:string) => {
        setNewID(id);
        setNewFile(file);
        setNewTab(tab);
        onOpen();
    };

    
    
  return (
    <div className="flex w-full flex-col items-center mt-5">
      <Tabs aria-label="Options" color="warning" radius="full">
        <Tab key="Languages" title="Languages">
          <Card className="bg-black">
            <CardBody className=" text-white font-serif">
              <div className="flex flex-column">
                <MapSkills tab='Languages' skills={skill} onDelete={handleDelete}/>
                <div className='flex justify-center content-center items-center'>
                    <Button className=' w-4' onClick={()=>handleClick('Languages')}>+</Button>
                </div>
                <input type='file' accept='image/*' style={{display:'none'}} ref={hiddenFileInput}
                 onChange={handleChange}></input>
              </div>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="Framworks" title="Frameworks">
          <Card className="bg-black">
            <CardBody>
            <div className="flex flex-column">
                <MapSkills tab='Frameworks' skills={skill} onDelete={handleDelete}/>
                <div className='flex justify-center content-center items-center'>
                    <Button className=' w-4' onClick={()=>handleClick('Frameworks')}>+</Button>
                </div>
                <input type='file' accept='image/*' style={{display:'none'}} ref={hiddenFileInput}
                 onChange={handleChange}></input>
              </div>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="Technologies" title="Technologies">
          <Card className="bg-black">
            <CardBody>
            <div className="flex flex-column">
                <MapSkills tab='Technologies' skills={skill} onDelete={handleDelete}/>
                <div className='flex justify-center content-center items-center'>
                    <Button className=' w-4' onClick={()=>handleClick('Technologies')}>+</Button>
                </div>
                <input type='file' accept='image/*' style={{display:'none'}} ref={hiddenFileInput}
                 onChange={handleChange}></input>
              </div>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> Delete Skill</ModalHeader>
              <ModalBody>
                <div>
                  Are you sure you want to delete this project? 
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose} onClick={()=>addSkill('delete')}>
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

type skill_type = {
    _id: any;
    File: string;
    Link: string;
    Tab: string;
}

export function MapSkills ({tab, skills, onDelete}:{tab:string, skills: skill_type[], onDelete: (id: any, file: string, tab:string) => void} ){

    let tabFilter = skills.filter( function (skill) {
        return skill.Tab === tab;
    });

    return (
        <div className='flex'>
            {tabFilter.map((skill, index) => (
                <div key={skill._id}>
                    <img src={skill.Link} className="w-16 h-auto mx-2" alt={`Skill ${index}`} />
                    <Button color='danger' className='mt-3 mr-3' onClick={() => onDelete(skill._id, skill.File, tab)}> Delete</Button>
                </div>
            )) }
        
        </div>
    );
}


export default AdminSkills