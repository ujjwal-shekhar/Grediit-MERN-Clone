import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", height: '100vh', width: "100vw"}}>
      <div>
      <CircularProgress />
      </div>
    </div>
  );
}