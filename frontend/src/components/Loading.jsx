import React, { useState } from "react";
import { motion } from "framer-motion";

function Loading() {
  const picUrls = [
    "11iWjzooHB3iM8eGN4ZAkEuTRicFtBAT2",
    "1WoqfN90yoU79hwV-McCcFvKn5SYnybxF",
    "1WoqfN90yoU79hwV-McCcFvKn5SYnybxF",
    "1CxqFVYJ8K8VqalWsLhdSadwPaS3UWoMc",
    "1EkiVTnzai5eZ75LSkKF7EPuSfAdPZB_8",
    "1TJlgnl93RwalJJtOv0x5iNyyRic3wwuw",
    "1udEPQt3BbiLEbe63pdhrOlNCrqF_0jPr",
    "1J5l5XkAA3u5qmSrlvgpfvhXHWVKG53Xt",
    "1X3RBdFY8KKcYhT6HAc0qlFfZ3FUXbgdt",
  ];

  const variants = {
    initial: {
      y: "-100%",
    },
    animate: {
      y: 0,
    },
  };
  const variantsRev = {
    initial: {
      y: "100%",
    },
    animate: {
      y: 0,
    },
  };
  const zoom = {
    initial: {
      scale: 1,
    },
    animate: {
      scale: 6,
    },
  }
  const transition = {
    delay: 0.5,
    duration: 3,
    ease: [0.6, 0.01, -0.05, 0.95],
  };
  const zoomTransition = {
    delay: 3,
    duration: 2,
    ease: [0.6, 0.01, -0.05, 0.95],
  };
  function after(count, f) {
    let noOfCalls = 0;
    return function (...rest) {
      noOfCalls = noOfCalls + 1;
      if (count === noOfCalls) {
        f(...rest);
      }
    };
  }
  const [loading, setLoading] = useState(true);
  const onComplete = after(picUrls.length * 5-1, () => {
    setLoading(false);
    console.log("loaded");
  });

  return (
    <motion.div className="flex justify-center items-center w-full h-screen fixed top-0 right-0 z-50" animate={loading && {opacity: 0}} transition={{delay: 5, duration: 1}} initial={{opacity: 1}}>
      <motion.div className="w-full bg-[#484a4a] flex justify-evenly items-center"
      variants={zoom}
      animate={loading ? "" : "animate"}
      initial="initial"
      transition={zoomTransition}>
        <motion.div
          className=" w-1/6 flex flex-col gap-12"
          variants={variants}
          animate={loading ? "" : "animate"}
          initial="initial"
          transition={transition}
        >
          {picUrls.map((url, index) => (
            <div className="h-44">
              <motion.img
                src={`https://drive.google.com/uc?export=view&id=${url}`}
                className="h-44 w-full object-cover border-4"
                key={index}
                onLoad={onComplete}
              />
            </div>
          ))}
        </motion.div>
        <motion.div
          className=" w-1/6 flex flex-col gap-12"
          variants={variantsRev}
          animate={loading ? "" : "animate"}
          initial="initial"
          transition={transition}
        >
          {picUrls
            .slice(0)
            .reverse()
            .map((url, index) => (
              <div className="h-44">
                <motion.img
                  src={`https://drive.google.com/uc?export=view&id=${url}`}
                  className="h-44 w-full object-cover border-4"
                  key={index}
                  onLoad={onComplete}
                />
              </div>
            ))}
        </motion.div>
        <motion.div
          className=" w-1/6 flex flex-col gap-12"
          variants={variants}
          animate={loading ? "" : "animate"}
          initial="initial"
          transition={transition}
        >
          {picUrls.map((url, index) => (
            <div className="h-44">
              {index !== 4 ? <motion.img
                src={`https://drive.google.com/uc?export=view&id=${url}`}
                className="h-44 w-full object-cover border-4"
                key={index}
                onLoad={onComplete}
              /> :
              <div key={index} className="h-44 w-full bg-[#EFEFEA]"></div>}
            </div>
          ))}
        </motion.div>
        <motion.div
          className=" w-1/6 flex flex-col gap-12"
          variants={variantsRev}
          animate={loading ? "" : "animate"}
          initial="initial"
          transition={transition}
        >
          {picUrls
            .slice(0)
            .reverse()
            .map((url, index) => (
              <div className="h-44">
                <motion.img
                  src={`https://drive.google.com/uc?export=view&id=${url}`}
                  className="h-44 w-full object-cover border-4"
                  key={index}
                  onLoad={onComplete}
                />
              </div>
            ))}
        </motion.div>
        <motion.div
          className=" w-1/6 flex flex-col gap-12"
          variants={variants}
          animate={loading ? "" : "animate"}
          initial="initial"
          transition={transition}
        >
          {picUrls
            .map((url, index) => (
              <div className="h-44">
                <motion.img
                  src={`https://drive.google.com/uc?export=view&id=${url}`}
                  className="h-44 w-full object-cover border-4"
                  key={index}
                  onLoad={onComplete}
                />
              </div>
            ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Loading;
