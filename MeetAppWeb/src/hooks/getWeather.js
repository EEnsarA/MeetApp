import axios from "axios";

export const getWeather = async (city) => {
    const weatherApi = `https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${city}`;

    const headers = {
        authorization: "apikey 2TF3WndYb9hlUVWq2tB2i9:1Xcy1bKWrCKqHch3DpUxK9",
        "content-type": "application/json",
    };

    try {
        const response = await axios.get(weatherApi, { headers });
        return response.data;
    } catch (err) {
        console.error("Hava durumu verisi alınamadı:", err.message);
        throw err;
    }
};