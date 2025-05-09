import { useState, useEffect } from "react";
import type { Skip, SkipsResponse } from "../types";

export const useSkips = (postcode: string, area: string) => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);

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

  const selectSkip = (id: number) => {
    setSelectedSkip(id);
  };

  return {
    skips,
    loading,
    error,
    selectedSkip,
    selectSkip,
  };
};
