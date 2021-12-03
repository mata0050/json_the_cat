const { argv } = require('process');
const request = require('request');
const fs = require('fs');

const breed = argv[2];

if (!breed) {
  console.log('Please enter the breed');
}

const fetchBreedDescription = function (breedName, callback) {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;
  request(url, (error, resp, body) => {
    // console.log(body);
    // console.log(typeof body);

    if (error) {
      callback(`Failed to request details: ${error}`, null);
    }

    const data = JSON.parse(body);
    // console.log(data);

    const breed = data[0];
    if (breed) {
      callback(null, breed.description);
    } else {
      callback(`Failed to find breed ${breedName}`, null);
    }
  });
};

fetchBreedDescription(breed, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});
