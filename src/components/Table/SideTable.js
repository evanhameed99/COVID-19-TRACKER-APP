import React from 'react';
import './SideTable.css';
const SideTable = ({ countries }) => {
  return (
    <div className='table'>
      <table>
        <tbody>
          {countries.map(({ country, cases }, index) => {
            return (
              <tr key={index}>
                <td>{country}</td>
                <td>{cases}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SideTable;
