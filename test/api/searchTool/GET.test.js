const chai = require("chai");
const chaiHttp = require("chai-http");
const { get } = require("mongoose");
const Concert = require('../../../models/concert.model');
const server = require('../../../server');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({_id: '5d9f1140f10a81216cfd4408', performer: 'Coldplay', genre: 'Rock', price: '20', day: '1', image: '/img/uploads/1fsd324fsdg.jpg' });
        await testConOne.save();

        const testConTwo = new Concert({_id: '5fca4711f323394f2ce56625', performer: 'Sting', genre: 'Pop', price: '30', day: '1', image: '/img/uploads/hdfh42sd213.jpg'});
        await testConTwo.save();

        const testConThree= new Concert({_id: '5fca4503f323394f2ce56621', performer: 'Combs', genre: 'Country', price: '15', day: '1', image: '/img/uploads/hdfh42sd213.jpg'});
        await testConThree.save();
    })

    it('/:performer should return performer by name', async () => {
        const performer = await request(server).get('/concerts/performer/Coldplay')
        expect (performer.status).to.be.equal(200);
        expect(performer.body).to.be.an('object');
        expect(performer.body).to.be.not.null;
    })

    it('/:genre should return performers by genre', async () => {
        const genre = await request(server).get('/concerts/genre/Country');
        expect (genre.status).to.be.equal(200);
        expect(genre.body).to.be.an('object');
        expect(genre.body).to.be.not.null;

    })
    
    it('/price/:price_min/:price_max should return performers by price', async () => {
        const price = await request(server).get('/concerts/price/15/20');
        expect (price.status).to.be.equal(200);
        expect(price.body).to.be.an('object');
        expect(price.body).to.be.not.null;
    })

    it('/:day should return performers by day', async() => {
        const day = await request(server).get('/concerts/day/1')
        expect (day.status).to.be.equal(200);
        expect(day.body).to.be.an('object');
        expect(day.body).to.be.not.null;

    })

    
    after(async () => {
        await Concert.deleteMany();
    });


    })


  

  