import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/";

export const POST = async (url, body) => {};

export const PUT = async (url, body) => {};

export const GET = async (url) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`${baseUrl}${url}`)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
