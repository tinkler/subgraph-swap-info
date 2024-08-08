import {
  Address,
  BigInt,
} from "@graphprotocol/graph-ts"

// Initialize a Token Definition with the attributes
export class TokenDefinition {
  address : Address
  symbol: string
  name: string
  decimals: BigInt

  // Initialize a Token Definition with its attributes
  constructor(address: Address, symbol: string, name: string, decimals: BigInt) {
    this.address = address
    this.symbol = symbol
    this.name = name
    this.decimals = decimals
  }

  // Get all tokens with a static defintion
  static getStaticDefinitions(): Array<TokenDefinition> {
    let staticDefinitions = new Array<TokenDefinition>(11)

    // Add WUSDC
    let tokenUSDC = new TokenDefinition(
      Address.fromString('0xD33Db7EC50A98164cC865dfaa64666906d79319C'),
      'WUSDC',
      'Wrapped USDC',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenUSDC)

    // Add ETH
    let tokenETH = new TokenDefinition(
      Address.fromString('0xc7b06F55FBCD31cd691504f3DFc4efa9082616B7'),
      'ETH',
      'Ether',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenETH)

    // Add USDT
    let tokenUSDT = new TokenDefinition(
      Address.fromString('0x3f97bf3Cd76B5cA9D4A4E9cD8a73C24E32d6C193'),
      'USDT',
      'Tether USD',
      BigInt.fromI32(6)
    )
    staticDefinitions.push(tokenUSDT)

    // Add WBTC
    let tokenWBTC = new TokenDefinition(
      Address.fromString('0x813bCb548F99Bc081e5EFeeAa65e3018befb92Ae'),
      'WBTC',
      'Wrapped BTC',
      BigInt.fromI32(8)
    )
    staticDefinitions.push(tokenWBTC)

    // Add ZKF
    let tokenZKF = new TokenDefinition(
      Address.fromString('0x1cD3E2A23C45A690a18Ed93FD1412543f464158F'),
      'ZKF',
      'ZKF',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenZKF)

    // Add PEPAI
    let tokenPEPAI = new TokenDefinition(
      Address.fromString('0x96b23f65Db0948FA74B4979975a1aE7Ed861850C'),
      'PEPAI',
      'ZKFPepeAI',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenPEPAI)

    // Add zkfDOGE
    let tokenZkfDOGE = new TokenDefinition(
        Address.fromString('0x5D900285B216EBd562B5EC29A35b734D0688e35b'),
        'zkfDOGE',
        'zkfDOGE',
        BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenZkfDOGE)

    // Add ZKFUN
    let tokenZKFUN = new TokenDefinition(
        Address.fromString('0x9a8DCC64e8E46C37dd7bd3a4cb7Df18B47Ef727d'),
        'ZKFUN',
        'ZKFunFair',
        BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenZKFUN)

    // Add Fair
    let tokenFair = new TokenDefinition(
        Address.fromString('0x2C5B7A3c7d6A8Eaf83522e39d6459db73B540c4b'),
        'Fair',
        'Fair',
        BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenFair)

    // Add SHIB
    let tokenSHIB = new TokenDefinition(
        Address.fromString('0x376ef6092E3980e3825cd74bA5DCE70d2fc1120F'),
        'SHIB',
        'SHIBA INU',
        BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenSHIB)

    // Add DAI
    let tokenDAI = new TokenDefinition(
        Address.fromString('0xa9f4eeb30dc48d4ef77310a2108816c80457cf6f'),
        'DAI',
        'Dai Stablecoin',
        BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenDAI)

    return staticDefinitions
  }

  // Helper for hardcoded tokens
  static fromAddress(tokenAddress: Address) : TokenDefinition | null {
    let staticDefinitions = this.getStaticDefinitions()
    let tokenAddressHex = tokenAddress.toHexString()

    // Search the definition using the address
    for (let i = 0; i < staticDefinitions.length; i++) {
      let staticDefinition = staticDefinitions[i]
      if(staticDefinition.address.toHexString() == tokenAddressHex) {
        return staticDefinition
      }
    }

    // If not found, return null
    return null
  }

}