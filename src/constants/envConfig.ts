export const ENV_CONFIG = {
  base_url: process.env.REACT_APP_BASE_URL,
  request_timeout: process.env.REACT_APP_REQUEST_TIMEOUT ? Number(process.env.REACT_APP_REQUEST_TIMEOUT) :  5000
}
