import axios from 'axios';

const TOKEN_API_URL = "https://interview.switcheo.com/prices.json";

export const fetchTokenInfo = async () => {
    try {
        const result = await axios.get(TOKEN_API_URL);
        return (result?.data || []).filter(item => {
            const date = new Date(item?.date);
            return item?.currency && item?.price && !isNaN(date.getTime());
        });  
    } catch (error) {
        throw error;
    }
}