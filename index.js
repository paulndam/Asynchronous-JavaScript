const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) {
        reject(`Couldn't read from file 🤯🤯🤯`);
      }
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (error) => {
      if (error) {
        reject(`Couldn't write to file 🤯🤯🤯`);
      }
      resolve(`Suuuccceeeessss`);
    });
  });
};

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed :--------> ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePromise(`dog-image.txt`, res.body.message);
//   })
//   .then(() => {
//     console.log(`Writing to file now with success`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const getDogPicture = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed :--------> ${data}`);

    const res1Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Promise, res2Promise, res3Promise]);
    const images = all.map((value) => value.body.message);
    console.log(images);

    await writeFilePromise(`dog-image.txt`, images.join("\n"));
    console.log(`Writing to file now with success`);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return `2: ready ----+>>> 🤪`;
};

(async () => {
  try {
    console.log(`1: will get the dog pics`);
    const x = await getDogPicture();
    console.log(x);
    console.log(`3: done getting the dog pics`);
  } catch (error) {
    console.log(error);
  }
})();

// console.log(`1: will get the dog pics`);
// getDogPicture()
//   .then((x) => {
//     console.log(x);
//     console.log(`3: done getting the dog pics`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
