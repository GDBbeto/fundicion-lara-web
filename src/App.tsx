import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter

import NavigationMenu from 'components/NavigationMenu';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationMenu />
      </div>
    </BrowserRouter>
  );
}

export default App;
