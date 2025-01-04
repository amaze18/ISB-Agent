
import { RainbowButton } from "@/components/ui/rainbow-button";
import ShinyButton from "@/components/ui/shiny-button";
import { EvervaultCardDemo } from "@/components/Card";
import Link from "next/link";
import { HeaderLabel } from "@/components/HeaderLabel";
import { WarpBackground } from "@/components/ui/warp-background";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Meteors from "@/components/ui/meteors";
import Particles from "@/components/ui/particles";
import { Vortex } from "@/components/ui/vortex";
import Footer from "@/components/footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { GlareCard } from "@/components/ui/glare-card";

export default function Home() {
  return (
    <div suppressHydrationWarning className="h-screen flex flex-col items-center justify-center gap-16 font-[family-name:var(--font-geist-sans)] relative overflow-x-hidden">

      {/* <Vortex particleCount={60} className="absolute top-0 left-0 w-full h-full z-0" /> */}
      {/* <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={0.1}
        // className="inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      /> */}
      <Meteors number={20} className="absolute top-0 left-0 w-full h-full z-0" />
      <Particles
        className="absolute inset-0 z-0"
        quantity={40}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <main className="absolute top-0 left-0 w-full h-full pt-10 px-10 z-50">
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row max-w-6xl m-auto">
          <div className="flex w-full  flex-col items-center justify-between gap-8 sm:flex-row border border-solid bg-zinc-900 border-black dark:border-black p-2 px-10 rounded-full fixed max-w-6xl mt-4 z-50">
            <div className="justify-center items-center">
              <p className="font-light text-lg">I-venture @ ISB</p>
            </div>
            <div className=" hidden md:flex flex-row items-center justify-center gap-6">
            </div>
          </div>
        </div>
        <div className="text-center mt-20">
          <Link href="/chat">
          <HeaderLabel />
          </Link>
          <p className="font-light text mt-20">I-venture @ ISB presents to you</p>
          <p className="text-center text-5xl font-thin mt-3" >
            Dlabs AI
          </p>

          {/* <h1 className="text-6xl font-extrabold bg-gradient-to-bl from-blue-500 to-purple-800 bg-clip-text text-transparent">
            <p className="text-center text-5xl font-light mt-20" >
              Dlabs AI
            </p>
          </h1> */}

          <TextGenerateEffect words={"Your AI companion who is here to help you know more about I-venture @ ISB. \n Customizable and friendly!"} className={"text-center font-[300] mt-5 text-sm "} />
          {/* <p className="text-center text-sm font-[300] mt-5"></p> */}
          {/* <TextGenerateEffect words={"Dlabs AI"} className={"text-6xl font-thin mb-8 mt-10"} />
         <TextGenerateEffect className={"font-thin mb-8 mt-10 text-sm"} words={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} /> */}
          <Link href="/chat">
            <RainbowButton className="mt-10" >Start Chatting</RainbowButton>
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-center mb-16 mt-32">Your Agent is</h2>
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row max-w-6xl m-auto">
          <GlareCardDemo text={"Intelligent"} quote={"Its intelligent, personalizable and customizable to your information need about I-venture @ ISB."} />
          <GlareCardDemo text={"Simple"} quote={"It will understand your queries about Dlabs and I-venture at ISB, and reply in a simple language."} />
          <GlareCardDemo text={"Available"} quote={"Treat this bot as your constant source of information about Dlabs @ ISB. Always available for you."} />
        </div>
        <Footer />
      </main>
    </div>
  );
}


function GlareCardDemo({text,quote}) {
  return (
    <GlareCard className="flex flex-col items-center justify-center">
      <p className="text-white font-bold text-xl mt-4">{text}</p>
      <p className="text-white font-semibold text-xs mt-2 text-center px-5">{quote}</p>
    </GlareCard>
  );
}
