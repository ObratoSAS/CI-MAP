import request from 'supertest';
import app from '../../main';

describe('health endpoints', () => {
  it('should return live status', async () => {
    const response = await request(app).get('/health/live');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
