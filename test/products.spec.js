/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { User } } = require('../server/db')
const seed = require('../script/seed');
const app = require('../server/app')

describe('Product routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/products/', () => {

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(10);
    })
    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/2')
        .expect(200)

       expect(res.body).to.be.an('object');
       expect(res.body.name).to.equal('Superhuman Speed');
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
