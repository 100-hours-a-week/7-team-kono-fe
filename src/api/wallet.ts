import axios from 'axios';

export const getQuantityByNicknameAndTicker = async (
  nickname: string,
  ticker: string,
) => {
  try {
    const res = await axios.get('/data/wallet.json');

    // Make sure res.data is an array before using find
    if (Array.isArray(res.data)) {
      const wallet = res.data.find(
        (wallet: { nickname: string; ticker: string }) =>
          wallet.nickname === nickname && wallet.ticker === ticker,
      );

      return wallet ? wallet.holding_quantity : 0;
    } else {
      console.error('Wallet data is not an array:', res.data);
      return 0;
    }
  } catch (err) {
    console.error(`get data/wallet.json error:`, err);
    return 0;
  }
};
