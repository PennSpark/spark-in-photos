require("dotenv").config();
const cloudinary = require("cloudinary").v2
const fs = require('fs').promises;
const fetch = require('node-fetch');

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

async function fetchAndUpload(url, dateS, userS) {
  // Fetch the slack file 
  // Has to be a bot scraped url, not a manual one
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'image/jpeg',
      'Authorization': 'Bearer ' + process.env.BOT_TOKEN
    },
  };

  const response = await fetch(url, options)
  var blob = await response.blob()
  console.log(await blob.arrayBuffer())
  blob = await blob.stream()


  // Use this to check if file is well-formed
  // const res = fs.writeFile("image.jpg", blob);

  // Source: https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-
  // TO-DO: Figure out how to upload metadata
  let cld_upload_stream = cloudinary.uploader.upload_stream(
    {
      folder: "Spork_in_Photos",
      context:{
          date: dateS,
          user: userS
      }
      
    },
    function (error, result) {
      console.log(error, result);
    }
  );

  blob.pipe(cld_upload_stream);
}

function fetchByWeek(startD, endD){
  cloudinary.search
  .expression('resource_type:image' )
  .with_field('context')
  // .execute()
  // .then(result=>console.log(result));
  .execute((error, result) => {
    if (error) {
      consol
      e.log(error);
    } else {
      console.log("result");
      console.log(result.resources);
      console.log("result")
      // result.resources contains a list of resources that have metadata with timestamp value "2020/04/11"
    }
  });
}

const url = 'https://files.slack.com/files-pri/T02BG31SB7H-F0526MHEJH4/coffee_flavours.jpg';
// fetchAndUpload(url, "2020/04/12", "cindy")
fetchByWeek(1, 2)

/*
 (1) Upload metadata (work out with jasper what kind of metadata)
 (2) Fetch Images by week 
 (3) Images fetches should have all metadata
 */