import { API_URL, API_VERSION } from "../constants/environment.const";

export const environmentProd = {
  production: true,
  [API_URL]: 'http://localhost:8083/api',
  [API_VERSION]: 'v1'
}
