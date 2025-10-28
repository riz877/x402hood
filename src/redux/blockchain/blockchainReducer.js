// --- PERUBAHAN: Tambahkan provider dan signer, hapus web3 ---
const initialState = {
  loading: false,
  account: null,
  smartContract: null,
  provider: null, // BARU
  signer: null,     // BARU
  // web3: null,    // HAPUS
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        // --- PERUBAHAN: Simpan provider dan signer ---
        provider: action.payload.provider, // BARU
        signer: action.payload.signer,       // BARU
        // web3: action.payload.web3,       // HAPUS
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

export default blockchainReducer;