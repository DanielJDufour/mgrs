const should = require('chai').should(); // eslint-disable-line no-unused-vars
const mgrs = require('../dist/mgrs');

describe('First MGRS set', () => {
  const mgrsStr = '33UXP04';
  const point = mgrs.toPoint(mgrsStr);
  it('Longitude of point from MGRS correct.', () => {
    point[0].should.be.closeTo(16.41450, 0.000001);
  });
  it('Latitude of point from MGRS correct.', () => {
    point[1].should.be.closeTo(48.24949, 0.000001);
  });
  it('MGRS reference with highest accuracy correct.', () => {
    mgrs.forward(point).should.equal('33UXP0500444997');
  });
  it('MGRS reference with 1-digit accuracy correct.', () => {
    mgrs.forward(point,1).should.equal(mgrsStr);
  });
});
describe('Second MGRS set', () => {
  const mgrsStr = '24XWT783908'; // near UTM zone border, so there are two ways to reference this
  const point = mgrs.toPoint(mgrsStr);
  it('Longitude of point from MGRS correct.', () => {
    point[0].should.be.closeTo(-32.66433, 0.00001);
  });
  it('Latitude of point from MGRS correct.', () => {
    point[1].should.be.closeTo(83.62778, 0.00001);
  });
  it('MGRS reference with 3-digit accuracy correct.', () => {
    mgrs.forward(point,3).should.equal('25XEN041865');
  });
  it('MGRS reference with 5-digit accuracy, northing all zeros', () => {
    mgrs.forward([0,0],5).should.equal('31NAA6602100000');
  });
  it('MGRS reference with 5-digit accuracy, northing one digit', () => {
    mgrs.forward([0,0.00001],5).should.equal('31NAA6602100001');
  });
});

describe ('third mgrs set', () => {
  const mgrsStr = '11SPA7234911844';
  const point = [-115.0820944, 36.2361322];
  it('MGRS reference with highest accuracy correct.', () => {
    mgrs.forward(point).should.equal(mgrsStr);
  });
});
