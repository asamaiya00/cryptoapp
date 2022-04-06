import React from 'react';
import millify from 'millify';

const CryptoRow = ({ crypto }) => {
  return (
    <tr key={crypto.rank}>
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
  );
};

export default CryptoRow;
