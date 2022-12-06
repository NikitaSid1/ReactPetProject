import axios from 'axios';

export const createApiInstance = (baseURL) => {
  const axiosInstance = axios.create({
    baseURL,
  });

  const request = async ({ url, method = 'GET', data = null, headers = {} }) => {
    let initialHeaders = {
      'Content-Type': 'application/json',
    };

    const JWT_TOKEN = localStorage.getItem('myJWT');

    if (JWT_TOKEN) {
      initialHeaders.Authorization = `Bearer ${JWT_TOKEN}`;
    }

    initialHeaders = { ...initialHeaders, ...headers };

    try {
      const response = await axiosInstance({ url, method, data, headers: initialHeaders });

      if (response.status !== 200) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      return response;
    } catch (e) {
      throw new Error(e);
    }
  };

  return request;
};
