PROJECT: Domain & WHOIS (RDAP) Lookup Tool
TECH STACK:

Framework: Vite + React (latest stable versions)
Styling: Plain CSS or modern CSS (CSS Modules, CSS-in-JS acceptable; avoid heavy UI frameworks like Material-UI or Ant Design)
Code Quality: Production-ready, well-commented, follows React best practices
Responsiveness: Mobile-first design that works seamlessly on desktop, tablet, and mobile


OBJECTIVE:
Build a professional domain lookup interface that fetches REAL RDAP (Registration Data Access Protocol) data from:
https://rdap.verisign.com/com/v1/domain/{domain}

CRITICAL REQUIREMENTS:
1. DATA ACCURACY (Non-Negotiable)

✅ DO: Fetch real RDAP data from the API
✅ DO: Show "Registered" if domain exists (HTTP 200)
✅ DO: Show "Not Registered / Not Found" if RDAP returns 404
❌ DO NOT: Generate fake, mocked, or randomized availability results
❌ DO NOT: Hardcode domain data or simulate responses
⚠️ CORS Handling: If browser blocks the request due to CORS, display a clear, user-friendly error message explaining the limitation (e.g., "This lookup may require a backend proxy or browser extension")

2. APPLICATION STATES
Handle all states explicitly:

Idle: Initial state before search
Loading: Show spinner/skeleton during API request
Success: Display parsed RDAP data in clean cards
Error: Show specific error messages:

Invalid domain format (e.g., missing TLD)
Network/RDAP API errors
CORS issues
404 (domain not found)



3. UI/UX DESIGN
Inspiration: Namecheap, Google Domains, Cloudflare registrar interfaces
Layout:

Centered search card with clean whitespace
Input field with placeholder: e.g., google.com
Prominent search button (with icon optional)
Results displayed below search in organized info cards

Visual Style:

Modern, professional aesthetic
Subtle shadows, rounded corners, smooth transitions
Accessible color contrast (WCAG AA minimum)
Loading states with smooth animations
Responsive grid/flexbox layout


DATA TO DISPLAY (When Available from RDAP):
Parse and display the following from RDAP JSON response:
Primary Info:

Domain name (e.g., google.com)
Registration status: "Registered" or "Not Found"

Registration Details:

Registrar name (from entities where role: ["registrar"])
Registration date (from events where eventAction: "registration")
Expiration date (from events where eventAction: "expiration")
Last updated date (from events where eventAction: "last changed")

Technical Info:

Domain status codes (from status array - e.g., clientTransferProhibited)
Name servers (from nameservers array - display as formatted list)

Data Mapping Example:
javascript// RDAP response structure reference:
{
  "ldhName": "google.com",
  "events": [
    { "eventAction": "registration", "eventDate": "1997-09-15" },
    { "eventAction": "expiration", "eventDate": "2028-09-14" }
  ],
  "entities": [
    { "roles": ["registrar"], "vcardArray": [...] }
  ],
  "nameservers": [
    { "ldhName": "ns1.google.com" }
  ],
  "status": ["client transfer prohibited"]
}

TECHNICAL IMPLEMENTATION:
API Integration:
javascript// Example fetch pattern:
const fetchRDAP = async (domain) => {
  const response = await fetch(
    `https://rdap.verisign.com/com/v1/domain/${domain.toLowerCase()}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('DOMAIN_NOT_FOUND');
    }
    throw new Error('API_ERROR');
  }
  return response.json();
};
```

**Error Handling:**
- Validate domain format before making request (regex: `^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$`)
- Wrap fetch in try-catch
- Handle CORS errors specifically (detect `TypeError: Failed to fetch`)
- Display user-friendly error messages

**Component Structure (Suggested):**
```
src/
├── components/
│   ├── SearchBar.jsx       // Input + button
│   ├── LoadingSpinner.jsx  // Loading state
│   ├── ResultCard.jsx      // Domain info display
│   └── ErrorMessage.jsx    // Error states
├── hooks/
│   └── useRDAPLookup.js    // API logic + state management
├── utils/
│   └── rdapParser.js       // Parse RDAP JSON response
├── App.jsx
├── App.css
└── main.jsx
Best Practices:

Use React hooks (useState, useEffect, custom hooks)
Keep components small and focused (Single Responsibility Principle)
Add PropTypes or TypeScript types for safety
Include meaningful comments for RDAP parsing logic
Use semantic HTML (<main>, <section>, <article>)


DELIVERABLES:

Full Vite + React Project:

package.json with dependencies
Working vite.config.js
Source code in src/


Clean Component Architecture:

Modular, reusable components
Clear separation of concerns (UI vs. logic)


Professional Styling:

Polished, production-ready CSS
Smooth transitions and hover states
Mobile-responsive (breakpoints at 768px, 1024px)


Accurate RDAP Integration:

Real API calls (no mocks unless for testing)
Correct JSON parsing
Honest error reporting


Documentation:

Brief README.md with:

Setup instructions (npm install, npm run dev)
Known limitations (CORS if applicable)
RDAP endpoint reference






TESTING CHECKLIST:
Before delivery, verify:

 Registered domains display correct info (test: google.com)
 Unregistered domains show "Not Found" (test: thisisnotarealdomain12345.com)
 Invalid formats show validation error (test: notadomain)
 Loading state appears during fetch
 Layout is responsive on mobile (< 768px)
 CORS error (if occurs) displays clear message


TONE & STYLE:

Write code as if shipping to production
Prioritize clarity over cleverness
Add comments where RDAP mapping is complex
Use modern JavaScript (ES6+, async/await)