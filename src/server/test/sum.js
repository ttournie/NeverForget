const sum = require('../app/utils/sum');
const expect = require('chai').expect;

describe('sum()', () => {
    
    context('without arguments', () => {
        it('should return 0',() => {
            expect(sum()).to.equal(0);
        });
    });

    context('with number arguments', () => {
        it('should return sum', () => {
            expect(sum(1,2,3,4,5)).to.equal(15);
        });
    });

    it('Should return arguemnt when only one argument', () => {
        expect(sum(2)).to.equal(2);
    })

    context('with non number arguemnts', () => {
        it('should throw an error', () => {
            expect(() => sum(2,'asdasd', 4)).to.throw(TypeError, 'sum() expects only numbers.')
        })
    })
});