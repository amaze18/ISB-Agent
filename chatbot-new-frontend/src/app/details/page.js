"use client";
import React from "react";
import { SelectBot } from "@/components/SelectBot";
import Particles from "@/components/ui/particles";

const MainComponent = () => {
    return (
      <div suppressHydrationWarning className="relative w-full h-screen overflow-hidden">
        <div className="fixed inset-0 z-0">
          {/* <Vortex particleCount={20} className="absolute top-0 left-0 w-full h-full z-0" /> */}
          {/* <FlickeringGridRoundedDemo /> */}
           <Particles
                  className="absolute inset-0 z-0"
                  quantity={40}
                  ease={80}
                  color={"#ffffff"}
                  refresh
                />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <SelectBot />
          {/* <RainbowButton >Slelct</RainbowButton> */}
        </div>
      </div>
    );
  };

  export default MainComponent;