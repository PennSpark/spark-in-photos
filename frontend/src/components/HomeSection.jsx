import React from 'react'
import Picture from './Picture'
import { useRef } from 'react'
import './styles.css'
import '../App.css'

const HomeSection = React.forwardRef((props, ref) => {
    const picUrls = props.pics


    const dummyPic = []

    for (var i = 0; i < picUrls.length; i++) {
        dummyPic.push({
            img: picUrls[i],
            location: "Singapore",
            title: "Good time",
            people: ["Paul", "Lah"]
        })
    }

    // console.log(dummyPic)
    const styling = { width: `${picUrls.length * 10}%` }

    return (
        <div ref={ref} className='h-[90vh] w-100 inline-block homesection' >
            <div className=''>
                {dummyPic.map(function (memory, index) {
                    console.log("Woo")
                    const x = (Math.random() * 100) + (window.innerWidth / 1.1 * (index % 4)) / 4 //(index % 4)/4//(Math.random() * 100) + (window.innerWidth/1.5 * (index % 4))/4 + (window.innerWidth * (props.index))//window.innerWidth * (index % 4)/4 + (window.innerWidth * props.index) //.9 + window.innerWidth * props.index
                    const y = (Math.random() * 50) + (window.innerHeight / 1.7 * (index % 3)) / 3//(index % 3)/3//(Math.random() * 50) + (window.innerHeight/4 * (index % 3))/3//.9) / 2
                    const z = Math.random() * picUrls.length;
                    var image = new Image();
                    image.src = memory.img;
                    const h = Math.floor(image.height / 12);
                    const w = Math.floor(image.width / 12);
                    return (
                        <div key={index} className='indiv-image'>
                            <Picture img={memory.img} location={memory.location} title={memory.title}
                                x={x} y={y} height={h} width={w} z={z} key={index}
                            />
                        </div>
                    )
                })}
            </div>
            <div className='absolute bottom-0 p-8 z-50'>
                <h1 className='text-3xl'>
                    {props.title}
                </h1>
                <h2 className='text-xl'>
                    {props.date}
                </h2>
            </div>
        </div >
    )
}
);

export default HomeSection