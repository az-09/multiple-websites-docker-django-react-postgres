import axios from 'axios'

const axiosHelper = () => {

    const baseURL = window.location.origin === 'http://localhost:3000' ? 'http://127.0.0.1:8000/api/' : window.location.origin +'/api/'
    console.log(baseURL)
    const headers = {}   

    const axiosHelper = axios.create({
        baseURL,
        headers
    })

    axiosHelper.interceptors.response.use(
        (res) => new Promise((resolve) => {
            resolve(res)
        }),
        (err) => {
            return new Promise((reject) => {
                reject(err);
            });
        }
    )
    return axiosHelper
}

export default axiosHelper