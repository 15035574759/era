
import level1 from '@/assets/img/xunzhaung1.png'
import level2 from '@/assets/img/xunzhaung2.png'
import level3 from '@/assets/img/xunzhaung3.png'
import level4 from '@/assets/img/xunzhaung4.png'
import level5 from '@/assets/img/xunzhaung5.png'
import level6 from '@/assets/img/xunzhaung6.png'


const nftImgSrc = function(item) {
  const imgArr = [level1 , level2 , level3 , level4 , level5 , level6]
  let level = Number(item)
  if(isNaN(level) || level > 6 || level < 1) level = 1
  return imgArr[level -1]
}


const nftName = function(item) {
  const nameArr = ['Power Badge' ,'Magic Badge','Spirit Badge','Time Badge','Mind Badge','Soul Badge']
  let level = Number(item)
  if(isNaN(level) || level > 6 || level < 1) level = 1
  return nameArr[level -1]
}

const nftPower = function(item) {
  //1000  1500   2500   3500   5000  7000
  const powerArr = [1000, 1500, 2500, 3500, 5000, 7000]
  let level = Number(item)
  if(isNaN(level) || level > 6 || level < 1) level = 1
  return powerArr[level -1]
}

export default {
    // "DSGToken":"0x1055E381E78197D5c43a0BBcA731AB73F64efe53",
    // // "DsgNft":"0xA4d79dF01c5D1aDC1BF76e586792455EcD41a0c0",
    // "DsgNft":"0x79fEa54444BC0e4CC03fe2C32060434f5dAc2942",
    // "nftMarket":"0x25760bF19CC577ef012AB0c2dA033C8dFbcF3419",
    // "fragmentToken":"0x15b0eE096Ea786160390d5cD7816801E5fed871d",
    // "LPToken":"0xC81DA38308E5490B17a513fe9F78d528D6a9c97B",
    // "singlePool":"0x6bb595F02E0DaA63C33099e38b8462d9F16Ea02e",
    // "nftEarnErc20Pool":"0xc526CE97F6045839b1604Bd1c7217e48122103c7",

    "DSGToken":"0xe896233864cfB2bd4BCD960a4964EdFbF3e6574e",
    "DsgNft":"0xe896233864cfB2bd4BCD960a4964EdFbF3e6574e", //DsgNft deployed
    "nftMarket":"0x25760bF19CC577ef012AB0c2dA033C8dFbcF3419",
    "fragmentToken":"0x15b0eE096Ea786160390d5cD7816801E5fed871d",
    "LPToken":"0x873f6f45CBD70fEcD342F5BdaF105dD41268D44F", //lp deployed
    "singlePool":"0x1136Ef1E8a3b1991232cD45D2BEA873e5D8AF202", //singlePool deployed
    "nftEarnErc20Pool":"0xF5D753F937152e67e557F913f5cE5514f312042a", //nftEarnErc20Pool deployed
    "MintPrice":"0.3",

    "IDORewardToken": "0x5099DF0bA065440757817eC9B84db779aF5f0160", //reward token
    "IDOUsToken": "0x55d398326f99059ff775485246999027b3197955", //usToken deployed
    "IDOToken": "0x92c77c482DD1DFA32f9603ae67F4A2521FCF76F1", //IDO deployed
    "IDOInvitePool": "0x858e6F03C9c4D21AcA313630E58cB57F2cD2B1B2", //invitePool deployed
    // "IDODsgNftDeployed": "0x79fEa54444BC0e4CC03fe2C32060434f5dAc2942", //直推合约地址
    nftImgSrc,
    nftName,
    nftPower
}
