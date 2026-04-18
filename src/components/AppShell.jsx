import React from 'react';

export default function AppShell({ children }) {
  return (
    <div className="app-root">
      <div className="app-shell" role="application" aria-label="Factoring tiles">
        {children}
      </div>
    </div>
  );
}
