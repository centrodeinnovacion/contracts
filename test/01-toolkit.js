const Toolkit = artifacts.require('Toolkit')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect
const hash   = 'QmddchiYMQGZYLZf86jhyhkxRqrGfpBNr53b4oiV76q6aq'
const hash2  = 'QmddchiYMQGZYLZf86jhyhkxRqrGfpBNr53b4oiV76q61q'
const name   = 'archive.pdf'
const name2  = 'archive.jpg'

contract('Toolkit', accounts => {
  const [
    owner,
    unauthorized
  ] = accounts
  it('should create a global instance', async() => {
    toolkit = await Toolkit.deployed()
    expect(toolkit).to.not.be.null
  })
  it('should get the valid owner of the contract', async() => {
    expect(await toolkit.owner()).to.eq(owner)
  })
  it('should allow to add a new hash and get a valid tx', async() => {
    tx1 = await toolkit.add(hash.substr(0,32), hash.substr(32), name)
    tx2 = await toolkit.add(hash2.substr(0,32), hash2.substr(32), name2)
    expect(tx1.tx).to.match(/\w{66}/)
    expect(tx2.tx).to.match(/\w{66}/)
  })
  it('should get the associated file name of a hash', async() => {
    valid1 = await toolkit.validate(hash.substr(0,32), hash.substr(32))
    valid2 = await toolkit.validate(hash2.substr(0,32), hash2.substr(32))
    expect(valid1).to.eq(name)
    expect(valid2).to.eq(name2)
  })
  it('should fail on invalid hash', async() => {
    const fake = `${hash.substr(31)}${hash.substr(0,1)}`
    invalid = await toolkit.validate(hash.substr(0,32), fake)
    expect(invalid).to.eq('')
  })
  it('should allow the owner to kill the contract', async() => {
    kill = await toolkit.kill()
    expect(kill.tx).to.match(/\w{66}/)
  })
  it('should get an error trying to execute a method of the killed contract', () => {
    expect(toolkit.add('as', 'sd', 'asd')).to.be.eventually.rejected
  })
  it('should just terminate', () => {
    expect(true).to.be.true
  })
})
