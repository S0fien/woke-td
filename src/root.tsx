import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.tsx';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { PrimeReactProvider } from 'primereact/api';

const domNode = document.getElementById('container');

if (domNode) {
  const root = createRoot(domNode);

  root.render(
    <React.StrictMode>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </React.StrictMode>
  );
}
