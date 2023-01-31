import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import SearchForm from './components/searchForm';
import SearchResults from './components/searchResults';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/"  element={<SearchForm />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
