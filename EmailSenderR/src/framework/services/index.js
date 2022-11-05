import { GET } from "./axiosHelper";

export const loadSomeData = async () => {
  var response = await GET("posts");
  return response.data;
};

export const loadEmailBodyTemplate = async (key) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let html = "<p>Default templateeee</p>";
      if (key === "basic") html = "<p>Basic templateeee</p>";
      else if (key === "custom") html = "<p>Custom templateee</p>";
      resolve(html);
    }, 1000);
  });
};

export const loadEmailSendingProgess = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data + 5);
    }, 500);
  });
};

export const submitEmailData = async (data) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    setTimeout(function () {
      resolve([1, 2, 3, 4, 5, 6, 7]);
    }, 2000);
  });
};
