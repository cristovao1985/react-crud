import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL; //"http://localhost:9000/.netlify/functions/api/base";
const headersJson = {
  Authorization: "Basic MTEyMzQ1Njc4OTA6MDk4NzY1NDMyMTE=",
  "Content-Type": "application/json",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: async (table) => {
    var data = JSON.stringify({
      table: table,
    });

    const response = await axios({
      method: "POST",
      url: `${baseUrl}`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  add: async (table, object) => {
    var data = JSON.stringify({
      table: table,
      object: object,
    });

    const response = await axios({
      method: "POST",
      url: `${baseUrl}/insert`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  update: async (table, object) => {
    var data = JSON.stringify({
      table: table,
      object: object,
    });

    const response = await axios({
      method: "PUT",
      url: `${baseUrl}/update`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  remove: async (table, object) => {
    var data = JSON.stringify({
      table: table,
      object: object,
    });

    const response = await axios({
      method: "DELETE",
      url: `${baseUrl}/remove`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
  getById: async (table, id) => {
    var data = JSON.stringify({
      table: table,
    });

    const response = await axios({
      method: "POST",
      url: `${baseUrl}/${id}`,
      data: data,
      headers: headersJson,
    });

    return response.data;
  },
};
