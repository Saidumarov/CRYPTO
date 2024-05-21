import axios from "axios";
export const Apiservice = {
  async fetching(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }
  },
};
