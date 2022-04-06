import React from 'react';

const TableHeader = () => {
  return (
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
  );
};

export default TableHeader;
