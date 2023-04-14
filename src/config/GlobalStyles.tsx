import React from 'react';
import { GlobalStyles } from '@mui/material';

const GStyles: React.FC = () => {
  return (
    <GlobalStyles
      styles={{
        body: {
          padding: '0px',
          margin: '0px',
          background: '#e7eed0'
        }
      }}
    />
  );
};

export default GStyles;
