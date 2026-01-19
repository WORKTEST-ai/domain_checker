import type { RDAPResult } from '../utils/rdapParser';

interface ResultCardProps {
    data: RDAPResult;
}

export const ResultCard = ({ data }: ResultCardProps) => {
    if (!data.isRegistered) {
        return (
            <div className="result-card not-found">
                <div className="status-header">
                    <span className="domain-name">{data.domainName}</span>
                    <span className="status-badge available">Available / Not Found</span>
                </div>
                <p className="status-desc">This domain is likely available for registration.</p>
                <style>{`
            .result-card {
                background: var(--surface-color);
                border-radius: var(--radius-lg);
                padding: 2rem;
                box-shadow: var(--shadow-sm);
                border: 1px solid var(--border-color);
                animation: fadeIn 0.3s ease-in;
            }
            .status-header {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 1rem;
            }
            .domain-name {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-primary);
            }
            .status-badge {
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.875rem;
                font-weight: 600;
            }
            .status-badge.available {
                background-color: var(--success-color);
                color: white;
            }
             .status-desc {
                color: var(--text-secondary);
             }
             @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
             }
        `}</style>
            </div>
        );
    }

    return (
        <div className="result-card registered">
            <div className="status-header">
                <span className="domain-name">{data.domainName}</span>
                <span className="status-badge registered">Registered</span>
            </div>

            <div className="info-grid">
                <div className="info-item">
                    <label>Registrar</label>
                    <p>{data.registrar || 'N/A'}</p>
                </div>
                <div className="info-item">
                    <label>Created Date</label>
                    <p>{data.registrationDate || 'N/A'}</p>
                </div>
                <div className="info-item">
                    <label>Expiration Date</label>
                    <p>{data.expirationDate || 'N/A'}</p>
                </div>
                <div className="info-item">
                    <label>Last Updated</label>
                    <p>{data.lastUpdated || 'N/A'}</p>
                </div>
            </div>

            {data.nameservers.length > 0 && (
                <div className="nameservers-section">
                    <h3>Name Servers</h3>
                    <ul>
                        {data.nameservers.map(ns => (
                            <li key={ns}>{ns}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.statusCodes.length > 0 && (
                <div className="status-codes-section">
                    <h3>Status Codes</h3>
                    <div className="tags">
                        {data.statusCodes.map(code => (
                            <span key={code} className="code-tag">{code}</span>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
          .result-card {
            background: var(--surface-color);
            border-radius: var(--radius-lg);
            padding: 2rem;
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border-color);
            animation: fadeIn 0.3s ease-in;
          }
           .status-header {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1rem;
        }
        .domain-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
        }
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 600;
        }
        .status-badge.registered {
            background-color: var(--error-color);
            color: white;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .info-item label {
            display: block;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-secondary);
            margin-bottom: 0.25rem;
            font-weight: 600;
        }
        .info-item p {
            font-size: 1.125rem;
            color: var(--text-primary);
            font-weight: 500;
            word-break: break-word;
        }

        .nameservers-section, .status-codes-section {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border-color);
        }
        
        h3 {
            font-size: 1rem;
            margin-bottom: 1rem;
            color: var(--text-primary);
        }

        .nameservers-section ul {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
        }
        
        .nameservers-section li {
            color: var(--text-secondary);
            font-family: monospace;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .code-tag {
            background: #f1f5f9;
            color: #475569;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.875rem;
            font-family: monospace;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};
