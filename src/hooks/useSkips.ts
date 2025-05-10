import { useState, useEffect } from "react";
import type { Skip, SkipsResponse } from "../types";

const LOCAL_STORAGE_KEY = "selectedSkipId";

export const useSkips = (postcode: string, area: string) => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkip, setSelectedSkip] = useState<number | null>(() => {
    // Initialize from localStorage if available
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.error("Error reading from localStorage:", err);
      return null;
    }
  });

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        // API returns array of skips directly
        const data: SkipsResponse = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setSkips(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setSkips([]);
      } finally {
        setLoading(false);
      }
    };

    if (postcode && area) {
      fetchSkips();
    }
  }, [postcode, area]);

  // Save selectedSkip to localStorage whenever it changes
  useEffect(() => {
    try {
      if (selectedSkip !== null) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedSkip));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }, [selectedSkip]);

  const selectSkip = (id: number) => {
    // Toggle selection if the same skip is clicked again
    setSelectedSkip(selectedSkip === id ? null : id);
  };

  return {
    skips,
    loading,
    error,
    selectedSkip,
    selectSkip,
  };
};
