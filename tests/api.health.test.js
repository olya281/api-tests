const axios = require('axios');

describe('API healthcheck demo', () => {
  test('GET /posts/1 возвращает 200 и корректное тело', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
    expect(response.data).toHaveProperty('userId');
    expect(response.data).toHaveProperty('title');
  });
});
