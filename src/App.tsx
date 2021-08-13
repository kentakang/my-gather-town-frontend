import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';

import World from './pages/world';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
  }
`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <World />
    </>
  );
}

export default App;
