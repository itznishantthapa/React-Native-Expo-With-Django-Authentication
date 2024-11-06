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
    return { success: true, data: response.data.msg};
  } catch (error) {
    return {success: false, data: error.response?.data?.msg || "Something went wrong" };
  }
};

//export post function for profile picture
export const postProfilePicture = async (endpoint, uri) => {
  
  const formData = new FormData();
  formData.append('profile_picture', {
      uri: uri,
      type: 'image/jpeg',
      name: 'profile_picture.jpg',
  });

  try {
    const response = await api.post(`${endpoint}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { success: true, data: response.data.msg };
  } catch (error) {
    return { success: false, data: error.response?.data?.msg || "Something went wrong" };
  }
};