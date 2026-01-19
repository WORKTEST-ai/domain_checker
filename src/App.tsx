import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useRDAPLookup } from './hooks/useRDAPLookup';
import './App.css'

function App() {
  const { lookup, isLoading, error, result } = useRDAPLookup();

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Domain & WHOIS Lookup</h1>
        <p className="subtitle">Check domain availability and registration details</p>
      </header>

      <section className="search-section">
        <SearchBar onSearch={lookup} isLoading={isLoading} />

        {isLoading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {result && !isLoading && <ResultCard data={result} />}

        {!isLoading && !error && !result && (
          <div className="empty-state">
            <p>Enter a domain name above to search the public WHOIS/RDAP database.</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
