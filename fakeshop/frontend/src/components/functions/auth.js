//รวม function auth ส่งค่า หน้า-หลัง หน้า
import axios from 'axios'
//register
export const register = async (value) =>
    await axios.post(process.env.REACT_APP_API + '/register', value);
//login
export const login = async (value) =>
    await axios.post(process.env.REACT_APP_API + "/login", value);

export const currentUser = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/current-user",
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
}

export const currentAdmin = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/current-admin",
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
}


