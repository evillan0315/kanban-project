"use client";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import {
  IconBrandPrisma,
  IconFavicon,
  IconFile,
  IconFileTypeCss,
  IconFileTypeJpg,
  IconFileTypeJs,
  IconFileTypeJsx,
  IconFileTypePng,
  IconFileTypeSql,
  IconFileTypeSvg,
  IconFileTypeTs,
  IconFileTypeTsx,
  IconFileTypeXml,
  IconFolder,
  IconFolderFilled,
  IconGitCommit,
  IconJson,
  IconMarkdown,
} from "@tabler/icons-react";
import CodeEditor from "./CodeEditor";



interface FileNode {
  type: "file" | "directory";
  name: string;
  contents?: FileNode[];
}

interface FileManagerProps {
  structure: FileNode;
}

const FileManager: React.FC<FileManagerProps> = ({ structure }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    
  }, []);
  const handleFileClick = async (filePath: string) => {
    setSelectedFile(filePath);
    
  };
  
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar File Manager */}
      <List sx={{ width: 280, overflowY: "auto", borderRight: "1px solid #ccc", p: 1 }}>
        <FileNodeItem node={structure} onFileClick={handleFileClick} />
      </List>


      <Box sx={{ flexGrow: 1, p: 2 }}>
        {selectedFile ? (
          <CodeEditor selectedFile={selectedFile} />
        ) : (
          <Box sx={{ textAlign: "center", mt: 5, color: "#777" }}>Select a file to preview</Box>
        )}
      </Box>
    </Box>
  );
};

const FileNodeItem: React.FC<{ node: FileNode; onFileClick: (filePath: string) => void }> = ({ node, onFileClick }) => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    if (node.type === "directory") setOpen(!open);
    else onFileClick(node.name);
  };

  return (
    <>
      <ListItem  onClick={handleToggle}>
        <ListItemIcon>
          {node.type === "directory" ? (open ? <IconFolder /> : <IconFolderFilled />) : <FileIcon name={node.name} />}
        </ListItemIcon>
        <ListItemText primary={node.name} />
        {node.type === "directory" && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {node.type === "directory" && node.contents && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" sx={{ paddingLeft: 2 }}>
            {node.contents.map((childNode) => (
              <FileNodeItem key={childNode.name} node={childNode} onFileClick={onFileClick} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const FileIcon: React.FC<{ name: string }> = ({ name }) => {
  if (name.endsWith(".md")) return <IconMarkdown />;
  if (name.endsWith(".prisma")) return <IconBrandPrisma />;
  if (name.endsWith(".gitignore")) return <IconGitCommit />;
  if (name.endsWith(".ts")) return <IconFileTypeTs />;
  if (name.endsWith(".tsx")) return <IconFileTypeTsx />;
  if (name.endsWith(".css")) return <IconFileTypeCss />;
  if (name.endsWith(".js")) return <IconFileTypeJs />;
  if (name.endsWith(".jsx")) return <IconFileTypeJsx />;
  if (name.endsWith(".json")) return <IconJson />;
  if (name.endsWith(".sql")) return <IconFileTypeSql />;
  if (name.endsWith(".svg")) return <IconFileTypeSvg />;
  if (name.endsWith(".png")) return <IconFileTypePng />;
  if (name.endsWith(".jpg")) return <IconFileTypeJpg />;
  if (name.endsWith(".xml")) return <IconFileTypeXml />;
  if (name.endsWith(".ico")) return <IconFavicon />;
  return <IconFile />;
};

export default FileManager;
