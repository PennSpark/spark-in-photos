// Or use require() in node

// Or use type===module in package.json
require("dotenv").config();
const cloudinary = require("cloudinary").v2
const fs = require('fs').promises;
const fetch = require('node-fetch');


// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// Log the configuration
// console.log(cloudinary.config());


// Fetch images from the web without uploading them
const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

const readFileAsByteArray = async (filePath) => {
  const buffer = await fs.readFile(filePath);
  return new Uint8Array(buffer);
};

const main = async () => {
  const bytes = await readFileAsByteArray("./dog.jpg")
  const id = await uploadImage(bytes)
  console.log(id)
}

// main()

const fetchSlack = async () => {
  const url = 'https://files.slack.com/files-pri/T02BG31SB7H-F051L9XPW0P/panda_sticker.png';

  // const data = {
  //   name: 'John',
  //   age: 30
  // };

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.BOT_TOKEN
    },
    // body: JSON.stringify(data)
  };

  const response = await fetch(url, options)
  blob = await response.blob()
  blob = await blob.arrayBuffer()
  console.log(blob)

  // https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-

}

fetchSlack()