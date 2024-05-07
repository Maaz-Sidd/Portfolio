import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import styles from '/src/App.css';
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export default function Skills() {
  const {portfolioData} = useSelector((state: RootState) => state.root);
  
    if (!portfolioData) {
        return null; 
    }
    const  {skill} = portfolioData!;

    if (!skill) {
        return null; 
    }
  return (
    <div className="flex w-full flex-col items-center mt-5">
      <Tabs aria-label="Options" color="warning" radius="full">
        <Tab key="Languages" title="Languages">
          <Card className="bg-black">
            <CardBody className=" text-white font-serif">
              <div className="flex flex-column">
                <MapSkills tab='Languages' skills={skill}/>
              </div>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="Framworks" title="Frameworks">
          <Card className="bg-black">
            <CardBody>
            <div className="flex flex-column">
                <MapSkills tab='Frameworks' skills={skill}/>
              </div>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="Technologies" title="Technologies">
          <Card className="bg-black">
            <CardBody>
            <div className="flex flex-column">
                <MapSkills tab='Technologies' skills={skill} />
              </div>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>

    </div> 
  );
}

type skill_type = {
  _id: any;
  File: string;
  Link: string;
  Tab: string;
};
export function MapSkills ({tab, skills}:{tab:string, skills: skill_type[]} ){

  let tabFilter = skills.filter( function (skill) {
      return skill.Tab === tab;
  });

  return (
      <div className='flex'>
          {tabFilter.map((skill, index) => (
              <div key={skill._id}>
                  <img src={skill.Link} className="w-16 h-auto mx-2" alt={`Skill ${index}`} />
              </div>
          )) }
      
      </div>
  );
}