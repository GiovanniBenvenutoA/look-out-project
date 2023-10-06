import { monedaApiUrl } from "@/app/api/apiConfig";
export const fetchMoneda = async () => {
    try {
      const response = await fetch(monedaApiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  