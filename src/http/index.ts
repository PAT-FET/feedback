import axios, { AxiosResponse } from 'axios'
import config from '@/config'

const http = function () {
  let h = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
    timeout: 30 * 1000
  })
  h.interceptors.response.use(function (response: AxiosResponse) {
    if (response.status === 200) {
      let code = response.data.resultCode
      if (code === '000000') return Promise.resolve(response.data.data)
      return Promise.reject(response.data.errMsg || response.data.data)
    } else {
      return Promise.reject(response.statusText)
    }
  })
  return h
}

export default function getHttp () {
  return (config.http || http())
}
