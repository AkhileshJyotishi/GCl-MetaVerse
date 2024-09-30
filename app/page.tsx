"use client";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
export default function Home() {
  const [gender, setGender] = useState<string | null>(null);
  const [selected, setselected] = useState(0);
  const [name, setName] = useState<string>("");
  const [activeVisitors, setactiveVisitors] = useState("12,394")
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter()

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };


  useEffect(() => {
    if (isSoundOn && audioRef.current) {
      audioRef.current.play();
    } else if (!isSoundOn && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isSoundOn]);
  return (
    <main className="flex lg:flex-row flex-col min-h-screen bg-cover bg-no-repeat bg-hero-pattern  gap-8 lg:items-start items-center lg:justify-between justify-start overflow-hidden ">
      {/* lg:pt-14 pt-4 lg:px-20 px-2 */}
      <div className="absolute lg:top-14 top-4 lg:left-20 left-2 flex items-center   justify-between   gap-2">
        <Image
          src={"/Final Logo_Coloured.svg"}
          alt="Next move"
          width={150}
          height={300}
          className="w-40"
        />
      </div>


      <div className="absolute lg:top-14 top-4 right-0  bg-white block lg:hidden bg-opacity-10 backdrop-blur-md border border-white/20 rounded-lg   lg:p-4 lg:px-6 sm:shadow-xl "
        style={{
          background: "linear-gradient(112.83deg, rgba(141, 141, 141, 0.47) 0%, rgba(0, 0, 0, 0) 110.84%)",
        }}
      >
        <Image src={"/chess.svg"} alt="Next move" width={120} height={310} className="hidden md:block" />
        <Image src={"/partner.png"} alt="Next move" width={140} height={300} className="md:hidden block rounded-lg" />
      </div>
      <div className="mx-auto mt-[10rem] sm:mt-14 w-11/12">
        <h1 className="lg:text-3xl text-[22px] sm:text-black text-[#571ABA] font-bold text-center mb-8">
          Welcome to GCL Season 2
        </h1>
        <div className=" bg-white bg-opacity-30 backdrop-blur-xl lg:px-8 px-4 md:px-8 py-6 text-center  md:max-w-full mx-auto sm:w-[500px] flex flex-col">
          <div className="mb-3">
            <div className="w-full border flex items-center justify-between text-sm border-[#022043] px-3 py-4 mt-1 bg-white flex-wrap">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="focus:outline-none w-full text-[#571ABA] placeholder:text-[#571ABA] font-semibold"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="my-1 mb-4">
            <div className="grid grid-flow-row grid-cols-2 mt-1  gap-2 ">
              <div
                onClick={() => {
                  setGender("male");
                  setselected(0)
                }}
                className={
                  gender == "male"
                    ? "border border-[#022043] py-3 bg-[#F7F644] cursor-pointer  flex flex-row justify-between items-center px-3 gap-1"
                    : "border border-[#022043] py-3 bg-white cursor-pointer  flex flex-row items-center justify-between  px-3 gap-1"
                }
              >
                <div className="flex flex-row items-center gap-2">
                  <Image alt="male" width={20} height={20} src={"/male.png"} />{" "}
                  Male
                </div>
                <div>{gender == "male" ? <Checked /> : <UnChecked />}</div>
              </div>

              <div
                onClick={() => {
                  setGender("female");
                  setselected(0)

                }}
                className={
                  gender == "female"
                    ? "border border-[#022043] py-2 bg-[#F7F644] cursor-pointer  flex flex-row justify-between items-center px-3 gap-1"
                    : "border border-[#022043] py-2 bg-white cursor-pointer  flex flex-row items-center justify-between  px-3 gap-1"
                }
              >
                <div className="flex flex-row items-center gap-2">
                  <Image
                    alt="female"
                    width={20}
                    height={20}
                    src={"/female.png"}
                  />{" "}
                  Female
                </div>
                <div>{gender == "female" ? <Checked /> : <UnChecked />}</div>
              </div>
            </div>
            {
              gender == "male" &&
              <div className="grid grid-cols-3 grid-rows-1 gap-1 md:gap-3 relative   my-3 w-full  mx-auto">
                <div className={classNames("relative border border-black", selected == 1 ? "bg-[#F7F644]" : "bg-white")} onClick={() => setselected(1)}> <Image alt="look-1" src={"/logo-1.png"} fill /></div>
                <div className={classNames("relative border border-black", selected == 2 ? "bg-[#F7F644]" : "bg-white")} onClick={() => setselected(2)}><Image alt="look-2" src={"/logo-2.png"} fill /></div>
                <div className={classNames("relative border border-black", selected == 3 ? "bg-[#F7F644]" : "bg-white")} onClick={() => setselected(3)}><Image alt="look-3" src={"/logo-3.png"} height={800} width={800} className="h-24 sm:h-28 w-36 md:h-36" /></div>
              </div>
            }
            {
              gender == "female" &&
              <div className="grid grid-cols-3 grid-rows-1 gap-1 md:gap-3 relative   my-3 w-full sm:w-11/12 mx-auto">
                <div className={classNames("relative", selected == 4 ? "bg-[#F7F644]" : "bg-white")} onClick={() => setselected(4)}> <Image alt="look-1" src={"/logo-1.png"} fill /></div>
                <div className={classNames("relative", selected == 5 ? "bg-[#F7F644]" : "bg-white")} onClick={() => setselected(5)}><Image alt="look-2" src={"/logo-2.png"} fill /></div>
                <div className={classNames("relative", selected == 6 ? "bg-[#F7F644]" : "bg-white")} onClick={() => setselected(6)}><Image alt="look-3" src={"/logo-3.png"} height={800} width={800} className="h-28 sm:h-32 w-40 md:h-44" /></div>
              </div>
            }
          </div>
          <button
            disabled={gender == null || selected == 0 || name == ""}
            className={
              (gender == null || selected == 0 || name == "")
                ? "bg-opacity-65 bg-[#571ABA80] border-black border  text-white font-semibold gap-2  py-3 text-center flex items-center w-full justify-center px-2 md:text-xl"
                : "bg-opacity-100 bg-[#571ABA] border-black border  text-white font-semibold gap-2  py-3 text-center flex items-center w-full justify-center md:text-xl"

            }
            onClick={() => router.push("/loading")}
          >
            Let’s Visit Friends House in London
          </button>
          {
            gender &&
            <div className="flex flex-col gap-2 my-2">
              <div className="mx-auto font-bold text-black text-xl">♟️ OR ♟️</div>
              <div className="mx-auto text-center font-bold text-xl w-full text-[#022043]">You can create your own custom look in few {"\n"}simple steps. It is fun! </div>
              <button
                className={
                  "bg-opacity-100 bg-[#571ABA] border-black border  text-white font-semibold gap-2  py-4 text-center flex items-center w-full justify-center md:text-xl"
                }
              >
                Create My Own Look
              </button>
            </div>
          }
          <div className="-order-1 sm:order-1 my-2 flex gap-x-3 gap-y-2 justify-center flex-wrap ">

            <div className="mt-2 flex items-center bg-white py-1 px-3 font-bold text-xs w-fit ">
              <Image
                width={400}
                height={400}
                className="w-10 h-7"
                src="/hand.gif"
                alt=""
              />{" "}
              <span className="font-bold">  Active Visitors:</span> <span className="text-[#571ABA]">{activeVisitors}</span>
            </div>
            <div className="mt-2 hidden sm:flex items-center bg-white py-1 px-3 font-bold text-xs w-fit min-w-[125px]" onClick={toggleSound}>
              <Image
                className="w-10 h-5"
                width={400}
                height={400}
                src="/stats.gif"
                alt=""
              />{" "}
              <span className="font-bold">Sound:</span>
              <span
                className="text-[#571ABA] cursor-pointer"

              >
                {isSoundOn ? "On" : "Off"}
              </span>
              <audio ref={audioRef} loop>
                <source src="/test-sound.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>

        </div>
      </div>
      <div className="bg-white lg:block lg:absolute lg:top-14 top-4 right-0 hidden bg-opacity-10 backdrop-blur-md border border-white/20 rounded-lg p-4 px-6">
        <Image src={"/chess.svg"} alt="Next move" width={180} height={300} />
      </div>
    </main>
  );
}
