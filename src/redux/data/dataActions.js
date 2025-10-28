// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      // Ambil contract Ethers dari state
      const smartContract = store.getState().blockchain.smartContract;

      // PENTING: Cek apakah smartContract sudah ada
      if (smartContract) {
        // --- AWAL PERUBAHAN KE Ethers ---
        
        // Gunakan sintaks Ethers (langsung panggil fungsi)
        let totalSupply = await smartContract.totalSupply();
        
        // --- AKHIR PERUBAHAN KE Ethers ---

        dispatch(
          fetchDataSuccess({
            totalSupply: totalSupply.toString(), // Konversi BigNumber ke string
          })
        );
      } else {
        // Ini terjadi jika fetchData dipanggil sebelum connect selesai
        dispatch(fetchDataFailed("Contract not ready."));
      }
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};