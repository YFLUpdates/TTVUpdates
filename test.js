import _ from "lodash";
import { promises as fs } from "fs";
import fetch from "node-fetch";
// import waitforme from "./components/waitforme.js";
// import randomNumber from "./components/randomNumber.js";

const read = await fs.readFile("./toCheck.json", "UTF-8");
const parse = JSON.parse(read);
let number = 138;
let array = JSON.parse(await fs.readFile("./saveHere.txt", "UTF-8"));

// setInterval(async () => {
//   const copy = number;
//   // await waitforme(randomNumber(3000, 5000));

//   ++number;

//   const res = await fetch(`https://xayo.pl/api/mostWatched/${parse[copy]}`, {
//     method: "get",
//     headers: {
//       "Content-type": "application/json",
//     },
//   });

//   if (res.status !== 200) {
//     return;
//   }

//   let data = await res.json();

//   const indexOfObject = data.findIndex((object) => {
//     return object.streamer === "kubx";
//   });

//   if (indexOfObject === -1) {
//     return;
//   }

//   console.log(
//     parse[copy],
//     "Watchtime: ",
//     data[indexOfObject].count * 5,
//     "New request ",
//     number
//   );

//   if (!data[indexOfObject].count || isNaN(Number(data[indexOfObject].count))) {
//     return;
//   }

//   if (data[indexOfObject].count * 5 >= 10080) {
//     array.push(parse[copy]);

//     await dsad();
//   }
// }, 5000);

// async function dsad() {
//   fs.writeFile("saveHere.txt", JSON.stringify(array), (err) => {
//     console.log(err);
//   });
// }

// const xarray1 = JSON.parse(await fs.readFile("./files/kubx_viewers.json", "utf-8"));
// const xarray2 = JSON.parse(await fs.readFile("./saveHere.txt", "utf-8"));
// const xarray3 = xarray1.concat(xarray2);

// setInterval(() => {
//   fs.writeFile("saveHere.txt", JSON.stringify(array), (err) => {
//     console.log(err);
//   });
// }, 7000);
// const addsa = _.uniqBy(xarray3, function (e) {
//   return e;
// });

// console.log(addsa.length)
// fs.writeFile("saved.json", JSON.stringify(addsa), (err) => {
//   console.log(err);
// });
