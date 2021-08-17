import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';

import World from './pages/world';
import Check from './components/Check';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: '-apple-system', 'BlinkMacSystemFont', 'Apple SD Gothic Neo',
    'Inter', 'Spoqa Han Sans', 'Segoe UI', Sans-Serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
`;

function App() {
  const [checkDevice, setCheckDevice] = useState(true);

  const onCheckClose = () => {
    setCheckDevice(false);
  };

  return (
    <>
      <Reset />
      <GlobalStyle />
      <World />
      {
        checkDevice === true && <Check onClose={onCheckClose} />
      }
    </>
  );
}

export default App;
