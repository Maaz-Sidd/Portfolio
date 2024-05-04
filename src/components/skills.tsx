import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import styles from '/src/App.css';

export default function Skills() {
  return (
    <div className="flex w-full flex-col items-center mt-5">
      <Tabs aria-label="Options" color="warning" radius="full">
        <Tab key="Languages" title="Languages">
          <Card className="bg-black">
            <CardBody className=" text-white font-serif">
              <div className="flex flex-column">
                <img src="/src/assets/letter-c.png" className="w-16 h-auto mx-2"></img>
                <img src="/src/assets/c-.png" className="w-16 h-auto mx-2"></img>
                <img src="/src/assets/python.png" className="w-16 h-auto mx-2"></img>
              </div>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="Framworks" title="Frameworks">
          <Card className="bg-black">
            <CardBody>
              <img src="/src/assets/react.svg" className="w-16 h-auto mx-2"></img>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="Technologies" title="Technologies">
          <Card className="bg-black">
            <CardBody>
              <img src="/src/assets/react.svg" className="w-16 h-auto mx-2"></img>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
      
    </div>  
  );
}
