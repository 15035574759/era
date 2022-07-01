# era

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
``

// mint 
balanceOf
n = await a.balanceOf(address owner)
let urls;
for(let i=0;i<n;i++){
let tokenId = await a.tokenOfOwnerByIndex(owner,i);
//urls[i] = a.baseURI()+tokenId.toString();
 let nft = await a.getNft(tokenId);
 let urls[i] = nft.level;

}

// farms  列表
a//合约地址
length:=await a._salesAmount;
for (let i=1;i<=length;i++){
info =await a.getSales();
}

info 的类容
    struct SalesObject {
        uint256 id;
        uint256 tokenId;
        uint256 startTime;
        uint256 durationTime;
        uint256 maxPrice;
        uint256 minPrice;
        uint256 finalPrice;
        uint8 status;
        address payable seller;
        address payable buyer;
        IERC721 nft;
    }
 


nftMarket deployed to: 0x33f21FfB700fCe2e03FfDba868f9ab15DF4598D6
DsgNft deployed to: 0x58234c0Ec80A51e19522893B45ebA302059c05d2

fragmentToken deployed to: 0x4C8dA2F692180945E7eF15487Dcc5584122704D6
singlePool deployed to: 0x1dcCee2197dC42A33296Cf10c883bf818492B69b
nftEarnErc20Pool deployed to: 0x43513B6B927304f09A1b31Ac93E128070B2604B9
第一个是ENS奖励token，第二个是质押 lp，第三个质押nft池子


DSGToken deployed to: 0x1055E381E78197D5c43a0BBcA731AB73F64efe53
DsgNft deployed to: 0x23dfd66F599d36378fA8866a0D22ebE327CB8c25
nftMarket deployed to: 0x25760bF19CC577ef012AB0c2dA033C8dFbcF3419
fragmentToken deployed to: 0x4E7b8324655b011EefcC8ce974556ab672508B10
singlePool deployed to: 0x57F21008A948AC3011a1B9Aad919822f13D4069f
nftEarnErc20Pool deployed to: 0x0C4864bAe58ec21AF751c776625950e7e81ACB6A

currency token deployed to: 0x1055E381E78197D5c43a0BBcA731AB73F64efe53
nft deployed to: 0x23dfd66F599d36378fA8866a0D22ebE327CB8c25
Market deployed to: 0x25760bF19CC577ef012AB0c2dA033C8dFbcF3419
lp deployed to: 0x4E7b8324655b011EefcC8ce974556ab672508B10
lpStakePool deployed to: 0x57F21008A948AC3011a1B9Aad919822f13D4069f
nftStakePool deployed to: 0x0C4864bAe58ec21AF751c776625950e7e81ACB6A
// sell
function startSales(uint256 tokenId,
                    uint256 maxPrice, 
                    uint256 minPrice,
                    uint256 startTime, 
                    uint256 durationTime,
                    address nft, 0x7b19B358A0675349634D1310Fbc231b1C012186C
                    address currency 指用什么token支付)
// sell 前授权
nft.approve(address to, uint256 tokenId)

// farms ntf池子 stake
function stake(uint256 tokenId) public

// farms ntf池子 数据
function getUserInfo(address _user) public view
returns (
    uint256 share, // My Mining Power
    uint256 numNfts,
    uint slotNum,
    uint256 rewardDebt
)
accShare => Total Mining Power

function withdraw(uint256 _tokenId)
// farms LP池子
Harvest => function pendingReward(address _user) 
staked => totalDeposit

4、LP取消质押弹窗的确认按钮文案改为：Unstake///
3、NFT取消质押的页面UI不对///
5、交易弹窗的文案全部换成英文///
6、LP质押币对文案里pancake改为BNB///



1、PC默认链接小狐狸钱包，并且walletconnect链接钱包的方式未生效
2、每次质押NFT都要授权一次，，实际上只需要授权一次就行
7、LP质押的收益没有正常发放
8、NFT铸造数量没有按照实际数据展示