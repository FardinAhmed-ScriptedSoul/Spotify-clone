const request = require('supertest');
const app = require('../src/app'); // Make sure your app.js exports 'app'

describe('Auth API Tests', () => {
    it('should return 400 if password has no special character', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@gmail.com',
                password: 'password123' // No special char!
            });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toContain('Password must contain a special character');
    });
});