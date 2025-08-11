const axios = require('axios');

describe('Express Frontend', () => {
    test('Backend data endpoint returns data', async () => {
        const response = await axios.get('http://localhost:3000/api/backend-data');
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('message');
    });
});
