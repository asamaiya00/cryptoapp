import React from 'react';
import millify from 'millify';

const CryptoRow = ({ crypto }) => {
  return (
    <tr>
      <td data-label="Rank">{crypto.rank}</td>
      <td data-label="Name">{crypto.name}</td>
      <td data-label="Symbol">{crypto.symbol}</td>
      <td data-label="Price (Usd)">{`$${
        Number.parseFloat(crypto.priceUsd).toFixed(2) || 0
      }`}</td>
      <td data-label="24H change%">
        {crypto.changePercent24Hr
          ? Number.parseFloat(crypto.changePercent24Hr).toFixed(2)
          : 0}
      </td>
      <td data-label="Market Cap (USD)">
        {`$${millify(crypto?.marketCapUsd || 0)}`}
      </td>
      <td data-label="24H Volume">{millify(crypto?.volumeUsd24Hr || 0)}</td>
    </tr>
  );
};

export default CryptoRow;
