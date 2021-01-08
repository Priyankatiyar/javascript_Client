import axios from 'axios';
import localStorage from 'local-storage';

// eslint-disable-next-line consistent-return
const callApi = async (data, method, url) => {
  try {
    const baseUrl = `http://localhost:9001/api/user${url}`;
    const { email, password } = data;
    const response = await axios({
      method,
      url: baseUrl,
      data: {
        email,
        password,
      },
    });
    localStorage.set('token', response.data);
    const token = localStorage.get('token');
    // eslint-disable-next-line no-console
    console.log('Token:::::', token);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Inside catch', error);
    return { status: 'error', message: 'Incorrect LOgin Credentials!' };
  }
};

export default callApi;
