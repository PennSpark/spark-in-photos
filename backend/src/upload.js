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


  dateObj = new Date(dateS);
  console.log(dateObj)
  dateString = dateObj.getFullYear().toString() + '/' + (dateObj.getMonth() + 1).toString() + '/' + dateObj.getDate().toString()

  // Use this to check if file is well-formed
  // const res = fs.writeFile("image.jpg", blob);

  // Source: https://support.cloudinary.com/hc/en-us/community/posts/360007581379-Correct-way-of-uploading-from-buffer-
  // TO-DO: Figure out how to upload metadata
  let cld_upload_stream = cloudinary.uploader.upload_stream(
    {
      folder: "Spork_in_Photos",
      context: {
        date: dateString,
        user: userS
      }

    },
    function (error, result) {
      console.log(error, result);
    }
  );

  blob.pipe(cld_upload_stream);
}
function getWeek(fromDate) {
  var sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay()))
    , result = [new Date(sunday)];
  while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
    result.push(new Date(sunday));
  }
  return result;
}

function getResource(dateString) {
  return new Promise(function (resolve, reject) {
    cloudinary.search
      .expression('resource_type:image AND context.date=' + dateString)
      .with_field('context')
      .execute((error, result) => {
        if (error) {
          reject(error)
        } else {
          urlArr = [];
          resources = result.resources;
          for (let j = 0; j < resources.length; j++) {

            if (resources[j] != null) {
              urlArr.push(resources[j].url);

            }
          }
          resolve(urlArr);
        }
      })
  })
}

async function fetchByWeek(startD) {
  var finalURL = [];
  var week = getWeek(new Date(startD));
  try {
    for (let i = 0; i < week.length; i++) {
      dateString = week[i].getFullYear().toString() + '/' + (week[i].getMonth() + 1).toString() + '/' + week[i].getDate().toString()

      urls = await getResource(dateString)
      for (let j = 0; j < urls.length; j++) {
        finalURL.push(urls[j]);

      }
    }

    return (finalURL)
  }
  catch (e) {


    console.log(e)
  }
}

// const url = 'https://files.slack.com/files-pri/T02BG31SB7H-F0526MHEJH4/coffee_flavours.jpg';
// // fetchAndUpload(url, 1681158699, "cindy")
main()
async function main() {
  arr = await fetchByWeek('2020/4/12')

  console.log(arr)

}






/*
 (1) Upload metadata (work out with jasper what kind of metadata)
 (2) Fetch Images by week 
 (3) Images fetches should have all metadata
 */