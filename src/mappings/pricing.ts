/* eslint-disable prefer-const */
import { Pair, Token, Bundle, TokenPrice } from '../types/schema'
import { BigDecimal, Address, BigInt } from '@graphprotocol/graph-ts/index'
import { ZERO_BD, factoryContract, ADDRESS_ZERO, ONE_BD, UNTRACKED_PAIRS } from './helpers'

const WETH_ADDRESS = '0xc7b06F55FBCD31cd691504f3DFc4efa9082616B7'
// const USDC_WETH_PAIR = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc' // created 10008355
// const DAI_WETH_PAIR = '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11' // created block 10042267
// const USDT_WETH_PAIR = '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852' // created block 10093341

export function getEthPriceInUSD(): BigDecimal {
  return ONE_BD
  // // fetch eth prices for each stablecoin
  // let daiPair = Pair.load(DAI_WETH_PAIR) // dai is token0
  // let usdcPair = Pair.load(USDC_WETH_PAIR) // usdc is token0
  // let usdtPair = Pair.load(USDT_WETH_PAIR) // usdt is token1
  //
  // // all 3 have been created
  // if (daiPair !== null && usdcPair !== null && usdtPair !== null) {
  //   let totalLiquidityETH = daiPair.reserve1.plus(usdcPair.reserve1).plus(usdtPair.reserve0)
  //   let daiWeight = daiPair.reserve1.div(totalLiquidityETH)
  //   let usdcWeight = usdcPair.reserve1.div(totalLiquidityETH)
  //   let usdtWeight = usdtPair.reserve0.div(totalLiquidityETH)
  //   return daiPair.token0Price
  //       .times(daiWeight)
  //       .plus(usdcPair.token0Price.times(usdcWeight))
  //       .plus(usdtPair.token1Price.times(usdtWeight))
  //   // dai and USDC have been created
  // } else if (daiPair !== null && usdcPair !== null) {
  //   let totalLiquidityETH = daiPair.reserve1.plus(usdcPair.reserve1)
  //   let daiWeight = daiPair.reserve1.div(totalLiquidityETH)
  //   let usdcWeight = usdcPair.reserve1.div(totalLiquidityETH)
  //   return daiPair.token0Price.times(daiWeight).plus(usdcPair.token0Price.times(usdcWeight))
  //   // USDC is the only pair so far
  // } else if (usdcPair !== null) {
  //   return usdcPair.token0Price
  // } else {
  //   return ZERO_BD
  // }
}

