"use client";
import React, { useState } from "react";
import { useFilter } from "@/app/contex/FilterContext";
import { useRouter } from "next/navigation";

const FilterModal: React.FC = () => {
  const { isOpen, closeFilter, applyFilter , resetFilter } = useFilter();

  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    applyFilter({
      location: location.trim().toLowerCase(),
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    });


    closeFilter();
      router.push("/Rent")   
 
  };
  const handleReset = () => {
   resetFilter();         
  setLocation("");  
  setMinPrice("");    
  setMaxPrice("");       
  closeFilter();     
  router.push("/Rent")   
};

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm text-color3 flex items-center justify-center" onClick={closeFilter}>
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-xl relative shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={closeFilter}
          className="absolute top-2 right-3 text-2xl text-gray-500 cursor-pointer"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Filter</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-primary text-white py-2 rounded cursor-pointer hover:-translate-y-0.5"
          >
            Apply Filter
          </button>
            <button
            type="button"
            className="w-full border border-gray-400 text-gray-600 py-2 rounded mt-2 cursor-pointer hover:-translate-y-0.5"
            onClick={handleReset}
            >
              Reset Filter
            </button>
        </form>
      </div>
    </div> 
  );
};

export default FilterModal;
