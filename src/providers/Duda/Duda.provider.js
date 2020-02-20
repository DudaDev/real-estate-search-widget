import React, { useContext }  from 'react';

const DudaStateContext = React.createContext();

export default function DudaProvider ({ config, children }) {
  return (
    <DudaStateContext.Provider value={config}>
      {children}
    </DudaStateContext.Provider>
  )
}

export function useDuda () {
  return useContext(DudaStateContext);
}
