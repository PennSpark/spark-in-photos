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

const getDateStringFromWeeksAgo = (weeksAgo) => {
  const currentDate = new Date(); // get the current date
  const oneWeekAgo = new Date(); // create a new date object

  oneWeekAgo.setDate(currentDate.getDate() - (7 * weeksAgo)); // subtract 7 days from the current date

  return `${oneWeekAgo.getFullYear()}/${oneWeekAgo.getMonth() + 1}/${oneWeekAgo.getDate()}`
}


const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const [sections, setSections] = useState([]);
  const [weeksAgo, setWeeksAgo] = useState(0);


  useEffect(() => {
    async function fetchData() {
      const date = new Date()
      const response = await fetch("http://localhost:3000/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: getDateStringFromWeeksAgo(weeksAgo) })
      })
      console.log("FIRST LOAD", getDateStringFromWeeksAgo(weeksAgo))
      const picUrls = await response.json();
      console.log(picUrls)

      setSections([
        {
          title: "Week of ",
          date: getDateStringFromWeeksAgo(weeksAgo),
          index: pageNumber,
          pics: picUrls
        }
      ]);
    }
    fetchData();
    setWeeksAgo(weeksAgo + 1);
  }, [])

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

  async function loadFunc() {
    if (weeksAgo > 4) {
      return
    }

    const response = await fetch("http://localhost:3000/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date: getDateStringFromWeeksAgo(weeksAgo) })
    })

    console.log("SUBSEQUENT LOAD", getDateStringFromWeeksAgo(weeksAgo))
    const picUrls = await response.json();

    console.log(picUrls)
    setSections([
      ...sections,
      {
        title: "Week of ",
        date: getDateStringFromWeeksAgo(weeksAgo),
        index: pageNumber,
        pics: picUrls
      }
    ]);
    setPageNumber(pageNumber + 1);
    setWeeksAgo(weeksAgo + 1);
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
                  date={section.date}
                  index={section.index}
                  pics={section.pics} />

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
                  date={section.date}
                  index={section.index}
                  pics={section.pics}
                />

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
