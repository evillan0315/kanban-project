import { useState, useEffect } from "react";

interface Column {
  id: string;
  name: string;
  color: string;
}

export function useColor() {
  const [columnColors, setColumnColors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchColumnColors() {
      try {
        const response = await fetch("/api/column");
        if (!response.ok) throw new Error("Failed to fetch column colors");

        const columns: Column[] = await response.json();
        const colorsMap = columns.reduce<Record<string, string>>((acc, column) => {
          acc[column.name] = column.color;
          return acc;
        }, {});
        setColumnColors(colorsMap);
      } catch (error) {
        console.error("Error fetching column colors:", error);
      }
    }
    fetchColumnColors();
  }, []);
/*   const setColors = (colors: Record<string, string>) => {
    setColumnColors(colors);
  }; */
  const getColor = (id: string) => columnColors[id] || "#ccc"; // Default color if not found

  return { columnColors, getColor };
}
