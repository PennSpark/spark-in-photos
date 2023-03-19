import React from 'react'
import Picture from './Picture'

const HomeSection = (props) => {
    const picUrls = [
        "11iWjzooHB3iM8eGN4ZAkEuTRicFtBAT2",
        "1cvu7z9lzpKicgtakbOTq-DdSeu2Icim2",
        "1WoqfN90yoU79hwV-McCcFvKn5SYnybxF",
        "1WoqfN90yoU79hwV-McCcFvKn5SYnybxF",
        "1CxqFVYJ8K8VqalWsLhdSadwPaS3UWoMc",
        "1EkiVTnzai5eZ75LSkKF7EPuSfAdPZB_8",
        "1TJlgnl93RwalJJtOv0x5iNyyRic3wwuw",
        "1udEPQt3BbiLEbe63pdhrOlNCrqF_0jPr",
        "1J5l5XkAA3u5qmSrlvgpfvhXHWVKG53Xt",
        "1X3RBdFY8KKcYhT6HAc0qlFfZ3FUXbgdt"
    ]

    
    const dummyPic = []

    for (var i = 0; i < picUrls.length; i ++) {
        dummyPic.push({
            img: "https://drive.google.com/uc?export=view&id=" + picUrls[i],
            location: "Singapore",
            title: "Good time",
            people: ["Paul", "Lah"]
        })
    }

    console.log(dummyPic)

    return (
        <div className='h-[90vh] w-screen inline-block'>
            <div className=''>
                {dummyPic.map(function(memory, index){
                        const x = Math.random() * window.innerWidth * .9 + window.innerWidth * props.index
                        const y = Math.random() * (window.innerHeight * .9) / 2
                    return(
                        <>
                            <Picture img = {memory.img} key={index} location={memory.location} title={memory.title} x={x} y={y}/>
                        </>
                    )
                })}
            </div>
            <div className='absolute bottom-0 p-8 z-0'>
                    <h1 className='text-3xl'>
                        {props.title}
                    </h1>
                    <h2 className='text-xl'>
                        {props.date}
                    </h2>
            </div>
    </div>
    )
}

export default HomeSection