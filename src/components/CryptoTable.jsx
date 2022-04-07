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

  useEffect(() => {
    // replace 'ALL' by crypto name for single crypto
    const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');
    pricesWs.onmessage = function (msg) {
      let updatedCoins = JSON.parse(msg.data);
      let cryptosNames = cryptos.map((crypto) => crypto.id);
      for (let key in updatedCoins) {
        if (cryptosNames.find((name) => name === key)) {
          setCryptos((cryptos) =>
            cryptos.map((crypto) =>
              crypto.id === key
                ? { ...crypto, priceUsd: updatedCoins[key] }
                : crypto
            )
          );
        }
      }
    };
  }, [cryptos]);

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
      <div className="main">
        <table className="table">
          <TableHeader />
          <tbody>
            {cryptos.map((crypto) => (
              <CryptoRow key={crypto.rank} crypto={crypto} />
            ))}
          </tbody>
        </table>
        <div className="btn-container">
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
