require ('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/zYAZ30jNty8dEEvKehdz7INGn_xZqsOV',
      accounts: ['cd1e2a5d72914943bc048103fa1f215448135d2888e8da0f91494a2b2fa1007c']
    }
  }
}