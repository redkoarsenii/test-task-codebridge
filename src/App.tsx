import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/homePage/HomePage";
import ArticlePage from "./pages/articlePage/ArticlePage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
        </Routes>
    );
}

export default App;
