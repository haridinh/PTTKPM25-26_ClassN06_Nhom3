import axios from "axios";

// base url
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
   baseURL: baseURL,
   timeout: 5000,
});

export const fetchData = async ({ queryKey }) => {
   try {
      const res = await instance.get(`/${queryKey}`, {
         headers: {
            "Content-Type": "application/json",
            "Accept-Language": localStorage?.getItem("lang") || "en",
         },
      });
      if (!res.data) {
         throw Error(res.data.message);
      }

      return res.data;
   } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
   }
};

export const postData = async (url, data) => {
   try {
      const res = await instance.post(`/${url}`, data, {
         headers: {
            "Accept-Language": localStorage?.getItem("lang") || "en",
            "Content-Type": "multipart/form-data",
         },
      });
      if (!res.data) {
         throw Error(res.data.message);
      }
      return res.data;
   } catch (error) {
      console.error("Error posting data:", error);
      throw error;
   }
};

export default instance;
