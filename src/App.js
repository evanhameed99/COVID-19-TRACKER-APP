import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';

import React, { useState, useEffect } from 'react';
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';
import LineGraph from './components/LineGraph/LineGraph';
import Map from './components/Map/Map';
import SideTable from './components/Table/SideTable';
import { sortData } from './util';
import 'leaflet/dist/leaflet.css';
import { prettyPrintStat } from './util';
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [currentCountry, setCurrentCountry] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((resp) => resp.json())
      .then((data) => setCurrentCountry(data));
  }, []);
  useEffect(() => {
    fetchContries();
  }, []);

  const fetchContries = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
      .then((resp) => resp.json())
      .then((data) => {
        const countries = data.map((res) => {
          return {
            name: res.country,
            value: res.countryInfo.iso2,
          };
        });
        const sortedData = sortData(data);
        setCountries(countries);
        setTableData(sortedData);
        setMapCountries(data);
      });
  };
  const onCountryChange = async (evt) => {
    const countryCode = evt.target.value;
    setCountry(countryCode);
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
        setCurrentCountry(data);
      });
  };

  return (
    <div className='app'>
      <div className='app__left'>
        {' '}
        <header className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>worldwide</MenuItem>
              {countries.map((country, index) => {
                return (
                  <MenuItem key={index} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </header>
        <div className='app__stats'>
          <InfoBox
            isRed
            active={casesType === 'cases'}
            title='coronavirus cases'
            onClick={() => setCasesType('cases')}
            cases={prettyPrintStat(currentCountry.todayCases)}
            total={prettyPrintStat(currentCountry.cases)}
          />
          <InfoBox
            active={casesType === 'recovered'}
            title='Recovered'
            onClick={() => setCasesType('recovered')}
            cases={prettyPrintStat(currentCountry.todayRecovered)}
            total={prettyPrintStat(currentCountry.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === 'deaths'}
            title='Deaths'
            onClick={() => setCasesType('deaths')}
            cases={prettyPrintStat(currentCountry.todayDeaths)}
            total={prettyPrintStat(currentCountry.deaths)}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live cases by country</h3>
          <SideTable countries={tableData} />
          <h3 className='app__graph__title'>Worldwide new {casesType}</h3>
          <LineGraph className='app__graph' casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
