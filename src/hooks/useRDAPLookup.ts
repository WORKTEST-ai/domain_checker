import { useState } from 'react';
import { parseRDAPResponse, type RDAPResult } from '../utils/rdapParser';

interface UseRDAPLookupReturn {
    lookup: (domain: string) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    result: RDAPResult | null;
    reset: () => void;
}

export const useRDAPLookup = (): UseRDAPLookupReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<RDAPResult | null>(null);

    const reset = () => {
        setError(null);
        setResult(null);
        setIsLoading(false);
    };

    const lookup = async (domain: string) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        // Basic Validation
        const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            setError("Invalid domain format. Please use 'example.com'");
            setIsLoading(false);
            return;
        }

        try {
            // Direct call to Verisign RDAP
            // Note: This may fail with CORS in browser if not proxied, but per PRD we implement the frontend logic.
            const url = `https://rdap.verisign.com/com/v1/domain/${domain.toLowerCase()}`;

            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    // Domain not found (Available)
                    // RDAP usually returns 404 for not found. We still parse it as a result but isRegistered = false
                    // However, Verisign might return 404 JSON or just 404 text.
                    // Let's assume standard RDAP behavior where we effectively treat 404 as "Not Found" result.
                    setResult({
                        domainName: domain,
                        isRegistered: false,
                        nameservers: [],
                        statusCodes: []
                    });
                    setIsLoading(false);
                    return;
                } else if (response.status === 400) {
                    throw new Error("Invalid request");
                }
                // Generic API error
                throw new Error(`RDAP Error: ${response.status}`);
            }

            const data = await response.json();
            const parsed = parseRDAPResponse(data);
            setResult(parsed);

        } catch (err: any) {
            console.error("Lookup error:", err);
            if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
                setError("CORS Error: The browser blocked the request. This API typically requires a backend proxy.");
            } else {
                setError(err.message || "An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { lookup, isLoading, error, result, reset };
};
