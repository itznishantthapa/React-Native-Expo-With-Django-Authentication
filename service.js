// service.js
import axios from "axios";

// Set up a base URL for your Django API
const api = axios.create({
  baseURL: "http://192.168.1.64:5555/",
});


//Whenever you want to make a POST request, you can use the following function
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(`${endpoint}/`, data);
    return { success: true, data: response.data.message};
  } catch (error) {
    return {success: false, data: error.response?.data?.message || "Something went wrong",
    };
  }
};
