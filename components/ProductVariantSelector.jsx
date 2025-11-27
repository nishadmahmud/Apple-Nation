"use client";

import { useState, useEffect, useMemo } from "react";

export default function ProductVariantSelector({ 
  variants, 
  colors, 
  initialVariant,
  onVariantChange,
  basePrice 
}) {
  // Initialize with initialVariant if provided
  const getInitialColor = () => {
    if (initialVariant?.color) return initialVariant.color;
    return null;
  };

 const getInitialColorCode = (selectedColor) => {
  const variant = variants.find((v) => v.color === selectedColor);
  return variant?.color_code || "";
};

  
  const getInitialStorage = () => {
    if (initialVariant?.storage) return initialVariant.storage;
    return null;
  };
  
  const getInitialRegion = () => {
    if (initialVariant?.region) return initialVariant.region;
    return null;
  };
console.log(initialVariant);
  const [selectedColor, setSelectedColor] = useState(getInitialColor);
  const [selectedColorCode, setSelectedColorCode] = useState(getInitialColorCode);
  const [selectedStorage, setSelectedStorage] = useState(getInitialStorage);
  const [selectedRegion, setSelectedRegion] = useState(getInitialRegion);

  // Update selections when initialVariant changes
  useEffect(() => {
    if (initialVariant) {
      if (initialVariant.color && initialVariant.color !== selectedColor) {
        setSelectedColor(initialVariant.color);
      }

      if (initialVariant.color_code && initialVariant.color_code !== selectedColorCode) {
        setSelectedColorCode(initialVariant.color_code);
      }


      if (initialVariant.storage && initialVariant.storage !== selectedStorage) {
        setSelectedStorage(initialVariant.storage);
      }
      if (initialVariant.region && initialVariant.region !== selectedRegion) {
        setSelectedRegion(initialVariant.region);
      }
    }
  }, [initialVariant]);

  // Extract unique options from variants
  const availableOptions = useMemo(() => {
    if (!variants || variants.length === 0) return { colors: [], colorsCode: [], storages: [], regions: [] };

    const colorSet = new Set();
    const colorCodeSet = new Set();
    const storageSet = new Set();
    const regionSet = new Set();

    variants.forEach((variant) => {
      if (variant.color) colorSet.add(variant.color);
      if (variant.color_code) colorCodeSet.add(variant.color_code);
      if (variant.storage) storageSet.add(variant.storage);
      if (variant.region) regionSet.add(variant.region);
    });

    return {
      colors: Array.from(colorSet).sort(),
      colorsCode: Array.from(colorCodeSet).sort(),
      storages: Array.from(storageSet).sort((a, b) => {
        // Sort storage numerically if possible
        const numA = parseInt(a);
        const numB = parseInt(b);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
      }),
      regions: Array.from(regionSet).sort(),
    };
  }, [variants]);

  // Get available variants based on current selections
  const getAvailableVariants = useMemo(() => {
    if (!variants || variants.length === 0) return [];
    
    return variants.filter((variant) => {
      if (selectedColor && variant.color !== selectedColor) return false;

      if (selectedColorCode && variant.color_code !== selectedColorCode) return false;
      if (selectedStorage && variant.storage !== selectedStorage) return false;
      
      if (selectedRegion && variant.region !== selectedRegion) return false;
      return true;
    });
  }, [variants, selectedColor, selectedColorCode, selectedStorage, selectedRegion]);

  // Get the selected variant
  const selectedVariant = useMemo(() => {
    if (getAvailableVariants.length === 0) return null;
    
    // If all filters are selected, return the exact match
    if (selectedColor && selectedColorCode &&  selectedStorage && selectedRegion) {
      return getAvailableVariants.find(
        (v) => 
          v.color === selectedColor && 
          v.color_code === selectedColorCode && 
          v.storage === selectedStorage && 
          v.region === selectedRegion
      ) || getAvailableVariants[0];
    }
    
    // Otherwise return first available
    return getAvailableVariants[0];
  }, [selectedColor, selectedColorCode, selectedStorage, selectedRegion, getAvailableVariants]);

  // Initialize with first available options only if nothing is selected AND no initialVariant provided
  useEffect(() => {
    // Don't auto-select if initialVariant is provided (even if null initially, wait for it)
    if (initialVariant !== undefined) return;
    
    if (availableOptions.colors.length > 0 && selectedColor === null) {
      setSelectedColor(availableOptions.colors[0]);
    }
    if (availableOptions.colorsCode.length > 0 && selectedColorCode === null) {
      setSelectedColorCode(availableOptions.colorsCode[0]);
    }

    if (availableOptions.storages.length > 0 && selectedStorage === null) {
      setSelectedStorage(availableOptions.storages[0]);
    }
    if (availableOptions.regions.length > 0 && selectedRegion === null) {
      setSelectedRegion(availableOptions.regions[0]);
    }
  }, [availableOptions, selectedColor, selectedColorCode, selectedStorage, selectedRegion, initialVariant]);

  // Notify parent of variant change
  useEffect(() => {
    if (selectedVariant && onVariantChange) {
      onVariantChange(selectedVariant);
    }
  }, [selectedVariant, onVariantChange]);
console.log(availableOptions);
  // Get available options for a filter - show ALL options from ALL variants
  const getFilteredOptions = (filterType) => {
    // Always show all available options, not filtered by current selections
    if (filterType === 'color') {
      return availableOptions.colors;
    }
    if (filterType === 'color_code') {
      return availableOptions.colorsCode;
    }
    if (filterType === 'storage') {
      return availableOptions.storages;
    }
    if (filterType === 'region') {
      return availableOptions.regions;
    }
    return [];
  };

  if (!variants || variants.length === 0) return null;

  const hasMultipleColors = availableOptions.colors.length > 1;
  const hasMultipleStorages = availableOptions.storages.length > 1;
  const hasMultipleRegions = availableOptions.regions.length > 1;
console.log(selectedColorCode);
  // Even if there's only one option, still show the selector UI (just non-interactive)


  return (
    <div className="space-y-3 font-poppins grid grid-cols-2 md:gap-x-3 gap-x-2">
      {/* Color Selector */}
      {availableOptions.colors.length > 0 && (
        <div className="mb-3 bg-white rounded-xl border border-gray-300 p-5">
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-zinc-100">
            Color: <span className="font-normal text-slate-600 dark:text-zinc-400">{selectedColor || 'Select'}</span>
          </label>

          <div className="flex flex-wrap md:gap-3 gap-2">
            {getFilteredOptions('color').map((color) => {
              const isSelected = selectedColor === color;
              const colorVariants = variants.filter((v) => v.color === color);
              const isInStock = colorVariants.some((v) => v.in_stock === 1);

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
  setSelectedColor(color);
  setSelectedColorCode(getInitialColorCode(color));

  const colorVariants = variants.filter((v) => v.color === color);
  const availableStorages = new Set(colorVariants.map((v) => v.storage).filter(Boolean));
  const availableRegions = new Set(colorVariants.map((v) => v.region).filter(Boolean));

  if (selectedStorage && !availableStorages.has(selectedStorage)) {
    const sorted = Array.from(availableStorages).sort((a, b) => parseInt(a) - parseInt(b));
    setSelectedStorage(sorted[0] || null);
  }

  if (selectedRegion && !availableRegions.has(selectedRegion)) {
    const sorted = Array.from(availableRegions).sort();
    setSelectedRegion(sorted[0] || null);
  }
}}

                  disabled={!isInStock}
                  className={`flex items-center gap-1 rounded-full md:px-4 px-2 py-1 text-xs cursor-pointer font-medium transition-all border
                    ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : isInStock
                        ? "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                        : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50"
                    }`}
                >
                  <div
    className="w-4 h-4 rounded-full border border-slate-300"
    style={{
      backgroundColor:
        variants.find((v) => v.color === color)?.color_code || "#ddd",
    }}
  ></div>
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}


      {/* Storage Selector */}
      {availableOptions.storages.length > 0 && (
        <div className="mb-3 bg-white rounded-xl border border-gray-300 p-5">
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-zinc-100">
            Storage: <span className="font-normal text-slate-600 dark:text-zinc-400">{selectedStorage || 'Select'}</span>
          </label>

          <div className="flex flex-wrap gap-3">
            {getFilteredOptions('storage').map((storage) => {
              const isSelected = selectedStorage === storage;
              const storageVariants = variants.filter((v) => {
                if (v.storage !== storage) return false;
                if (selectedColor && v.color !== selectedColor) return false;
                if (selectedRegion && v.region !== selectedRegion) return false;
                return true;
              });

              const isInStock = storageVariants.some((v) => v.in_stock === 1);

              return (
                <button
                  key={storage}
                  type="button"
                  onClick={() => {
                    setSelectedStorage(storage);
                    const storageVariants = variants.filter((v) => v.storage === storage);
                    const availableColors = new Set(storageVariants.map((v) => v.color).filter(Boolean));
                    const availableRegions = new Set(storageVariants.map((v) => v.region).filter(Boolean));

                    if (selectedColor && !availableColors.has(selectedColor)) {
                      const sorted = Array.from(availableColors).sort();
                      setSelectedColor(sorted[0] || null);
                    }

                    if (selectedRegion && !availableRegions.has(selectedRegion)) {
                      const sorted = Array.from(availableRegions).sort();
                      setSelectedRegion(sorted[0] || null);
                    }
                  }}
                  disabled={!isInStock}
                  className={`rounded-full px-4 py-1 text-xs cursor-pointer font-medium transition-all border
                    ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : isInStock
                        ? "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                        : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50"
                    }`}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </div>
      )}


      {/* Region Selector */}
      {availableOptions.regions.length > 0 && (
        <div className="mb-3 bg-white rounded-xl border border-gray-300 p-5">
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-zinc-100">
            Region: <span className="font-normal text-slate-600 dark:text-zinc-400">{selectedRegion || 'Select'}</span>
          </label>

          <div className="flex flex-wrap gap-3">
            {getFilteredOptions('region').map((region) => {
              const isSelected = selectedRegion === region;
              const regionVariants = variants.filter((v) => {
                if (v.region !== region) return false;
                if (selectedColor && v.color !== selectedColor) return false;
                if (selectedStorage && v.storage !== selectedStorage) return false;
                return true;
              });

              const isInStock = regionVariants.some((v) => v.in_stock === 1);

              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => {
                    setSelectedRegion(region);
                    const regionVariants = variants.filter((v) => v.region === region);
                    const availableColors = new Set(regionVariants.map((v) => v.color).filter(Boolean));
                    const availableStorages = new Set(regionVariants.map((v) => v.storage).filter(Boolean));

                    if (selectedColor && !availableColors.has(selectedColor)) {
                      const sorted = Array.from(availableColors).sort();
                      setSelectedColor(sorted[0] || null);
                    }

                    if (selectedStorage && !availableStorages.has(selectedStorage)) {
                      const sorted = Array.from(availableStorages).sort();
                      setSelectedStorage(sorted[0] || null);
                    }
                  }}
                  disabled={!isInStock}
                  className={`rounded-full px-4 py-1 text-xs cursor-pointer font-medium transition-all border
                    ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : isInStock
                        ? "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                        : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50"
                    }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>

  );
}

