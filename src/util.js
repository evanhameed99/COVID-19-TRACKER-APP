import { Circle, Popup } from 'react-leaflet';
import React from 'react';
import numeral from 'numeral';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',

    multiplier: 50000,
  },
  recovered: {
    hex: '#7dd71d',

    multiplier: 50000,
  },
  deaths: {
    hex: '#fb4443',

    multiplier: 50000,
  },
};
export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};
export const prettyPrintStat = (stat) => {
  return stat ? `+${numeral(stat).format('0.0a')}` : '+0';
};
export const showDataOnMap = (data, casesType = 'cases') => {
  return data.map((country, index) => {
    return (
      <div key={index}>
        <Circle
          center={[country.countryInfo.lat, country.countryInfo.long]}
          fillOpacity={0.4}
          color={casesTypeColors[casesType].hex}
          fillColor={casesTypeColors[casesType].hex}
          radius={Math.sqrt(
            country[casesType] * casesTypeColors[casesType].multiplier
          )}
        >
          <Popup>
            <h3>{country.country}</h3>
            <h4>Cases : {country.cases}</h4>
            <h4>Deaths : {country.deaths}</h4>
            <h4>recovered : {country.recovered}</h4>
          </Popup>
        </Circle>
      </div>
    );
  });
};
