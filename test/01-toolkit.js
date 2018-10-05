const Toolkit = artifacts.require('Toolkit')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect
const hash = 'QmddchiYMQGZYLZf86jhyhkxRqrGfpBNr53b4oiV76q6aq'

contract('Toolkit', accounts => {
  it('should create a global instance', () => {
    Toolkit.deployed()
      .then(instance => {
        toolkit = instance
        expect(toolkit).to.not.be.null
      })
  })
  it('should allow to add a new hash and get a valid tx', () => {
    toolkit.add(hash.substr(0,32), hash.substr(32))
      .then(response => {
        expect(response.tx).to.match(/\w{66}/)
      })
  })
  it('should get confirmation of a hash', () => {
    toolkit.validate(hash.substr(0,32), hash.substr(32))
      .then(valid => {
        expect(valid).to.be.true
      })
  })
  it('should fail on invalid hash', () => {
    const fake = `${hash.substr(31)}${hash.substr(0,1)}`
    toolkit.validate(hash.substr(0,32), fake)
      .then(valid => {
        expect(valid).to.be.false
      })
  })
  it('should just terminate', () => {
    expect(true).to.be.true
  })
})