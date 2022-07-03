
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
    "DSGToken":"0x1055E381E78197D5c43a0BBcA731AB73F64efe53",
    "DsgNft":"0xA4d79dF01c5D1aDC1BF76e586792455EcD41a0c0",
    "nftMarket":"0x25760bF19CC577ef012AB0c2dA033C8dFbcF3419",
    "fragmentToken":"0x15b0eE096Ea786160390d5cD7816801E5fed871d",
    "LPToken":"0xC81DA38308E5490B17a513fe9F78d528D6a9c97B",
    "singlePool":"0x6bb595F02E0DaA63C33099e38b8462d9F16Ea02e",
    "nftEarnErc20Pool":"0xc526CE97F6045839b1604Bd1c7217e48122103c7",
    "MintPrice":"0.2",
    "USDTAddress": "0x55d398326f99059fF775485246999027B3197955",

    "IDORewardToken": "0x31FdBcb7a83195e37e63463bc8774CF08aA6444a",
    "IDOUsToken": "0x4E4955Df52F0D2148263005d7E31cdB7d012d04a",
    "IDOToken": "0xd4A911fc6269AC01EA96A7c0695997B3Dc808966",
    "IDOInvitePool": "0x9F3C057e165475602b0627b146d3Ae26cfDa22Cb", 
    "IDODsgNftDeployed": "0x3c280b40D8Cd9550A01c51cD6cF7DE4683e4bB68", //直推合约地址
    nftImgSrc,
    nftName,
    nftPower
}
