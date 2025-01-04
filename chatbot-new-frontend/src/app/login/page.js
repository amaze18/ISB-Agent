"use client";
import LoginFormDemo from "@/components/login-form";
import Particles from "@/components/ui/particles";
import React from "react";

const MainComponent = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
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
        <LoginFormDemo />
      </div>
    </div>
  );
};

export default MainComponent;