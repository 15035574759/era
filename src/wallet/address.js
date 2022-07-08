
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

    "DSGToken":"0x1055E381E78197D5c43a0BBcA731AB73F64efe53",
    "DsgNft":"0x92c3363372F11999D07b8124ad794812a94E7327", //DsgNft deployed
    "nftMarket":"0x25760bF19CC577ef012AB0c2dA033C8dFbcF3419",
    "fragmentToken":"0x15b0eE096Ea786160390d5cD7816801E5fed871d",
    "LPToken":"0x4cEe6B1e3aDA7004eAaa9a15EB61e8e92144Db81", //lp deployed
    "singlePool":"0xB53E3a3371f6A51A430bC0B3A81AA5E8cB110507", //singlePool deployed
    "nftEarnErc20Pool":"0x69094A9De56C25E88928Ba10D71a16BD909C74Fd", //nftEarnErc20Pool deployed
    "MintPrice":"0.2",

    "IDORewardToken": "0xCA2E2f2BB6539a843D22D7e217D665f533339F31", //reward token
    "IDOUsToken": "0x32C54d1C2B6E30Ec3F349ECCcC51D26dF908B2Ab", //usToken deployed
    "IDOToken": "0x7F3548c37B613Cbf7ee5d7ac3AB7E6c126b34296", //IDO deployed
    "IDOInvitePool": "0x0a6e06cCC9b3f880D4dE926D619969A822d35148", //invitePool deployed
    // "IDODsgNftDeployed": "0x79fEa54444BC0e4CC03fe2C32060434f5dAc2942", //直推合约地址
    nftImgSrc,
    nftName,
    nftPower
}
