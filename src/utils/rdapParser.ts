export interface RDAPResult {
    domainName: string;
    isRegistered: boolean;
    registrar?: string;
    registrationDate?: string;
    expirationDate?: string;
    lastUpdated?: string;
    nameservers: string[];
    statusCodes: string[];
    raw?: any;
}

export const parseRDAPResponse = (data: any): RDAPResult => {
    const isRegistered = data.errorCode !== 404;

    // Basic info always present if registered, or we try to extract what we can
    const domainName = data.ldhName || "Unknown Domain";

    if (!isRegistered) {
        return {
            domainName,
            isRegistered: false,
            nameservers: [],
            statusCodes: []
        };
    }

    // Helper to extract entities
    const getRegistrar = (entities: any[]): string | undefined => {
        if (!entities) return undefined;
        for (const entity of entities) {
            if (entity.roles && entity.roles.includes('registrar')) {
                // Try to find FN in vcard
                const vcard = entity.vcardArray;
                if (vcard && Array.isArray(vcard) && vcard.length > 1) {
                    const attributes = vcard[1];
                    for (const attr of attributes) {
                        if (attr[0] === 'fn') {
                            return attr[3];
                        }
                    }
                }
            }
            // Recursive check
            if (entity.entities) {
                const found = getRegistrar(entity.entities);
                if (found) return found;
            }
        }
        return undefined;
    };

    // Helper to extract dates
    const getEventDate = (events: any[], action: string): string | undefined => {
        if (!events) return undefined;
        const event = events.find((e: any) => e.eventAction === action);
        return event ? event.eventDate : undefined;
    };

    // Helper to extract nameservers
    const getNameservers = (ns: any[]): string[] => {
        if (!ns) return [];
        return ns.map((n: any) => n.ldhName).filter(Boolean);
    };

    return {
        domainName,
        isRegistered: true,
        registrar: getRegistrar(data.entities),
        registrationDate: getEventDate(data.events, 'registration'),
        expirationDate: getEventDate(data.events, 'expiration'),
        lastUpdated: getEventDate(data.events, 'last changed'),
        nameservers: getNameservers(data.nameservers),
        statusCodes: data.status || [],
        raw: data
    };
};
