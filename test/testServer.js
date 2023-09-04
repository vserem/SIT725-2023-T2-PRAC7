const { expect, assert } = require("chai");
const request = require("request");

let url = "http://localhost:3000/api/cat";
let cat = {
    title: "Test Cat",
    subTitle: "Mocha Testing Cat",
    path: "images/kitten.jpg",
    description: "My Testing Cat"

}


describe('test GET api', function () {
    it('returns statuscode of 200', function (done) {
        request('http://localhost:3000/api/cat', function (error, response, bodyString) {
            let bodyObj = JSON.parse(bodyString);
            expect(bodyObj.message).to.equal('get all calls sucessful');
            done();
        });
    });
});

describe('test POST api', function () {
    it('post cat to DB', function (done) {
        request.post(url,{form: cat }, function (error, b, c) {
            let bodyObj = JSON.parse(c);
            expect(bodyObj.message).to.equal('success');
            done();
        });
    });
});


describe('test DELETE api', function () {
    it('delete a cat', function (done) {
        request.delete(url,{form: cat }, function (error, b, c) {
            let bodyObj = JSON.parse(c);
            assert.equal("success",bodyObj.message)
            done();
        });
    });
});