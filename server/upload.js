require("dotenv").config();
const cloudinary = require("cloudinary").v2

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});


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


module.exports = { fetchByWeek }