const supertest = require('supertest');
const server = require('../src/server');
const client = supertest(server.server);

describe('Server testing', () => {
    test('Bad route returns 404', () => {
        return client.get('/plant')
                .expect(404);
    })

    test('404 on a bad method', () => {
        return client.patch('/food')
        .expect(404);
    })

    test('Create a record using POST', () => {
        return client.post('/food')
        .send({ name: 'carrot', calories: '25', type: 'vegetable'})
        .expect(200);
    })

    test('Read a list of records using GET', () => {
        return client.get('/animal')
        .expect(200);
    })

    test('Read a record using GET', () => {
        const data = { id: '1'}
        return client.get('/animal').query(data)
        .expect(200);
    })

    test('Update a record using PUT', () => {
        const data = { id: '1'}
        return client.put('/food')
        .query(data)
        .send({ calories: '25' })
        .expect(200);
    })

    test('Destroy a record using DELETE', () => {
        const data = { id: '1'}
        return client.delete('/food')
        .query(data)
        .expect(200);
    })
})
