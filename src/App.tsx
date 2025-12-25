import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/homePage/HomePage";
import ArticlePage from "./pages/articlePage/ArticlePage";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/home-page" element={<HomePage/>} />
              <Route path="/articles/:id" element={ <ArticlePage/> } />
          </Routes>
      </BrowserRouter>
  )
}

export default App;
