"use client";
import Image from "next/image";
import { useState } from "react";

const UnChecked = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5C22 18.0228 17.5228 22.5 12 22.5ZM12 20.5C16.4183 20.5 20 16.9183 20 12.5C20 8.08172 16.4183 4.5 12 4.5C7.58172 4.5 4 8.08172 4 12.5C4 16.9183 7.58172 20.5 12 20.5Z"
        fill="black"
      />
    </svg>
  );
};

const Checked = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 23C6.47715 23 2 18.5228 2 13C2 7.47715 6.47715 3 12 3C17.5228 3 22 7.47715 22 13C22 18.5228 17.5228 23 12 23ZM12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21ZM12 18C9.23858 18 7 15.7614 7 13C7 10.2386 9.23858 8 12 8C14.7614 8 17 10.2386 17 13C17 15.7614 14.7614 18 12 18Z"
        fill="black"
      />
    </svg>
  );
};
export default function Instructions() {
  const [gender, setGender] = useState<string | null>(null);
  return (
    <main className="flex lg:flex-row flex-col min-h-screen bg-cover bg-no-repeat bg-instructions-bg  gap-8 lg:items-start items-center lg:justify-between justify-start ">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[rgba(2,32,67,0.91)]" />

      <div className="w-11/12  my-auto bg-white bg-opacity-30 backdrop-blur-3xl lg:px-8 px-4 py-6 text-center sm:w-[500px] flex flex-col gap-2 mx-auto shadow-xl">
        <div className="mx-auto">
          <h1 className="text-[#F7F644] w-fit mx-auto text-2xl font-bold my-2">Instructions </h1>
          <video autoPlay muted loop id="myVideo" className="hidden md:block md:w-[350px] lg:w-[450px] rounded-xl">
            <source src={"/instructions.mp4"} type="video/mp4" />
          </video>
          <video autoPlay muted loop id="myVideo" className="w-[300px] md:hidden  rounded-xl">
            <source src={"/instructions-mobile.mp4"} type="video/mp4" />
          </video>
        </div>
        <div className="">
          <h1 className="text-xl md:text-2xl text-[#F7F644] font-bold my-3">Explore GCL Friends house</h1>
          <div className="md:grid gap-4 hidden md:grid-cols-2 text-start">
            <div className="bg-white p-2 flex flex-col gap-1 ">
              <div className="text-[#571ABA] font-bold w-fit" >Coin Collection</div>
              <div className="w-fit text-black font-bold">Collect coins to buy goodies</div>
            </div>
            <div className="bg-white p-2 flex flex-col gap-1">
              <div className="text-[#571ABA] font-bold w-fit" >Reception</div>
              <div className="w-fit text-black font-bold">Visit rooms from reception</div>
            </div>
            <div className="bg-white p-2 flex flex-col gap-1">
              <div className="text-[#571ABA] font-bold w-fit" >Team Zone</div>
              <div className="w-fit text-black font-bold">Play chess with GM</div>
            </div>
            <div className="bg-white p-2 flex flex-col gap-1">
              <div className="text-[#571ABA] font-bold w-fit" >The Light</div>
              <div className="w-fit text-black font-bold">Some text here</div>
            </div>
            <div className="bg-white p-2 flex flex-col gap-1">
              <div className="text-[#571ABA] font-bold w-fit" >The Light</div>
              <div className="w-fit text-black font-bold">Some text here</div>
            </div>
            <div className="bg-white p-2 flex flex-col gap-1">
              <div className="text-[#571ABA] font-bold w-fit" >The Light</div>
              <div className="w-fit text-black font-bold">Play chess with GM</div>
            </div>
          </div>
          <div className="md:hidden bg-white p-2 font-bold">
            <ol type="1" className="text-start">
              <li className="w-fit">  1.Collect GCL Coins </li>
              <li className="w-fit"> 2.Enter Reception area</li>
              <li className="w-fit">3.Visit The Light Hall</li>
              <li className="w-fit">4.Play Live Games in Fan Zone</li>
              <li className="w-fit">5.Explore Team Zone</li>
              <li className="w-fit">6.Visit North Lobby</li>
              <li className="w-fit">7.Visit East Lobby</li>
            </ol>
          </div>
          <button
            className={"bg-opacity-100 bg-[#571ABA] border-black border  text-white font-semibold gap-2 my-2 py-2 px-2 text-center flex items-center w-full justify-center md:text-xl"} >
            {/* Enter Friends House */}
            Let’s Visit Friends House in London
          </button>
        </div>


      </div>
    </main>
  );
}
