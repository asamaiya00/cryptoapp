import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableHeader from './TableHeader';
import CryptoRow from './CryptoRow';

const CryptoTable = () => {
  const [cryptos, setCryptos] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const limit = 20;

  useEffect(() => {
    async function fetchCryptos() {
      const data = await axios.get(
        `https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}&search=${searchTerm}`
      );
      console.log(data.data.data);
      setCryptos(data.data.data);
    }
    fetchCryptos();
  }, [limit, offset, searchTerm]);

  const handlePrev = () => {
    if (offset >= limit) setOffset((offset) => Number(offset) - limit);
    else alert('last page');
  };
  const handleNext = () => {
    if (cryptos.length === limit) setOffset((offset) => Number(offset) + limit);
    else alert('last page');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cryptos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table">
        <TableHeader />
        <tbody>
          {cryptos.map((crypto) => (
            <CryptoRow crypto={crypto} />
          ))}
        </tbody>
      </table>
      <div className="btn-container">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default CryptoTable;
