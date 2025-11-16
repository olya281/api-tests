const axios = require('axios');

const API_URL = 'http://134.209.190.12:3001/trpc/sms.createMessage';
const API_KEY = process.env.X_API_KEY;

describe('sms.createMessage API', () => {
  test('успешно создаёт SMS при валидных данных', async () => {
    const payload = {
      to: '+447441921220',
      body: 'Hello from curl!',
      callbackUrl: 'http://example.com',
      service: 'dev',
    };

    const response = await axios.post(API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
    });

    // 1. HTTP-статус
    expect(response.status).toBe(200);

    // 2. Проверяем структуру tRPC-ответа
    expect(response.data).toHaveProperty('result');
    expect(response.data.result).toHaveProperty('data');
    expect(response.data.result.data).toHaveProperty('success', true);
    expect(response.data.result.data).toHaveProperty('data');

    const data = response.data.result.data.data;

    // 3. Основные бизнес-поля
    expect(data).toMatchObject({
      to: payload.to,
      body: payload.body,
      status: 'pending',
      service: payload.service,
      callbackUrl: payload.callbackUrl,
      clientMessageId: null,
    });

    // 4. Технические поля
    expect(typeof data.id).toBe('number');
    expect(new Date(data.createdAt).toString()).not.toBe('Invalid Date');
    expect(new Date(data.updatedAt).toString()).not.toBe('Invalid Date');
  });
});
