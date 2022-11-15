import axios from "axios";

const baseUrl = "http://localhost:55457/api/";

export const MAP_URL = (url) => {
    return `${baseUrl}${url}`;
};

export const POST = async (url, body) => {
    return new Promise(async (resolve, reject) => {
        await axios
            .post(`${baseUrl}${url}`, body)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const POST_FILE = async (url, body) => {
    return new Promise(async (resolve, reject) => {
        await axios
            .post(`${baseUrl}${url}`, body, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const PUT = async (url, body) => {
    return new Promise(async (resolve, reject) => {
        await axios
            .put(`${baseUrl}${url}`, body)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

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
