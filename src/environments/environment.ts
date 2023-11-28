import { API_URL, API_VERSION } from "../constants/environment.const";

export const environment = {
  production: true,
  [API_URL]: 'http://ec2-23-22-164-80.compute-1.amazonaws.com:8080/api/',
  [API_VERSION]: 'v1'
}
