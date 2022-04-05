import React, { useEffect, useState } from 'react';
import axios from 'axios';
const CryptoTable = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    async function fetchCryptos() {
      const data = await axios.get('https://api.coincap.io/v2/assets');
      console.log(data.data.data);
      setCryptos(data.data.data);
    }
    fetchCryptos();
  }, []);
  return <div>{JSON.stringify(cryptos)}</div>;
};

export default CryptoTable;
