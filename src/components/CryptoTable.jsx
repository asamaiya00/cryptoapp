import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableHeader from './TableHeader';
import CryptoRow from './CryptoRow';

const CryptoTable = () => {
  const [cryptos, setCryptos] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState('');

  useEffect(() => {
    async function fetchCryptos() {
      const data = await axios.get(
        `https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`
      );
      console.log(data.data.data);
      setCryptos(data.data.data);
    }
    fetchCryptos();
  }, []);
  return (
    <div>
      <table className="table">
        <TableHeader />
        <tbody>
          {cryptos.map((crypto) => (
            <CryptoRow crypto={crypto} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
