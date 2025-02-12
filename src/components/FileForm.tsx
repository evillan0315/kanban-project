import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Box, Typography, CircularProgress } from "@mui/material";
import MonacoEditor from "@monaco-editor/react";

interface FileFormProps {
  fileId?: string; // If provided, it's editing an existing file
}

const FileForm: React.FC<FileFormProps> = ({ fileId }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (fileId) {
      setLoading(true);
      fetch(`/api/readFile?name=${fileId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: data.name || "",
            type: data.type || "",
            content: data.content || "",
          });
        })
        .catch((err) => console.error("Error loading file:", err))
        .finally(() => setLoading(false));
    }
  }, [fileId]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/saveFile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save file");

      alert("File saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving file");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {fileId ? "Edit File" : "Create New File"}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Name Field */}
          <TextField
            label="File Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {/* Type Field */}
          <TextField
            select
            label="File Type"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="code">Code</MenuItem>
            <MenuItem value="markdown">Markdown</MenuItem>
          </TextField>

          {/* Content Editor */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            File Content
          </Typography>
          <Box sx={{ border: "1px solid #ccc", borderRadius: 1, overflow: "hidden", mb: 2 }}>
            <MonacoEditor
              height="300px"
              theme="vs-dark"
              language="javascript"
              value={formData.content}
              onChange={(value) => handleChange("content", value || "")}
              options={{ minimap: { enabled: false } }}
            />
          </Box>

          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save File"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default FileForm;
