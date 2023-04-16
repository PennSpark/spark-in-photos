import React from "react";
import Home from "./Home";
import HomeSection from "./HomeSection";

import "./styles.css";

const Dummy = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="image">
      <HomeSection
        title={props.title}
        date={props.date}
        index={props.index}
        pics={props.pics}
      />
      {/* <img src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"/> */}
    </div>
  );
});

export default Dummy;
