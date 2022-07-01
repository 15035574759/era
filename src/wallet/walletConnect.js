import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3 from "web3"
import { getBaseData } from './connectMetaMask'
//window.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
window.web3 = new Web3('https://bsc-dataseed.binance.org/');
// window.web3 = new Web3('https://ropsten.infura.io/v3/cb14a30320aa4468a6a0216bf49b0af8');
let connector = null;
const bridge = "https://bridge.walletconnect.org";
let walletConnectInit = async () => {
  connector = new WalletConnect({
    bridge,
    qrcodeModal: QRCodeModal
  });
  if (!connector.connected) {
    await connector.createSession();
  } else {
    connector.killSession();
  }
  await subscribeToEvents();
};

function subscribeToEvents() {
  if (!connector) {
    return;
  }
  connector.on("session_update", async (error, payload) => {
    if (error) {
      throw error;
    }
    const {
      chainId,
      accounts
    } = payload.params[0];
    onSessionUpdate(accounts, chainId);
  });
  connector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }
    onConnect(payload);
  });
  connector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }
    onDisconnect();
  });
  if (connector.connected) {
    const {
      chainId,
      accounts
    } = connector;
    onSessionUpdate(accounts, chainId);
  }
  // window.newVue.$store.commit("getConnector", connector);
};

async function onSessionUpdate(accounts, chainId) {
  if (accounts.length === 0) return false;
  const address = accounts[0];
  // window.newVue.$store.commit("getChainId", chainId);
  // window.newVue.$store.commit("getAccounts", accounts);
  // window.newVue.$store.commit("getAddress", address);
  // window.newVue.$store.commit("isConnected", true);
  getBaseData(chainId , '', address)
};

async function onConnect(payload) {
  const {
    chainId,
    accounts
  } = payload.params[0];
  const address = accounts[0];
  console.log('walletconnect' , address , chainId);
  // window.newVue.$store.commit("getChainId", chainId);
  // window.newVue.$store.commit("getAccounts", accounts);
  // window.newVue.$store.commit("getAddress", address);
  // window.newVue.$store.commit("isConnected", true);
  getBaseData(chainId , '', address)
};

async function onDisconnect() {
  localStorage.removeItem('walletconnect');
  window.newVue.$store.commit("getChainId", null);
  // window.newVue.$store.commit("getAccounts", null);
  window.newVue.$store.commit("getAddress", null);
  window.newVue.$store.commit("isConnected", false);
  // window.newVue.$store.commit("getConnector", null);
}

export default {
  walletConnectInit,
  subscribeToEvents
}
