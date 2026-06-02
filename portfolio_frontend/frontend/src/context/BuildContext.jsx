import React, { createContext, useContext, useState } from 'react';

const BuildContext = createContext({ ready: false });

export const BuildProvider = ({ children, initialReady = false }) => {
  const [ready, setReady] = useState(initialReady);
  return (
    <BuildContext.Provider value={{ ready, setReady }}>
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => useContext(BuildContext);
