import { useState, type FormEvent } from 'react';

interface SearchBarProps {
    onSearch: (domain: string) => void;
    isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                placeholder="Enter domain (e.g., google.com)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="search-input"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="search-button">
                {isLoading ? 'Searching...' : 'Search'}
            </button>
            <style>{`
        .search-bar {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-md);
          padding: 0.5rem;
          border-radius: var(--radius-lg);
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          transition: box-shadow 0.2s;
        }
        
        .search-bar:focus-within {
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
          border-color: var(--primary-color);
        }

        .search-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          font-size: 1rem;
          outline: none;
          background: transparent;
          color: var(--text-primary);
        }

        .search-button {
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          transition: background-color 0.2s;
        }

        .search-button:hover:not(:disabled) {
          background-color: var(--primary-hover);
        }

        .search-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        @media (max-width: 480px) {
            .search-bar {
                flex-direction: column;
                padding: 1rem;
                gap: 1rem;
            }
            .search-button {
                width: 100%;
            }
        }
      `}</style>
        </form>
    );
};
