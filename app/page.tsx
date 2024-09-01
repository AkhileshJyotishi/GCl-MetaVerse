"use client";
import Image from "next/image";
import { useState } from "react";

const RightArrow = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 15.7083H4.83337V13.2916H14.5V4.83331L24.1667 14.5L14.5 24.1666V15.7083Z"
        fill="black"
      />
    </svg>
  );
};

const MaleSVG = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.5279 15.8987C25.8032 15.8987 26.837 14.8649 26.837 13.5897C26.837 12.3144 25.8032 11.2806 24.5279 11.2806C23.2527 11.2806 22.2189 12.3144 22.2189 13.5897C22.2189 14.8649 23.2527 15.8987 24.5279 15.8987Z"
        fill="#F4B998"
      />
      <path
        d="M24.528 14.7211C25.1529 14.7211 25.6594 14.2145 25.6594 13.5896C25.6594 12.9648 25.1529 12.4582 24.528 12.4582C23.9032 12.4582 23.3966 12.9648 23.3966 13.5896C23.3966 14.2145 23.9032 14.7211 24.528 14.7211Z"
        fill="#E28693"
      />
      <path
        d="M5.583 15.8987C6.85826 15.8987 7.89207 14.8649 7.89207 13.5897C7.89207 12.3144 6.85826 11.2806 5.583 11.2806C4.30773 11.2806 3.27393 12.3144 3.27393 13.5897C3.27393 14.8649 4.30773 15.8987 5.583 15.8987Z"
        fill="#F4B998"
      />
      <path
        d="M5.58296 14.7211C6.20782 14.7211 6.71438 14.2145 6.71438 13.5896C6.71438 12.9648 6.20782 12.4582 5.58296 12.4582C4.95809 12.4582 4.45154 12.9648 4.45154 13.5896C4.45154 14.2145 4.95809 14.7211 5.58296 14.7211Z"
        fill="#E28693"
      />
      <path
        d="M24.5272 9.91379V19.5283C24.5272 22.0404 23.5293 24.4495 21.753 26.2258C19.9767 28.0021 17.5676 29 15.0555 29H14.9715C12.4739 28.978 10.0862 27.9704 8.32802 26.1965C6.56983 24.4226 5.58354 22.026 5.58386 19.5283V9.91379C5.58386 7.40175 6.58177 4.9926 8.35805 3.21632C10.1343 1.44004 12.5435 0.442139 15.0555 0.442139C17.5676 0.442139 19.9767 1.44004 21.753 3.21632C23.5293 4.9926 24.5272 7.40175 24.5272 9.91379Z"
        fill="#F4B998"
      />
      <path
        d="M25.6603 7.11299V9.95835H23.3865C22.7507 9.95879 22.1211 9.83395 21.5336 9.59095C20.9461 9.34795 20.4122 8.99157 19.9625 8.54216C19.5128 8.09276 19.156 7.55914 18.9126 6.9718C18.6692 6.38446 18.5439 5.75491 18.5439 5.11913V4.44667C18.5437 5.90876 17.9627 7.31088 16.9288 8.34466C15.8949 9.37843 14.4927 9.95919 13.0306 9.95919H4.52222V7.25841C4.52222 5.33336 5.28694 3.48715 6.64815 2.12594C8.00937 0.764723 9.85557 0 11.7806 0L18.5439 0C20.4304 0.000222831 22.2396 0.749669 23.5736 2.08354C24.9076 3.41741 25.6573 5.2265 25.6578 7.11299H25.6603Z"
        fill="black"
      />
    </svg>
  );
};
const FemaleSVG = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.5227 22.3244C26.1264 21.7299 25.9569 21.012 26.0455 20.3031L26.2223 18.889L26.803 11.8151V10.3477C26.803 4.64198 22.161 0 16.4553 0H14.5L13.3671 15.8613L14.5 27.8671L22.3542 29H25.4628L26.4356 27.6396C27.5594 26.068 27.5944 23.932 26.5227 22.3244Z"
        fill="black"
      />
      <path
        d="M12.5447 0C6.83896 0 2.19704 4.64198 2.19704 10.3477V11.8151L2.77772 18.889L2.95449 20.3031C3.04313 21.012 2.87366 21.7299 2.47729 22.3244C1.4056 23.932 1.4406 26.068 2.56441 27.6396L3.53721 29H6.64582L14.5 27.8671V0H12.5447Z"
        fill="black"
      />
      <path
        d="M24.0801 16.8906C25.3553 16.8906 26.3891 15.8568 26.3891 14.5815C26.3891 13.3063 25.3553 12.2725 24.0801 12.2725C22.8048 12.2725 21.771 13.3063 21.771 14.5815C21.771 15.8568 22.8048 16.8906 24.0801 16.8906Z"
        fill="#F4B998"
      />
      <path
        d="M3.99022 16.8906C5.26549 16.8906 6.2993 15.8568 6.2993 14.5815C6.2993 13.3063 5.26549 12.2725 3.99022 12.2725C2.71496 12.2725 1.68115 13.3063 1.68115 14.5815C1.68115 15.8568 2.71496 16.8906 3.99022 16.8906Z"
        fill="#F4B998"
      />
      <path
        d="M24.0802 15.7129C24.705 15.7129 25.2116 15.2064 25.2116 14.5815C25.2116 13.9567 24.705 13.4501 24.0802 13.4501C23.4553 13.4501 22.9487 13.9567 22.9487 14.5815C22.9487 15.2064 23.4553 15.7129 24.0802 15.7129Z"
        fill="#E28693"
      />
      <path
        d="M3.99031 15.7129C4.61517 15.7129 5.12173 15.2064 5.12173 14.5815C5.12173 13.9567 4.61517 13.4501 3.99031 13.4501C3.36544 13.4501 2.85889 13.9567 2.85889 14.5815C2.85889 15.2064 3.36544 15.7129 3.99031 15.7129Z"
        fill="#E28693"
      />
      <path
        d="M14.4999 10.7679L13.8958 14.3371L14.4999 23.9095H14.5003C20.0179 23.9072 24.5067 19.4166 24.5067 13.899C24.5067 13.899 24.5034 12.5182 24.4971 12.3954L14.4999 10.7679Z"
        fill="#F4B998"
      />
      <path
        d="M4.50286 12.3955C4.49651 12.5182 4.49329 13.899 4.49329 13.899C4.49329 19.4165 8.982 23.907 14.5 23.9095V10.7679L4.50286 12.3955Z"
        fill="#F4B998"
      />
    </svg>
  );
};
export default function Home() {
  const [gender, setGender] = useState<string | null>(null);
  return (
    <main className="flex min-h-screen bg-purple-600 flex-row gap-8 items-center justify-between p-24 px-20">
      <Image
        src={"/prsents-logo.svg"}
        alt="Next move"
        width={400}
        height={400}
      />
      <Image
        src={"/the-next-move_logo_white 2.svg"}
        alt="Next move"
        width={400}
        height={400}
      />
      <div className="bg-white px-8 py-6 text-center lg:min-w-[450px] flex flex-col gap-2">
        <h1 className="text-[#ED00B8] font-bold text-xl">
          Welcome to <br /> Global Chess League Season2
        </h1>
        <h2 className="text-[#571ABA] font-medium text-base">
          Experience the future of Chess
        </h2>
        <div className="my-3">
          <div className="text-left text-xs w-full font-semibold text-[#022043]">
            *Select your gender
          </div>
          <div>
            <input
              type="text"
              placeholder="A proud♟️Chess Player"
              className="w-full border text-sm border-[#022043] px-2 py-2 mt-1 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="my-1 mb-4">
          <div className="text-left text-xs w-full font-semibold text-[#022043]">
            *Select your gender
          </div>
          <div className="grid grid-flow-row grid-cols-2 mt-1  gap-2">
            <div
              onClick={() => {
                setGender("male");
              }}
              className={
                gender == "male"
                  ? "border border-[#022043] py-2 bg-[#F7F644] cursor-pointer rounded-lg flex flex-row items-center justify-center gap-1"
                  : "border border-[#022043] py-2 cursor-pointer rounded-lg flex flex-row items-center justify-center gap-1"
              }
            >
              <MaleSVG /> Male
            </div>
            <div
              onClick={() => {
                setGender("female");
              }}
              className={
                gender == "female"
                  ? "border border-[#022043] py-2 bg-[#F7F644] cursor-pointer rounded-lg flex flex-row items-center justify-center gap-1"
                  : "border border-[#022043] py-2 cursor-pointer rounded-lg flex flex-row items-center justify-center gap-1"
              }
            >
              <FemaleSVG /> Female
            </div>
          </div>
        </div>
        <button className="bg-[#F7F644] gap-2 rounded-lg py-2 text-center flex items-center w-full justify-center">
          Continue <RightArrow />{" "}
        </button>
      </div>
    </main>
  );
}
