require("dotenv").config();
const cloudinary = require("cloudinary").v2
const fs = require('fs').promises;
const fetch = require('node-fetch');

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

const fetchAndUpload = async (url) => {
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
  blob = await response.blob()
  console.log(await blob.arrayBuffer())
  blob = await blob.stream()


  // Use this to check if file is well-formed
  // const res = fs.writeFile("image.jpg", blob);

  // Source: https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-
  // TO-DO: Figure out how to upload metadata
  let cld_upload_stream = cloudinary.uploader.upload_stream(
    {
      folder: "Spork_in_Photos"
    },
    function (error, result) {
      console.log(error, result);
    }
  );

  blob.pipe(cld_upload_stream);
}

const url = 'https://files.slack.com/files-pri/T02BG31SB7H-F051YPF4UMD/tiger_sticker.png';
fetchAndUpload(url)