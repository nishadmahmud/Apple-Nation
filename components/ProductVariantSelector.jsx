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
  
  const getInitialStorage = () => {
    if (initialVariant?.storage) return initialVariant.storage;
    return null;
  };
  
  const getInitialRegion = () => {
    if (initialVariant?.region) return initialVariant.region;
    return null;
  };

  const [selectedColor, setSelectedColor] = useState(getInitialColor);
  const [selectedStorage, setSelectedStorage] = useState(getInitialStorage);
  const [selectedRegion, setSelectedRegion] = useState(getInitialRegion);
  
  // Update selections when initialVariant changes
  useEffect(() => {
    if (initialVariant) {
      if (initialVariant.color && initialVariant.color !== selectedColor) {
        setSelectedColor(initialVariant.color);
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
    if (!variants || variants.length === 0) return { colors: [], storages: [], regions: [] };

    const colorSet = new Set();
    const storageSet = new Set();
    const regionSet = new Set();

    variants.forEach((variant) => {
      if (variant.color) colorSet.add(variant.color);
      if (variant.storage) storageSet.add(variant.storage);
      if (variant.region) regionSet.add(variant.region);
    });

    return {
      colors: Array.from(colorSet).sort(),
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
      if (selectedStorage && variant.storage !== selectedStorage) return false;
      if (selectedRegion && variant.region !== selectedRegion) return false;
      return true;
    });
  }, [variants, selectedColor, selectedStorage, selectedRegion]);

  // Get the selected variant
  const selectedVariant = useMemo(() => {
    if (getAvailableVariants.length === 0) return null;
    
    // If all filters are selected, return the exact match
    if (selectedColor && selectedStorage && selectedRegion) {
      return getAvailableVariants.find(
        (v) => 
          v.color === selectedColor && 
          v.storage === selectedStorage && 
          v.region === selectedRegion
      ) || getAvailableVariants[0];
    }
    
    // Otherwise return first available
    return getAvailableVariants[0];
  }, [selectedColor, selectedStorage, selectedRegion, getAvailableVariants]);

  // Initialize with first available options only if nothing is selected AND no initialVariant provided
  useEffect(() => {
    // Don't auto-select if initialVariant is provided (even if null initially, wait for it)
    if (initialVariant !== undefined) return;
    
    if (availableOptions.colors.length > 0 && selectedColor === null) {
      setSelectedColor(availableOptions.colors[0]);
    }
    if (availableOptions.storages.length > 0 && selectedStorage === null) {
      setSelectedStorage(availableOptions.storages[0]);
    }
    if (availableOptions.regions.length > 0 && selectedRegion === null) {
      setSelectedRegion(availableOptions.regions[0]);
    }
  }, [availableOptions, selectedColor, selectedStorage, selectedRegion, initialVariant]);

  // Notify parent of variant change
  useEffect(() => {
    if (selectedVariant && onVariantChange) {
      onVariantChange(selectedVariant);
    }
  }, [selectedVariant, onVariantChange]);

  // Get available options for a filter - show ALL options from ALL variants
  const getFilteredOptions = (filterType) => {
    // Always show all available options, not filtered by current selections
    if (filterType === 'color') {
      return availableOptions.colors;
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

  // Even if there's only one option, still show the selector UI (just non-interactive)

  return (
    <div className="space-y-4">
      {/* Color Selector */}
      {availableOptions.colors.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-zinc-100">
            Color: <span className="font-normal text-slate-600 dark:text-zinc-400">{selectedColor || 'Select'}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {getFilteredOptions('color').map((color) => {
              const isSelected = selectedColor === color;
              // Check if any variant with this color is in stock
              const colorVariants = variants.filter((v) => v.color === color);
              const isInStock = colorVariants.some((v) => v.in_stock === 1);
              
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color);
                    // If storage/region is selected but not available for this color, reset to first available
                    const colorVariants = variants.filter((v) => v.color === color);
                    const availableStorages = new Set(colorVariants.map((v) => v.storage).filter(Boolean));
                    const availableRegions = new Set(colorVariants.map((v) => v.region).filter(Boolean));
                    
                    if (selectedStorage && !availableStorages.has(selectedStorage)) {
                      const sortedStorages = Array.from(availableStorages).sort((a, b) => {
                        const numA = parseInt(a);
                        const numB = parseInt(b);
                        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                        return a.localeCompare(b);
                      });
                      setSelectedStorage(sortedStorages[0] || null);
                    }
                    if (selectedRegion && !availableRegions.has(selectedRegion)) {
                      const sortedRegions = Array.from(availableRegions).sort();
                      setSelectedRegion(sortedRegions[0] || null);
                    }
                  }}
                  disabled={!isInStock}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                    isSelected
                      ? "border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20 dark:border-sky-400 dark:bg-sky-900/30 dark:text-sky-300"
                      : isInStock
                      ? "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 dark:border-zinc-600 dark:bg-zinc-700/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-600/80"
                      : "border-slate-200 bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
                  }`}
                >
                  {color}
                  {!isInStock && <span className="ml-1 text-xs">(Out of Stock)</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Storage Selector */}
      {availableOptions.storages.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-zinc-100">
            Storage: <span className="font-normal text-slate-600 dark:text-zinc-400">{selectedStorage || 'Select'}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {getFilteredOptions('storage').map((storage) => {
              const isSelected = selectedStorage === storage;
              // Check if any variant with this storage (and current color/region if selected) is in stock
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
                    // If color/region is selected but not available for this storage, reset to first available
                    const storageVariants = variants.filter((v) => v.storage === storage);
                    const availableColors = new Set(storageVariants.map((v) => v.color).filter(Boolean));
                    const availableRegions = new Set(storageVariants.map((v) => v.region).filter(Boolean));
                    
                    if (selectedColor && !availableColors.has(selectedColor)) {
                      const sortedColors = Array.from(availableColors).sort();
                      setSelectedColor(sortedColors[0] || null);
                    }
                    if (selectedRegion && !availableRegions.has(selectedRegion)) {
                      const sortedRegions = Array.from(availableRegions).sort();
                      setSelectedRegion(sortedRegions[0] || null);
                    }
                  }}
                  disabled={!isInStock}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                    isSelected
                      ? "border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20 dark:border-sky-400 dark:bg-sky-900/30 dark:text-sky-300"
                      : isInStock
                      ? "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 dark:border-zinc-600 dark:bg-zinc-700/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-600/80"
                      : "border-slate-200 bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
                  }`}
                >
                  {storage}
                  {!isInStock && <span className="ml-1 text-xs">(Out of Stock)</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Region Selector */}
      {availableOptions.regions.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-zinc-100">
            Region: <span className="font-normal text-slate-600 dark:text-zinc-400">{selectedRegion || 'Select'}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {getFilteredOptions('region').map((region) => {
              const isSelected = selectedRegion === region;
              // Check if any variant with this region (and current color/storage if selected) is in stock
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
                    // If color/storage is selected but not available for this region, reset to first available
                    const regionVariants = variants.filter((v) => v.region === region);
                    const availableColors = new Set(regionVariants.map((v) => v.color).filter(Boolean));
                    const availableStorages = new Set(regionVariants.map((v) => v.storage).filter(Boolean));
                    
                    if (selectedColor && !availableColors.has(selectedColor)) {
                      const sortedColors = Array.from(availableColors).sort();
                      setSelectedColor(sortedColors[0] || null);
                    }
                    if (selectedStorage && !availableStorages.has(selectedStorage)) {
                      const sortedStorages = Array.from(availableStorages).sort((a, b) => {
                        const numA = parseInt(a);
                        const numB = parseInt(b);
                        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                        return a.localeCompare(b);
                      });
                      setSelectedStorage(sortedStorages[0] || null);
                    }
                  }}
                  disabled={!isInStock}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                    isSelected
                      ? "border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20 dark:border-sky-400 dark:bg-sky-900/30 dark:text-sky-300"
                      : isInStock
                      ? "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 dark:border-zinc-600 dark:bg-zinc-700/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-600/80"
                      : "border-slate-200 bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
                  }`}
                >
                  {region}
                  {!isInStock && <span className="ml-1 text-xs">(Out of Stock)</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

