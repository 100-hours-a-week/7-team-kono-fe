import axios from 'axios';

// Example fix for your coin.ts file
export const getCoinName = async (ticker: string) => {
  try {
    const res = await axios.get('/data/coin.json');

    // Make sure res.data is an array before using find
    if (Array.isArray(res.data)) {
      const coin = res.data.find(
        (coin: { ticker: string; name: string }) => coin.ticker === ticker,
      );

      return coin?.name || null;
    } else {
      console.error('Coin data is not an array:', res.data);
      return null;
    }
  } catch (err) {
    console.error(`get data/coin.json error:`, err);
    return null;
  }
};

export default getCoinName;
