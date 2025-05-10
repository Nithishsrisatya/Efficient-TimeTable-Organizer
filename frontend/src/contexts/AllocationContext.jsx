import React, { createContext, useState } from 'react';

export const AllocationContext = createContext();

export const AllocationProvider = ({ children }) => {
  const [allocations, setAllocations] = useState([]);

  return (
    <AllocationContext.Provider value={{ allocations, setAllocations }}>
      {children}
    </AllocationContext.Provider>
  );
};
