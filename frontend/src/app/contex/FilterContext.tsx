"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface FilterValues {
  location: string;
  minPrice?: number;
  maxPrice?: number;
}

interface FilterContextType {
  isOpen: boolean;
  openFilter: () => void;
  closeFilter: () => void;
  filter: FilterValues;
  applyFilter: (filters: FilterValues) => void;
  resetFilter: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<FilterValues>({
    location: "",
    minPrice: undefined,
    maxPrice: undefined,
  });

  const openFilter = () => setIsOpen(true);
  const closeFilter = () => setIsOpen(false);

  const applyFilter = (filters: FilterValues) => {
    setFilter(filters);
  };
  const resetFilter = () => {
  setFilter({
    location: "",
    minPrice: undefined,
    maxPrice: undefined,
  });
};

  return (
    <FilterContext.Provider
      value={{ isOpen, openFilter, closeFilter, filter, applyFilter , resetFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};
