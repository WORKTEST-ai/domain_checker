
export const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <style>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-color);
          border-top: 3px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};
