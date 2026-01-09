import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import CandidateSearch from './components/CandidateSearch';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

// Debug: Check if environment variable is loaded
console.log('GraphQL URI:', process.env.REACT_APP_GRAPHQL_URI);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4000/graphql',
});

// Add auth context if needed (for future authentication)
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // Add any auth headers here if needed
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  }
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
