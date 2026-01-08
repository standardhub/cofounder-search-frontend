import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import CandidateSearch from './components/CandidateSearch';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <ApolloProvider client={client}>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        <header className="App-header">
          <h1>Co-founder Candidate Search</h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>
        <main>
          <CandidateSearch />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
