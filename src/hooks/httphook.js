import axios from 'axios';

export const useApi = () => {
  const request = async ({
    url,
    method = 'get',
    data = null,
    headers = { 'Content-Type': 'application/json' },
  }) => {
    try {
      const response = await axios({ url, method, data, headers });

      if (response.status !== 200) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      localStorage.setItem('myJWT', response.data.entity);

      return response;
    } catch (e) {
      throw new Error(e);
    }
  };

  return { request };
};

export const useJWTAccess = () => {
  const JWT_TOKEN = localStorage.getItem('myJWT');

  const request = async ({
    url,
    method = 'get',
    data = null,
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  }) => {
    try {
      const response = await axios({ url, method, data, headers });

      if (response.status !== 200) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      return response;
    } catch (e) {
      throw new Error(e);
    }
  };

  return { request };
};
