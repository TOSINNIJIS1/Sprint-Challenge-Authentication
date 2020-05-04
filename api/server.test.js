const server = require('./server.js');
const request = require('supertest');

const db = require('../database/dbConfig.js');

beforeEach(async () => {
    await db('users').truncate();
})

describe('test the server js', () => {
    describe('testing to be true', () => {
        it('should be true', () => {
            expect(true).toBe(true)
        })
    })

    describe('registration successesful', () => {
        it('should create successfully', async () => {
            const res = await request(server)
            .post('/api/auth/register')
            .send({username: 'apuu', password: 'meIluvapu'})

            expect(res.status).toBe(201)
            expect(res.type).toBe('application/json')

        })  
    })

    describe('registration unsuccessful', () => {
        it('should fail to create successfully', async () => {
            const res = await request(server)
            .post('/api/auth/register')
            .send({username: 'nope'})

            expect(res.status).toBe(500);
        })
    })

    describe('login successful', () => {
        it('should login successfully', async () => {
            await request(server)
            .post('/api/auth/register')
            .send({ username: 'bang', password: 'bangbang' });

            const res = await request(server)
            .post('/api/auth/login')
            .send({username: 'bang', password: 'bangbang'})

            expect(res.status).toBe(200)
            expect(res.type).toBe('application/json')
        })
    })

    describe('login fail', () => {
        it('should not login', async () => {
            const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'bang', password: 'namdfer'})

            expect(res.status).toBe(401)

        })
    })


})