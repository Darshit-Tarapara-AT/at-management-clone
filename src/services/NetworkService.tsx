import axios from 'axios';
import appConfig from 'config/config';
import { log } from 'app/utils/log';
import { store } from 'app/redux/store';
import config from 'config/config';
import { PATHS } from 'config/paths/paths';
import constant from 'config/const/const';
import { TASK_DETAILS_KEY } from 'app/pages/Tasks/Components/TaskTracker/TaskTracker';
const defaultHeaders = {
  "Content-Type": "application/json",
}
const appClient = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 40000,
  headers: defaultHeaders,
});

appClient.interceptors.request.use(async function (request) {
  /*
    if (status) config.headers.token = token;
  */

 const currentIP = store.getState().IpAddressStateData.currentIP;
 if(currentIP) {
  request.headers!.ip = currentIP;
 }
 else {
  const {data} = await axios.get(config.getIpAddressUrl)
  request.headers!.ip = data?.ipString
 }
  log("Starting Request", request);
  return request;
});

appClient.interceptors.response.use(
  function (response) {
    response.headers.ip = store.getState().IpAddressStateData.currentIP || ''
    // Do something with response data
    log("response", response);
    // Bad practice Unauthorized being sent with 200 status code, need to update this in future from backend
    if (
      response.data &&
      response.data.exceptionMessage &&
      response.data.exceptionMessage === "Unauthorized"
    ) {
      log("token expired, logout user");
    }
    return response;
  },
  function (error) {
    log("Request Failed:", error.config);
    /* istanbul ignore else */
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      if (error.response.status === "401" || error.response.status === 401 ||error.response.status === 0) {
        console.log(error)
        localStorage.removeItem(constant.localStorageKey.loginToken);
        localStorage.removeItem(TASK_DETAILS_KEY)
        log("token expired, logout user");
         window.location.href = "/login";
      }
      /**This will be future use */
      // if (error.response.status === "429" || error.response.status === 429) {
      //    window.location.href = "/dashboard";
      // }
      else if (error.response.status === "404" || error.response.status === 404) {
        localStorage.removeItem(constant.localStorageKey.loginToken);
        localStorage.removeItem(TASK_DETAILS_KEY)
        log("token expired, logout user");
        window.location.href = PATHS.auth.unauthorizedAccess;
      }
      log("Status:", error.response.status);
      log("Data:", error.response.data);
      log("Headers:", error.response.headers);
    }
    else {
      //This comments provide a log function parameter
      // Something else happened while setting up the request
      // triggered the error
      log("Error Message:", error.message);
    }
    return Promise.reject(error.response || error.message);
  }
);

export { appClient };
