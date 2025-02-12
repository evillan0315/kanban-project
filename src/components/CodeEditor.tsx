import { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Box, Button } from "@mui/material";

export default function CodeEditor({ selectedFile }: { selectedFile: string }) {
  const [fileContent, setFileContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch file content when selectedFile changes
  useEffect(() => {
    if (selectedFile) {
      fetch(`/api/readFile?path=${selectedFile}`)
        .then((res) => res.text())
        .then(setFileContent)
        .catch((err) => console.error("Error loading file:", err));
    }
  }, [selectedFile]);

  // Function to save file
  const saveFile = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/saveFile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: selectedFile, content: fileContent }),
      });

      if (!response.ok) throw new Error("Failed to save file");

      alert("File saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving file");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {selectedFile ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={saveFile}
            disabled={isSaving}
            sx={{ mb: 1 }}
          >
            {isSaving ? "Saving..." : "Save File"}
          </Button>

          <MonacoEditor
            height="98vh"
            width="100vh"
            theme="navyBlueTheme"
            defaultLanguage=""
            className="bg-zinc-900"
            value={fileContent || ""}
            options={{ readOnly: false }}
          />
        </>
      ) : (
        <Box sx={{ textAlign: "center", mt: 5, color: "#777" }}>
          Select a file to preview
        </Box>
      )}
    </Box>
  );
}
