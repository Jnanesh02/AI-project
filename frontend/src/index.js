// index.js
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoadingPage from './components/Loadingpage/Loadingpage'; // Import the LoadingPage component

const LazyApp = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./App'));
    },1300); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
  });
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <LazyApp/>
    </Suspense>
  </React.StrictMode>
);

