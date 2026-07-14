import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes/routes';

import '@/styles/global.css';
import { Toaster } from './components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <Routes />
  </React.StrictMode>
);
