// constants
// HAPUS: import Web3EthContract from "web3-eth-contract";
// HAPUS: import Web3 from "web3";
import { ethers } from "ethers"; // IMPORT ethers
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    
    // Fetch ABI dan Config (Ini sudah benar)
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();
    
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    
    if (metamaskIsInstalled) {
      try {
        // --- AWAL PERUBAHAN KE Ethers ---
        
        // 1. Buat Provider Ethers
        const provider = new ethers.providers.Web3Provider(ethereum);
        
        // 2. Minta akun
        const accounts = await provider.send("eth_requestAccounts", []);
        
        // 3. Dapatkan Signer (Ini yang dibutuhkan App.js)
        const signer = provider.getSigner();
        
        // 4. Dapatkan Network ID
        const network = await provider.getNetwork();

        if (network.chainId == CONFIG.NETWORK.ID) {
          // 5. Buat Ethers Contract (Read-only, untuk dataActions)
          const smartContract = new ethers.Contract(
            CONFIG.CONTRACT_ADDRESS,
            abi,
            provider // Cukup provider untuk read-only
          );
          
          dispatch(
            connectSuccess({
              account: accounts[0],
              provider: provider, // Kirim provider Ethers
              signer: signer,     // Kirim signer Ethers (PENTING!)
              smartContract: smartContract, // Kirim contract Ethers
              web3: null, // web3 tidak dipakai lagi
            })
          );
          // --- AKHIR PERUBAHAN KE Ethers ---

          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
        }
      } catch (err) {
        console.error("Connection error:", err);
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData()); // Cukup panggil fetchData, tak perlu kirim akun
  };
};