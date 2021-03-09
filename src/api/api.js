import axios from 'axios';
import {store} from '../store/store'
import {logout,addToken} from "../store/actions/user"

export const apiUrl = 'http://192.168.0.143:5000/api'

export const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
});

export const apiWithoutHeader = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
});

api.interceptors.request.use( async function (config) {
    const accessTokenBefore = store.getState().userReducer.token
    const refreshToken = store.getState().userReducer.refreshToken
    if (accessTokenBefore) {
        await apiWithoutHeader
          .get("/student/verifyUser", {
            headers: {
              Authorization: `Bearer ${accessTokenBefore}`,
            },
          })
          .catch(async (err) => {
              var status 
              if(err.response){
                  status = err.response.status
              }
            if (status === 401) {
              await apiWithoutHeader
                .get("/student/token", {
                  params: {
                    refreshToken: refreshToken,
                  },
                })
                .then((res) => {
                  store.dispatch(addToken(res.data.accessToken))
                })
                .catch((err) => {
                  console.log(err)
                  store.dispatch(logout())
                });
            }
          })
          const accessToken = store.getState().userReducer.token
          config.headers.Authorization =  `Bearer ${accessToken}`;
    }
    return config;
}, function (error) {
  console.log(error)
    return Promise.reject(error)
})