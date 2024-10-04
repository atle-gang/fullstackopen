import axios from "axios";

const fetchWeather = async (capitalCity) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { fetchWeather };
