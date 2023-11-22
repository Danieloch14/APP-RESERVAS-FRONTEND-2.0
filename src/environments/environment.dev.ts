import { API_URL, API_VERSION } from "../constants/environment.const";

export const environmentDev = {
  production: false,
  [API_URL]: 'http://localhost:8083/api/v1',
  [API_VERSION]: 'v1'
}
