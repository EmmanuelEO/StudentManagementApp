// import fetch from "unfetch";
import axios from "axios";

export const retrieveAllStudents = async () => {
    const { data } = await axios.get('/api/v1/students')
    try {
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}