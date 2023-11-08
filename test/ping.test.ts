import request from 'supertest'
import {app} from '../src/index';


test('ping', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ping: 'ping' });
});
