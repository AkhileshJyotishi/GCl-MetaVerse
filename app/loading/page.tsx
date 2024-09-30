"use client";
import Image from "next/image";
import { useState } from "react";
import { BasicProgressBarWithLabel } from "../components/progress";


export default function Home() {
    const [loadVal, setloadVal] = useState(90);
    return (
        <main className="relative h-screen w-screen overflow-hidden">

            <video autoPlay playsInline  muted loop id="myVideo" className="absolute w-auto select-none h-auto min-w-full min-h-full object-cover -z-10">
                <source src={"/loading-background.mp4"} type="video/mp4" />
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[rgba(2,32,67,0.91)]">

                <div className="absolute  bottom-0 md:bottom-8 right-0 left-0   w-full md:w-3/5 mx-auto shadow-lg">
                    <BasicProgressBarWithLabel currentValue={loadVal} label="Loading" maxValue={100} key={"progress"} />
                    <div className="bg-white bg-opacity-10 backdrop-blur-3xl lg:px-8 px-4 py-3 md:py-6 text-center lg:min-w-[500px] flex flex-col gap-2">
                        <h2 className="text-xl text-[#F7F644] font-bold"> Some interesting facts of Chess around the world!</h2>
                        <h4 className="text-xl text-white">The longest official game of chess took place in 1989 that went on for 20 hours and included 269 moves</h4>
                    </div>
                </div>
            </div>

        </main>
    );
}
