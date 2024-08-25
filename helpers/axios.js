import axios from "axios";
import { backendUrls } from "../constants/urlConfig";
import { getData, storeData } from "@/store/localStorage";
import { router } from "expo-router";

// Function to get the token from local storage
const getToken = async () => {
  const token = await getData("token");
  return `bearer ${token}`;
};

// Create an async function to initialize axios instance
const createAxiosInstance = async () => {
  const token = await getToken();

  const axiosInstance = axios.create({
    baseURL: backendUrls.base,
    headers: {
      Authorization: token,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const token = await getData("token");
    if (token) {
      req.headers.Authorization = `bearer ${token}`;
    }
    return req;
  });

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const { status } = error.response;

      if (status === 500) {
        await storeData("token", "").then(() => {
          router.replace("/sign-in");
        });
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Export the axios instance
export default createAxiosInstance;
