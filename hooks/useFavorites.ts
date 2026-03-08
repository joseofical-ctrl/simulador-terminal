"use client";

// ============================================================
// Hook: useFavorites
// Manages favorite excuses using localStorage persistence
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { Excuse } from "@/types";

const STORAGE_KEY = "excuse-generator-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Excuse[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites:", error);
      }
    }
  }, [favorites, isLoaded]);

  /**
   * Add an excuse to favorites
   */
  const addFavorite = useCallback((excuse: Excuse) => {
    setFavorites((prev) => {
      // Avoid duplicates by ID
      if (prev.find((f) => f.id === excuse.id)) return prev;
      return [excuse, ...prev];
    });
  }, []);

  /**
   * Remove an excuse from favorites by ID
   */
  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  /**
   * Check if a specific excuse is already in favorites
   */
  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((f) => f.id === id);
    },
    [favorites]
  );

  /**
   * Clear all favorites
   */
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    isLoaded,
  };
}
