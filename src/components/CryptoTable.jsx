import React, { useEffect, useState } from 'react';
import axios from 'axios';
import millify from 'millify';
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
  return (
    <div>
      {/* {JSON.stringify(cryptos)} */}
      <table class="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (Usd)</th>
            <th>24H change%</th>
            <th>Market Cap (USD)</th>
            <th>24H Volume</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr>
              <td data-label="Rank">{crypto.rank}</td>
              <td data-label="Name">{crypto.name}</td>
              <td data-label="Symbol">{crypto.symbol}</td>
              <td data-label="Price (Usd)">{`$${millify(crypto.priceUsd)}`}</td>
              <td data-label="24H change%">
                {Number.parseFloat(crypto.changePercent24Hr).toFixed(2)}
              </td>
              <td data-label="Market Cap (USD)">
                {`$${millify(crypto.marketCapUsd)}`}
              </td>
              <td data-label="24H Volume">{millify(crypto.volumeUsd24Hr)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
