import * as monaco from "monaco-editor";

monaco.editor.defineTheme("deepNavyTheme", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "comment", foreground: "87CEFA" }, // Light blue comments
    { token: "keyword", foreground: "FFD700", fontStyle: "bold" }, // Gold keywords
    { token: "string", foreground: "FFA07A" }, // Light salmon strings
    { token: "number", foreground: "00FFFF" }, // Cyan numbers
    { token: "variable", foreground: "FFFFFF" }, // White variables
  ],
  colors: {
    "editor.background": "#02040E", // Deep navy blue
    "editor.foreground": "#FFFFFF", // White text
    "editor.selectionBackground": "#003366", // Darker navy selection
    "editor.lineHighlightBackground": "#051125", // Slightly lighter navy highlight
    "editorCursor.foreground": "#FFD700", // Gold cursor
  },
});
