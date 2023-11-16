import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from "./Pages/Layout";
import NoPage from "./Pages/NoPage";
import Export from './Pages/Export';
import Complaints from './Pages/Complaints';
import Complaint from './Pages/Complaint';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="export" element={<Export />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/:id" element={<Complaint />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
