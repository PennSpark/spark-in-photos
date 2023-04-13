import React, { useCallback } from "react";
import "./styles.css";
import HomeSection from "./HomeSection";
import {
  useAnimationFrame,
  useScroll,
  useTransform,
  useVelocity,
} from "framer-motion";
import { motion } from "framer-motion";
import HorizontalScroll from "react-horizontal-scrolling";
import { useState, useRef, useEffect } from "react";
import Dummy from "./Dummy";


const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const [sections, setSections] = useState([
    {
      title: "This Week",
      date: "11.6 - 11.13",
      index: 0,
    },
    {
      title: "Last Week",
      date: "10.20-003.3",
      index: 1,
    },
  ]);

  const observer = useRef();
  const lastPageRef = useCallback((node) => {
    console.log("useCallBack called");
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      console.log("entry:" + entries[0]);
      if (entries[0].isIntersecting && hasMore) {
        // console.log("before section length" + sections.length);
        // if (sections.length === 10) {
        //   setHasMore(false);
        // }
        loadFunc();
        // console.log("after section length" + sections.length);
        // setPageNumber(pageNumber + 1);
        // console.log('end reached');
        // setHasMore(true);
      }
    });
    if (node) observer.current.observe(node);
  });

  const { scrollY } = useScroll();
  const transX = useTransform(
    scrollY,
    [0, window.innerHeight * 2],
    [0, -window.innerWidth]
  );

  function loadFunc() {
    setSections([
      ...sections,
      {
        title: "Last Week",
        date: "10.20-003.3",
        index: pageNumber,
      },
    ]);
    setPageNumber(pageNumber + 1);
    console.log("loadFun called");
  }

  useEffect(() => {
    console.log("Section length:", sections.length);
  }, [sections]);

  return (
    <div className="main-div">
      {console.log("rerendering")};
      <HorizontalScroll>
        {sections.map((section, index) => {
          console.log("new div added");
          // console.log("index" + section.index);
          if (sections.length === index + 1) {
            console.log("ref set");
            // setHasMore(true);
            return (
              <div key={index} className="relative">
                <Dummy 
                ref={lastPageRef}
                title={section.title}
                date={section.title}
                index={section.index}/>
                {/* <HomeSection
                ref={lastPageRef}
                title={section.title}
                date={section.title}
                index={section.index}
                className=''
              /> */}
              </div>
            );
          } else {
            return (
              <div key={index} className="relative">
                {/* <Dummy key={index} /> */}
                <Dummy title={section.title}
                date={section.title}
                index={section.index}/>

                {/* <HomeSection
                
                title={section.title}
                date={section.title}
                index={section.index}
                className=''
              /> */}
              </div>
            );
          }
        })}
      </HorizontalScroll>
    </div>
  );
};

export default Home;
