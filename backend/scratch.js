require("dotenv").config();
const cloudinary = require("cloudinary").v2

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