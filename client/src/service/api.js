import axios from 'axios';

const API_URI = 'https://filesharing-application-xgqw.onrender.com'; // or localhost if testing locally

export const uploadFile = async (data) => {
  try {
    const response = await axios.post(`${API_URI}/upload`, data);
    return response.data;
  } catch (error) {
    console.error('Error while uploading file', error.message);
  }
};
