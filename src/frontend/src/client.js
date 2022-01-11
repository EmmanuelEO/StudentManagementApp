import axios from "axios";

export const retrieveAllStudents = async () => {
    const {data} = await axios.get('/api/v1/students')
    try {
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const addNewStudent = async student => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const { data } = await axios.post('/api/v1/students', student, config)
        return data;
    } catch(error) {
        return Promise.reject(error)
    }
}

export const deleteStudent = async studentID => {
    try {
        await axios.delete(`/api/v1/students/${studentID}`)
    } catch (error) {
        return Promise.reject(error);
    }
}

