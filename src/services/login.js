import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const logout = async (item) =>{
    window.localStorage.removeItem(item)
}

export default { login, logout}