// token where amounts should contribute to tracked volume and liquidity
let WHITELIST: string[] = [
  '0xd33db7ec50a98164cc865dfaa64666906d79319c', // WUSDC
  '0x3f97bf3cd76b5ca9d4a4e9cd8a73c24e32d6c193', // USDT
  '0xc7b06F55FBCD31cd691504f3DFc4efa9082616B7', // ETH
  '0x813bcb548f99bc081e5efeeaa65e3018befb92ae', // WBTC
  '0x1cd3e2a23c45a690a18ed93fd1412543f464158f', // ZKF
  '0x9a8dcc64e8e46c37dd7bd3a4cb7df18b47ef727d', // ZKFUN
  '0x5d900285b216ebd562b5ec29a35b734d0688e35b', // zkfDOGE
  '0x2c5b7a3c7d6a8eaf83522e39d6459db73b540c4b', // Fair
  '0x96b23f65db0948fa74b4979975a1ae7ed861850c', // PEPAI
  '0xa111328a3dc9650f07653944ee2e2a88c10c2ad8', // FLON
  '0x376ef6092e3980e3825cd74ba5dce70d2fc1120f', // SHIB
  '0xe0a8d3d1ab423a7a9e34186f86283ea85cd8615e', // FDOGE
  '0x6a334e0a7221e22d27afb8cd438c9fe5a0df7880', // ZAI
  '0x01648e494f49963584729a925ec8df960a959dd6', // TALL
  '0x95c1769e7843eb939132d5a8b37adef84509a688', // MOON
  '0xa9f4eeb30dc48d4ef77310a2108816c80457cf6f', // DAI
  '0xe21e5583a35ae9a503726269d201e4f14fb0a40a', // ZKS
  '0x9a381d3fa226fe6753041c343e6f1eeed4949681', // ZPEPE
  '0x2e29f1392a8caaf5fa3f7d6866c6e204eb3926ca', // Lucky
  '0xf95e6526511ba2e5db6436f09def36799a0dd32c', // ZKDOGE
  '0x4300bdd1b11388462f0699791112517792505aaa', // LIMBO
  '0xf4ae69c8e71a562e2784f00bc96bc6ce35533295', // ZKBR
  '0x8cbf25cbf2bc31aa7ad1c0f5cc6d66a9f518e199', // FENT
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
let MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString('40000')

// minimum liquidity for price to get tracked
let MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigDecimal.fromString('4000')

/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (add stablecoin estimates)
 **/
// export function findEthPerToken(token: Token): BigDecimal {
//   if (token.id == WETH_ADDRESS) {
//     return ONE_BD
//   }
//   // loop through whitelist and check if paired with any
//   for (let i = 0; i < 5; i++) {
//     let pairAddress = factoryContract.getPair(Address.fromString(token.id), Address.fromString(WHITELIST[i]))
//     if (pairAddress.toHexString() != ADDRESS_ZERO) {
//       let pair = Pair.load(pairAddress.toHexString())
//       if (pair.token0 == token.id) {
//         let token1 = Token.load(pair.token1)
//         return pair.token1Price.times(token1.derivedETH as BigDecimal) // return token1 per our token * Eth per token 1
//       }
//       if (pair.token1 == token.id) {
//         let token0 = Token.load(pair.token0)
//         return pair.token0Price.times(token0.derivedETH as BigDecimal) // return token0 per our token * ETH per token 0
//       }
//     }
//   }
//   return ZERO_BD // nothing was found return 0
// }

// export function findEthPerToken(token: Token, pairAddress: string): BigDecimal {
//   if (token.id == WETH_ADDRESS) {
//     return ONE_BD
//   }
//
//   let pair = Pair.load(pairAddress)
//   if (pair !== null) {
//     if (pair.token0 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
//       let token1 = Token.load(pair.token1)
//       return pair.token1Price.times(token1.derivedETH as BigDecimal) // return token1 per our token * Eth per token 1
//     }
//     if (pair.token1 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
//       let token0 = Token.load(pair.token0)
//       return pair.token0Price.times(token0.derivedETH as BigDecimal) // return token0 per our token * ETH per token 0
//     }
//   }
//   return ZERO_BD // nothing was found return 0
// }

export function findEthPerToken(token: Token): BigDecimal {
  if (token.id == WETH_ADDRESS) {
    return ONE_BD
  }

  let tokenPrice = TokenPrice.load(token.id)
  if (tokenPrice !== null) {
    return tokenPrice.priceETH
  }
  return ZERO_BD // nothing was found return 0
}

export function saveTokenPrice(token: Token, pairId: string, reserve: BigDecimal): void {
  let tokenPrice = TokenPrice.load(token.id)
  if (tokenPrice === null) {
    tokenPrice = new TokenPrice(token.id)
    tokenPrice.pairId = pairId
    tokenPrice.reserve = ZERO_BD
    tokenPrice.priceETH = ZERO_BD
  }

  let pair = Pair.load(pairId)
  if (pair !== null) {
    let priceETH = tokenPrice.priceETH
    if (pair.token0 == token.id) {
      let token1 = Token.load(pair.token1)
      priceETH = pair.token1Price.times(token1.derivedETH as BigDecimal) // return token1 per our token * Eth per token 1
    }
    if (pair.token1 == token.id) {
      let token0 = Token.load(pair.token0)
      priceETH = pair.token0Price.times(token0.derivedETH as BigDecimal) // return token0 per our token * ETH per token 0
    }

    if (priceETH.notEqual(tokenPrice.priceETH) && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
      tokenPrice.pairId = pair.id
      tokenPrice.reserve = reserve
      tokenPrice.priceETH = priceETH
      tokenPrice.save()
    }
  }
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD.
 * If both are, return average of two amounts
 * If neither is, return 0
 */
export function getTrackedVolumeUSD(
    tokenAmount0: BigDecimal,
    token0: Token,
    tokenAmount1: BigDecimal,
    token1: Token,
    pair: Pair
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedETH.times(bundle.ethPrice)
  let price1 = token1.derivedETH.times(bundle.ethPrice)

  // dont count tracked volume on these pairs - usually rebass tokens
  if (UNTRACKED_PAIRS.includes(pair.id)) {
    return ZERO_BD
  }

  // if less than 5 LPs, require high minimum reserve amount amount or return 0
  if (pair.liquidityProviderCount.lt(BigInt.fromI32(5))) {
    let reserve0USD = pair.reserve0.times(price0)
    let reserve1USD = pair.reserve1.times(price1)
    if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve0USD.plus(reserve1USD).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
    if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
      if (reserve0USD.times(BigDecimal.fromString('2')).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
    if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve1USD.times(BigDecimal.fromString('2')).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
  }

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount0
        .times(price0)
        .plus(tokenAmount1.times(price1))
        .div(BigDecimal.fromString('2'))
  }

  // take full value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0)
  }

  // take full value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount1.times(price1)
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD * 2.
 * If both are, return sum of two amounts
 * If neither is, return 0
 */
export function getTrackedLiquidityUSD(
    tokenAmount0: BigDecimal,
    token0: Token,
    tokenAmount1: BigDecimal,
    token1: Token
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedETH.times(bundle.ethPrice)
  let price1 = token1.derivedETH.times(bundle.ethPrice)

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0).plus(tokenAmount1.times(price1))
  }

  // take double value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0).times(BigDecimal.fromString('2'))
  }

  // take double value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount1.times(price1).times(BigDecimal.fromString('2'))
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}