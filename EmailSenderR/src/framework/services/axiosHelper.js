import axios from "axios";
import queryString from "query-string";

const baseUrl = "http://localhost:55457/api/";
const qsData = queryString.parse(window.location.search);
axios.defaults.headers.common["userId"] = qsData.id;

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

export const DELETE = async (url) => {
    return new Promise(async (resolve, reject) => {
        await axios
            .delete(`${baseUrl}${url}`)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};
