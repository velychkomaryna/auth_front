import axios from "axios";


export const USER_KEY = "user"
const LOGIN_PATH = "/dj-rest-auth/login";
const LOGOUT_PATH = "/dj-rest-auth/logout"
const REGISTER_PATH = "/dj-rest-auth/registration";
const RESET_TOKEN_PATH = "/dj-rest-auth/token/refresh";
const PRIVATE_PATH = "/private";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
  });


client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && originalRequest.url !== `${RESET_TOKEN_PATH}/`) {
            try {
                await refreshToken();
                // try to get origin request
                return api(originalRequest);
            } catch (err) {
                // move to login
                localStorage.removeItem(USER_KEY);
                window.location.href = '/login';
            }
            }
        return Promise.reject(error);
    }
);

    export async function login(data) {
    const url = `${LOGIN_PATH}/`;
    const response = await client.post(url, data);
    return response.data;
  }

  export async function logout() {
    const url = `${LOGOUT_PATH}/`;
    const response = await client.post(url);
    return response.data;
  }
  
  export async function register(data) {
    const url = `${REGISTER_PATH}/`;
    const response = await client.post(url, data);
    return response.data
  }

  export async function refreshToken() {
    const url = `${RESET_TOKEN_PATH}/`;
    const response = await client.post(url);
    const newAccessToken = response.data.access; 
    
    return newAccessToken;
  }
  
  export async function privatePage() {
    const url = `${PRIVATE_PATH}/`;
    const response = await client.get(url);
    return response.data
  }
