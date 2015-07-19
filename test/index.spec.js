'use strict';

var expect = require('chai').expect;

describe('index.spec.js', function () {
    var victim;

    before(function () {
        victim = require('./../src/index.js');
    });

    describe('Generator instantiation', function () {
        describe('assertions', function () {
            function expectToThrowError(value) {
                expect(function () {
                    victim(value);
                }).to.throw(Error, 'seed must be an integer and greater than 0 {Number}');
            }

            function expectToNotThrow(value) {
                expect(function () {
                    victim(value);
                }).to.not.throw(Error);
            }

            it('should fail when seed is not given', function () {
                expectToThrowError(undefined);
            });

            it('should fail when given seed is not a Number', function () {
                ['string', {}, [], true, null].forEach(expectToThrowError);
            });

            it('should fail when given seed is not an integer', function () {
                expectToThrowError(1.2);
            });

            it('should fail when given seed is not greater than 0', function () {
                expectToThrowError(-2);
            });

            it('should pass when given seed is a Number greater than 0', function () {
                expectToNotThrow(1);
                expectToNotThrow(9);
                expectToNotThrow(99);
                expect(victim(1)).to.have.property('rand').that.is.an('function');
            });
        });

    });

    describe('rand', function () {
        describe('assertions', function () {
            var generator;

            before(function () {
                generator = victim(1);
            });

            describe('x', function () {
                it('should fail when x is not given', function () {
                    expect(generator.rand).to.throw(Error, 'x must be an integer {Number}');
                });

                it('should fail when x is not a Number', function () {
                    ['string', {}, [], true, null].forEach(function (value) {
                        expect(generator.rand.bind(null, value)).to.throw(Error, 'x must be an integer {Number}');
                    });
                });
            });

            describe('y', function () {
                var validX = 3;

                it('should fail when y is not given', function () {
                    expect(generator.rand.bind(null, validX)).to.throw(Error, 'y must be an integer {Number}');
                });

                it('should fail when y is not a Number', function () {
                    ['string', {}, [], true, null].forEach(function (value) {
                        expect(generator.rand.bind(null, validX, value)).to.throw(Error, 'y must be an integer {Number}');
                    });
                });
            });

            describe('when valid x and y are given', function () {
                var validX = 1;
                var validY = -1;

                it('should not throw', function () {
                    expect(generator.rand.bind(null, validX, validY)).to.not.throw(Error);
                });

                it('should return a random between 0 and 1', function () {
                    expect(generator.rand(validX, validY)).to.be.gte(0).and.lte(1);
                });

                it('should return the same number for the same values', function () {
                    var random1 = generator.rand(validX, validY);
                    var random2 = generator.rand(validX, validY);

                    expect(random1).to.be.equal(random2);
                });
            });
        });
    });

});
