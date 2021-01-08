import React from 'react';

import Routes from "./src/routes";
import updates from './src/services/updates';

export default function App() {
  updates();
  return (
     
      <Routes />
      
  );
}

