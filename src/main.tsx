import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from '/cez/App.tsx';
import '/cez/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
