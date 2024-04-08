export const APP = {
  appName: 'File Manager',
  baseUrl: process.env.REACT_APP_BASE_URL,
  requestTimeout: process.env.REACT_APP_REQUEST_TIMEOUT ? Number(process.env.REACT_APP_REQUEST_TIMEOUT) :  5000
}
