interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="error-message">
            <div className="error-icon">⚠️</div>
            <p>{message}</p>
            <style>{`
        .error-message {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background-color: #fef2f2;
          border: 1px solid #fee2e2;
          color: #991b1b;
          border-radius: var(--radius-md);
          margin-top: 1rem;
        }
        .error-icon {
            font-size: 1.5rem;
        }
      `}</style>
        </div>
    );
};
