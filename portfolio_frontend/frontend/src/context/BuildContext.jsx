import React, { createContext, useContext } from 'react';

const BuildContext = createContext({ ready: false });

export const BuildProvider = ({ children, ready }) => (
  <BuildContext.Provider value={{ ready: !!ready }}>
    {children}
  </BuildContext.Provider>
);

export const useBuild = () => useContext(BuildContext);
