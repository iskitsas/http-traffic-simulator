var assert = require("assert"),
    should = require('should'),
    dummy = require('../lib/dummy.js');
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
})

describe('Dummy Tester', function(){
    describe('#increaseCounterBy1()',function(){
        var num25=25;
        var ret26=dummy.increaseCounterBy1(num25);
        it('should return 26 when the 25 value is increased by 1', function(){
            ret26.should.equal(26);
            assert.equal(26, ret26);
        })
    });

})