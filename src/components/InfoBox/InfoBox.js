import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './InfoBox.css';
const InfoBox = ({ title, cases, isRed, active, total, ...props }) => {
  return (
    <Card
      className={`infobox ${active && 'infobox--selected'} ${
        isRed && 'infobox--red'
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className='infobox__title' color='textSecondary'>
          {title}
        </Typography>
        <h2 className={`infobox__cases ${!isRed && 'infoBox__cases__green'}`}>
          {cases}
        </h2>
        <Typography className='infobox__total' color='textSecondary'>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
