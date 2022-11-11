import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from './Component/context/UserContext';
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <React.StrictMode>
    <UserContextProvider>
    <QueryClientProvider client={client}>
        <App />
        </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
