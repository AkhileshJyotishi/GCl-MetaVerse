//@ts-ignore
import React, { useEffect, useRef, useState } from "react";

const subdomain = "graphity"; // Replace with your custom subdomain

// props define

const AvatarIframe = ({ setRpmFrame, setReadyPlayerUrl, isMale }) => {
  const frame = useRef(null);
  const [value, setValue] = useState("");

  const saveGlbAvatar = async (glbURL) => {
    try {
      //   const response = await axiosInstance.post(
      //     '/api/v1/user/updateInfo',
      //     {
      //       glbAvatar: glbURL
      //     },
      //     {
      //       withCredentials: true
      //     }
      //   )
      //   console.log(response)
      //   showSuccess('Virtual avatar created!')
    } catch (err) {
      console.log(err);
      //   showError('Some error occurred')
    }
  };

  useEffect(() => {
    if (frame.current === null || frame.current === undefined) return;
    frame.current?.setAttribute("src", `https://${subdomain}.readyplayer.me/avatar?lod=2&clearCache&frameApi&quality=low&morphTargets=none&gender=${isMale ? "male" : "female"}`);
    //lod=2
    //frameApi
    // frame.current.setAttribute("src", `https://${subdomain}.readyplayer.me/avatar?frameApi&darkTheme`);

    function subscribe(event) {
      const json = parse(event);

      if (json?.source !== "readyplayerme") {
        return;
      }

      // Susbribe to all events sent from Ready Player Me once frame is ready
      if (json.eventName === "v1.frame.ready") {
        frame.current?.contentWindow?.postMessage(
          JSON.stringify({
            target: "readyplayerme",
            type: "subscribe",
            eventName: "v1.**",
          }),
          "*"
        );
        console.log("Frame is ready");
      }

      // Get avatar GLB URL
      if (json.eventName === "v1.avatar.exported") {
        setValue(json.data.url);
        console.log(json.data.url);
        saveGlbAvatar(json.data.url);
        // onOpen();
      }

      // Get user id
      if (json.eventName === "v1.user.set") {
        console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
      }
    }

    function parse(event) {
      try {
        return JSON.parse(event.data);
      } catch (error) {
        return null;
      }
    }

    window.addEventListener("message", subscribe);
    document.addEventListener("message", subscribe);

    return () => {
      window.removeEventListener("message", subscribe);
      document.removeEventListener("message", subscribe);
    };
  }, []);

  useEffect(() => {
    if (value == null || value === "") return;
    updateValues();
  }, [value]);

  async function updateValues() {
    await localStorage.setItem("avatarUrl", value);
    setReadyPlayerUrl(value);
    // setAvatar(value);
    await localStorage.setItem("metaverseLink", "https://icc.streetverse.world/8iaQk64/surprised-informal-gala?name=" + "ICCPlayer" + "&avatarId=" + value.split("/")[3].split(".")[0]);
    // axios.get(value)
    setRpmFrame(false);
  }
  return (
    <div>
      <button onClick={() => setRpmFrame(false)} className="fixed top-[8px] lg:top-4 right-[95px] md:right-[105px] lg:right-[140px] z-50 cursor-pointer rounded-[8px] bg-[#e34030] px-4 md:px-6  py-[6px] md:py-2 lg:py-[14px] text-sm md:text-xl text-white ">
        BACK
      </button>
      <div className={value == "" ? "fixed top-0 left-0 z-40 h-full w-full rounded-2xl shadow-xl  " : ""}>
        <iframe width="100%" height="100%" ref={frame} id="frame" className="frame" allow="camera *; microphone *; clipboard-write"></iframe>
      </div>
    </div>
  );
};

export default AvatarIframe;
