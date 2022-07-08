
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
    "DsgNft":"0xdD79D8Bc4f05a34f5A04b0F3C123093Ff06E1A87", //DsgNft deployed
    "nftMarket":"0x25760bF19CC577ef012AB0c2dA033C8dFbcF3419",
    "fragmentToken":"0x15b0eE096Ea786160390d5cD7816801E5fed871d",
    "LPToken":"0x6b1E2d78Cb12761914BC16E8c3c830c225C5c812", //lp deployed
    "singlePool":"0xF1E3B56109890AbfA029f0Ec2F2dc7C3e3CDf215", //singlePool deployed
    "nftEarnErc20Pool":"0x7D223f588d7b1eF9C7816E6C02BE2c9BB3A914Db", //nftEarnErc20Pool deployed
    "MintPrice":"0.2",

    "IDORewardToken": "0xd102bA85F486898CFc41d101c8aE542EEF642FcA", //reward token
    "IDOUsToken": "0x81670a4400547A60e7eD1241db2782cc9Abd0a58", //usToken deployed
    "IDOToken": "0x3308d5C9489e2b7aeB5d55c5710847dC965C312f", //IDO deployed
    "IDOInvitePool": "0x1e864dEc43d5fb10a69b38ef00fA73909c223b85", //invitePool deployed
    // "IDODsgNftDeployed": "0x79fEa54444BC0e4CC03fe2C32060434f5dAc2942", //直推合约地址
    nftImgSrc,
    nftName,
    nftPower
}
