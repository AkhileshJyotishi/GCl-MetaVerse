"use client";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import AvatarIframe from "@/app/components/avatar-section/AvatarIframe";
import { toast } from "react-toastify";
import { BasicProgressBarWithLabel } from "./components/progress";
import { Audiowide } from "next/font/google";
import { SpinnerCircular } from "spinners-react";


const s3Client = new S3Client({
  // endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT,
  forcePathStyle: false,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

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

const Checked = ({ fill }) => {
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
        fill={fill}
      />
    </svg>
  );
};

const gltfName = "Armature";

const maleAnimations = {
  Idle: "/animations/male/Idle.glb",
  Walk: "/animations/male/Walk.glb",
  WalkBack: "/animations/male/WalkBack.glb",
  WalkLeft: "/animations/male/WalkLeft.glb",
  WalkRight: "/animations/male/WalkRight.glb",
};

const femaleAnimations = {
  Idle: "/animations/female/IdleFemale.glb",
  Walk: "/animations/female/WalkFemale.glb",
  WalkBack: "/animations/female/WalkBackFemale.glb",
  WalkLeft: "/animations/female/WalkLeftFemale.glb",
  WalkRight: "/animations/female/WalkRightFemale.glb",
};

const maleAvatars = [
  { id: 1, src: "/male_1.webp" },
  { id: 2, src: "/male_2.webp" },
  {
    id: 3,
    src: "/male_3.webp",
    height: 800,
    width: 800,
    className: "h-24 sm:h-28 w-36 md:h-36",
  },
];

const femaleAvatars = [
  { id: 4, src: "/female_1.webp" },
  { id: 5, src: "/female_2.webp" },
  {
    id: 6,
    src: "/female_3.webp",
    height: 800,
    width: 800,
    className: "h-24 sm:h-28 w-36 md:h-36",
  },
];
const audiowide = Audiowide({ subsets: ["latin"], weight: "400" });
export default function Home() {
  const [gender, setGender] = useState(null);
  const [selected, setselected] = useState(0);
  const [name, setName] = useState("");
  const [activeVisitors, setactiveVisitors] = useState("12,394");
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef(null);
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isFrameOpen, setIsFrameOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setloading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState();
  // const isMobile = window.innerWidth <= 426;
  let interval;

  useEffect(() => {
    updateVisitors();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 426);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  const uploadObject = async (file, name) => {
    // const toastId = toast.loading("Uploading");
    console.log("----uploading----");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: `avatars/glb/${name}.glb`,
      Body: file,
      // ACL: "public-read",
    };

    try {
      await s3Client.send(new PutObjectCommand(params));

      // toast.dismiss(toastId);

      // toast.update(toastId, { render: "Upload complete", type: "success", isLoading: false });
      const uploadedObjectUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key};`;
      // console.log("------ the uploaded url", uploadedObjectUrl);
      // return { data, url: uploadedObjectUrl };
      //set loading to true and upload progres
      setProgress(100);
      setloading(false);
    } catch (err) {
      console.log("Error Uploading object", err);
      toast.error("Creating Avatar Failed");
      setProgress(99);
      const defaultAvatar = (gender === "male" ? maleAvatars : femaleAvatars)[0]
        .src;

      const newAvatarId = defaultAvatar.substring(1, defaultAvatar.length - 5);
      window.open(
        "https://events.gclverse.com/entrance1/?name=" + name + "&avatarId="+ newAvatarId ,
        "_self"
      );

      // toast.update(toastId, { render: "Error uploading file", type: "error", isLoading: false });
    } finally {
      // onLoadingComplete();
      // setloading(false);
    }
  };
  // When actual loading completes
  const onLoadingComplete = () => {
    setProgress(100);
  };
  useEffect(() => {
    if (isSoundOn && audioRef.current) {
      audioRef.current.play();
    } else if (!isSoundOn && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isSoundOn]);
  useEffect(() => {
    if (progress == 100) {
      setloading(false);
      window.open(
        "https://events.gclverse.com/entrance1/?name=" + name + "&avatarId=" +
          avatarUrlSplitter(avatarUrl),
        "_self"
      );
    }
  }, [progress]);

  useEffect(() => {
    if (!avatarUrl) return;
    // alert(avatarUrl)
    combineAndLoadAnimation(avatarUrl);
  }, [avatarUrl]);
  useEffect(() => {
    if (typeof window !== undefined) {
      // Client-side-only code
      setIsMobile(window.innerWidth <= 426);
    }
  }, []);
  function avatarUrlSplitter(avatarUrl) {
    const splitUrl = avatarUrl
      .split("https://models.readyplayer.me/")[1]
      .split(".glb")[0];
    console.log(splitUrl);
    return splitUrl;
  }


function updateVisitors() {
  var startDate = new Date("2024-10-02");

  // Get the current date
  var currentDate = new Date();
  // 148956;
  // Calculate the time difference in milliseconds
  var timeDifference = currentDate - startDate;

  // Convert milliseconds to seconds
  var secondsDifference = Math.floor(timeDifference / 90000); //changed here to make it better

  // console.log("Seconds between start date and now: " + secondsDifference);

  var dividend = secondsDifference;
  var divisor = 4;

  // Calculate the quotient (Q) and remainder (R)
  var quotient = Math.floor(dividend / divisor);
  var remainder = dividend % divisor;

  // console.log(`Quotient (Q): ${quotient}`);
  // console.log(`Remainder (R): ${remainder}`);

  function sumOfTriangularNumbers(n) {
    return (n * (n + 1) * (n + 2)) / 6;
  }

  // Example: Calculate the sum of the first 20 triangular numbers
  var sum = sumOfTriangularNumbers(4);
  var sumofR = sumOfTriangularNumbers(remainder);
  var currentValue = quotient * sum + sumofR;
  // console.log(`Sum of the first ${secondsDifference}  numbers: ${currentValue}`);

  let visitorCount = currentValue;
  let n = remainder;

  // const interval = setInterval(() => {
  const triangularNumber = (n * (n + 1)) / 2;
  visitorCount += triangularNumber;

  // Print the updated visitorCount
  console.log(`Visitor Count Updated: ${visitorCount}`);

  // Increment the value of n for the next triangular number
  n++;
  if (n == 4) {
    n = 1;
  }

  console.log(visitorCount);

  setactiveVisitors(visitorCount);//this is total visitors

  // }, 1000);
}


// // Function to gradually change the number of active users
// const calculateCurrentActiveUsers =() => {
//   // Get the current timestamp in seconds
//   const timestamp = Math.floor(Date.now() / 1000);

//   // Generate a gradual increase or decrease using a sine function for smooth transitions
//   // This creates a smooth oscillation between the min and max visitors
//   const visitors = Math.floor(minVisitors + (maxVisitors - minVisitors) * (0.5 + 0.5 * Math.sin(timestamp / 60)));

//   // Set the active visitors (this assumes you're using some state management)
//   setactiveVisitors(visitors);

//   // Optionally, you can log or display the visitors count
//   console.log("Current Active Users:", visitors);
// }

// Call the function every second to update the visitors count
// setInterval(calculateCurrentActiveUsers, 1000);

  const startFakeLoading = () => {
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 150);
  };

  async function combineAndLoadAnimation(avatarUrl) {
    setloading(true);
    startFakeLoading();

    console.log(avatarUrl);
    // handleNext();
    const avatarId = avatarUrlSplitter(avatarUrl);
    // window.open("https://events.gclverse.com/entrance1", "_self");
    const combinedGlbFile = await combineAnimations(
      avatarUrl,
      gender,
      setFile
    ).catch(console.error);
    console.log("combine animations completed and data is", combinedGlbFile);
    uploadObject(combinedGlbFile, avatarUrlSplitter(avatarUrl));
  }

  async function combineAnimations(modelPathName, gender, setFile) {
    const gltfLoader = new GLTFLoader();
    const gltfExporter = new GLTFExporter();
    const group = new Group();

    group.name = gltfName;

    const gltf = await loadGltfFiles(gltfLoader, modelPathName);
    group.add(gltf.scene);

    await loadAnimations(
      group,
      gender == "male" ? maleAnimations : femaleAnimations
    );
    const glbFile = await exportedAnimations(gltfExporter, gltf, group);
    return glbFile;
  }

  async function exportedAnimations(gltfExporter, gltf, group) {
    return new Promise((resolve, reject) => {
      gltfExporter.parse(
        gltf.scene,
        (glb) => {
          resolve(glb);
        },
        console.error,
        { binary: true, animations: group.animations }
      );
    });
  }

  async function loadAnimations(group, animations) {
    const gltfLoader = new GLTFLoader();
    for (const [name, path] of Object.entries(animations)) {
      const gltf = await loadGltfFiles(gltfLoader, path);
      gltf.animations[0].name = name;
      group.animations.push(gltf.animations[0]);
    }
  }

  async function loadGltfFiles(gltfLoader, path) {
    return await new Promise((resolve, reject) => {
      gltfLoader.load(path, resolve, undefined, reject);
    });
  }
  //   bg-val
  return (
    <main className="flex lg:flex-row flex-col min-h-screen bg-cover bg-[50%_0%] sm:bg-[50%_50%]   bg-no-repeat bg-mobile-hero-pattern sm:bg-hero-pattern  gap-8 lg:items-start items-center  lg:justify-between justify-start overflow-x-hidden  animate-slow-zoom">
      {/* lg:pt-14 pt-4 lg:px-20 px-2 */}
      {loading ? (
        <main className=" z-[100] relative min-h-screen w-screen overflow-x-hidden">
          {/* //  autoPlay playsInline muted loop id="myVideo" className="absolute w-auto select-none h-auto min-w-full min-h-full object-cover -z-10">
          //   <source src={"/loading-background.mp4"} type="video/mp4" />
          // </img> */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[rgba(2,32,67,0.91)]">
            <div className="absolute  bottom-0 md:bottom-8 right-0 left-0   w-full md:w-3/5 mx-auto shadow-lg">
              <BasicProgressBarWithLabel
                currentValue={progress}
                label="Loading"
                maxValue={100}
                key={"progress"}
              />
              <div className="bg-white bg-opacity-10 backdrop-blur-3xl lg:px-8 px-4 py-3 md:py-6 text-center lg:min-w-[500px] flex flex-col gap-2">
                <h2 className="text-xl text-[#F7F644] font-bold">
                  {" "}
                  Some interesting facts of Chess around the world!
                </h2>
                <h4 className="text-xl text-white">
                  The longest official game of chess took place in 1989 that
                  went on for 20 hours and included 269 moves
                </h4>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <>
          <div className="mt-4 ml-2 lg:ml-0 lg:mt-0 lg:absolute lg:top-14 top-4 lg:left-20 left-2 flex lg:items-center justify-between gap-2">
            <Image
              src={"/logo.svg"}
              alt="Tech Mahindra Global Chess League"
              width={150}
              height={300}
              className="w-40 sm:w-44"
            />
          </div>

          <div
            className="absolute lg:top-14 top-4 right-0  bg-white block lg:hidden bg-opacity-10 backdrop-blur-md border border-white/20 rounded-lg   lg:p-4 lg:px-6 sm:shadow-xl "
            style={{
              background:
                "linear-gradient(112.83deg, rgba(141, 141, 141, 0.47) 0%, rgba(0, 0, 0, 0) 110.84%)",
            }}
          >
            {/* <Image src={"/chess.svg"} alt="Next move" width={120} height={310} className="hidden md:block" />
            <Image src={"/partner.png"} alt="Next move" width={140} height={300} className="md:hidden block rounded-lg" /> */}
          </div>

          <div className="mx-auto mt-auto sm:mt-10 w-full">
            <h1
              className={classNames(
                "hidden sm:block lg:text-3xl text-[22px] text-[#2d1c42]  font-bold text-center mb-8",
                audiowide.className
              )}
            >
              Welcome to GCL Season 2
            </h1>
            <div className=" bg-white bg-opacity-30 backdrop-blur-xl lg:px-8 px-4 md:px-8 py-5 text-center  md:max-w-full mx-auto sm:w-[500px] flex flex-col">
              <h1
                className={classNames(
                  "sm:hidden lg:text-3xl text-[22px] text-[#2d1c42]  font-bold text-center mb-6",
                  audiowide.className
                )}
              >
                Welcome to GCL Season 2
              </h1>
              <div className="flex mb-2 sm:my-2 sm:hidden gap-x-3 gap-y-2 justify-center flex-wrap ">
                <div className=" flex items-center bg-white py-1 pr-[1.5rem] font-bold text-xs w-fit ">
                  <Image
                    width={400}
                    height={400}
                    className="w-10 h-7"
                    src="/hand.gif"
                    alt=""
                  />{" "}
                  <span className="font-bold"> Total Visitors:</span>{" "}
                  <span className="text-[#571ABA] ml-2">{activeVisitors}</span>
                </div>
                <div
                  className="cursor-pointer hidden sm:flex items-center bg-white py-1 px-3 font-bold text-xs w-fit min-w-[125px]"
                  onClick={toggleSound}
                >
                  <Image
                    className="w-10 h-5"
                    width={400}
                    height={400}
                    src="/stats.gif"
                    alt=""
                  />{" "}
                  <span className="font-bold">Sound:</span>
                  <span className="text-[#571ABA] cursor-pointer">
                    {isSoundOn ? "On" : "Off"}
                  </span>
                  <audio ref={audioRef} loop>
                    <source src="/test-sound.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
              <div className="mb-3">
                <div className="w-full  flex items-center justify-between text-sm   mt-1 bg-white flex-wrap">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="outline outline-1 focus:outline-2 focus:outline outline-black focus:outline-[#571ABA] w-full text-[#571ABA] placeholder:text-[#571ABA] font-semibold px-3 py-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="">
                <div className="grid grid-flow-row grid-cols-2   gap-2 ">
                  <div
                    onClick={() => {
                      setGender("male");
                      setselected(0);
                    }}
                    className={
                      gender == "male"
                        ? "border border-[#022043] py-3 bg-[#F7F644] cursor-pointer  flex flex-row justify-between items-center px-3 gap-1"
                        : "border border-[#022043] py-3 bg-white cursor-pointer  flex flex-row items-center justify-between  px-3 gap-1"
                    }
                  >
                    <div className="flex flex-row items-center gap-2 focus:outline focus:outline-black focus:outline-2">
                      <Image
                        alt="male"
                        width={20}
                        height={20}
                        src={"/male.png"}
                      />{" "}
                      Male
                    </div>
                    <div>
                      {gender == "male" ? (
                        <Checked fill={"#571ABA"} />
                      ) : (
                        <UnChecked />
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setGender("female");
                      setselected(0);
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
                    <div>
                      {gender == "female" ? (
                        <Checked fill={"#571ABA"} />
                      ) : (
                        <UnChecked />
                      )}
                    </div>
                  </div>
                </div>
                {gender && (
                  <div className="mt-3 font-bold text-[#571ABA]">
                    *&nbsp;Select Your Avatar
                  </div>
                )}
                {/* the avatars */}
                {gender && (
                  <div className="grid grid-cols-3 grid-rows-1 gap-1  md:gap-3 relative mt-[1.5] mb-3 w-full mx-auto">
                    {gender &&
                      (gender === "male" ? maleAvatars : femaleAvatars).map(
                        ({ id, src, height, width, className }) => (
                          <div
                            key={id}
                            onClick={() => {
                              setSelectedAvatarId(
                                src.substring(1, src.length - 5)
                              ),
                                setselected(id);
                            }}
                            className={classNames(
                              "relative  border-2  overflow-hidden ",
                              selected === id
                                ? "bg-[#F7F644]  border-[#F7F644] "
                                : "bg-white border-black"
                            )}
                          >
                            {selected == id && (
                              <Image
                                alt=""
                                src={"/check.svg"}
                                className="absolute top-1 left-1 h-5 w-5 z-10"
                                width={200}
                                height={200}
                              />
                            )}
                            <Image
                              alt={`look-${id}`}
                              src={src}
                              fill={!height && !width}
                              height={height || undefined}
                              width={width || undefined}
                              className={classNames(
                                className || "",
                                selected === id ? "scale-125 " : ""
                              )}
                            />
                          </div>
                        )
                      )}
                  </div>
                )}
              </div>
              <button
                disabled={gender == null || selected == 0 || name == ""}
                type="button"
                className={classNames(
                  gender == null || selected == 0 || name == ""
                    ? " bg-opacity-65  bg-[#ebff00] border-black border  text-black font-semibold gap-2  py-3 text-center flex items-center w-full justify-center px-2 md:text-xl cursor-pointer"
                    : " bg-opacity-100 bg-[#fff700] border-black border  text-black font-semibold gap-2  py-3 text-center flex items-center w-full justify-center md:text-xl",
                  gender ? "mt-0" : "mt-3"
                )}
                onClick={() => window.open(  "https://events.gclverse.com/entrance1/?name=" + name + "&avatarId=" +   selectedAvatarId,   "_self")
                }
              >
                {enabled ? (
                  <SpinnerCircular
                    size={isMobile ? 24 : 28}
                    color="#000"
                    thickness={120}
                  />
                ) : (
                  <div onClick={() => setEnabled(true)}>
                    Let&apos;s Visit Friends House in London
                  </div>
                )}
              </button>
              {gender && (
                <div className="flex flex-col gap-2 my-2">
                  <div className="mx-auto font-bold text-black text-xl">
                    {/* ♟️ */}
                    OR
                  </div>
                  <div className="mx-auto text-center font-bold text-[1rem] sm:text-xl w-full text-black  ">
                    You can create your own custom look in few {"\n"}simple
                    steps. It is fun!{" "}
                  </div>
                  <button
                    onClick={() => setIsFrameOpen(true)}
                    type="button"
                    className={
                      "bg-opacity-100 hover:bg-[#fff700] bg-[#ebff00] border-black border  text-black font-semibold gap-2  py-3 text-center flex items-center w-full justify-center md:text-xl"
                    }
                  >
                    Create My Own Look
                  </button>
                </div>
              )}
              <div className="sm:flex mt-4 my-2 hidden gap-x-3 gap-y-2 justify-center flex-wrap ">
                <div className=" flex items-center bg-white py-1 pr-[1.5rem] font-bold text-xs w-fit ">
                  <Image
                    width={400}
                    height={400}
                    className="w-10 h-7"
                    src="/hand.gif"
                    alt=""
                  />{" "}
                  <span className="font-bold"> Total Visitors:</span>
                  {"   "}
                  <span className="text-[#571ABA] ml-2">{activeVisitors}</span>
                </div>
                <div
                  className=" cursor-pointer hidden sm:flex items-center bg-white py-1 px-3 font-bold text-xs w-fit min-w-[125px]"
                  onClick={toggleSound}
                >
                  {isSoundOn ? (
                    <Image
                      className="w-10 h-5"
                      width={400}
                      height={400}
                      src="/stats.gif"
                      alt=""
                    />
                  ) : (
                    <Image
                      className="w-10 h-5"
                      width={400}
                      height={400}
                      src="/stats.png"
                      alt=""
                    />
                  )}
                  <span className="font-bold">Sound:</span>
                  <span className="text-[#571ABA] cursor-pointer">
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
          {/* <div className="bg-white lg:block lg:absolute lg:top-14 top-4 right-0 hidden bg-opacity-10 backdrop-blur-md border border-white/20 rounded-lg p-4 px-6">
            <Image src={"/chess.svg"} alt="Next move" width={180} height={300} />
          </div> */}
          {isFrameOpen && (
            <AvatarIframe
              setRpmFrame={setIsFrameOpen}
              setReadyPlayerUrl={setAvatarUrl}
              isMale={gender == "male"}
            />
          )}
        </>
      )}
    </main>
  );
}
