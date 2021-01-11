import axios from 'axios';
import localStorage from 'local-storage';

// eslint-disable-next-line consistent-return
const callApi = async (data, method, url) => {
  try {
    const baseUrl = `http://localhost:9001/api/${url}`;
    const response = await axios({
      method,
      url: baseUrl,
      data,
      headers: {
        authorization: localStorage.get('token'),
      },
    });
    // eslint-disable-next-line no-console
    console.log('TokenResponse:::::', response);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Inside catch', error);
    return { status: 'error', message: 'Incorrect LOgin' };
  }
};

export default callApi;
