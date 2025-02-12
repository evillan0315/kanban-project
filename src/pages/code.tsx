'use client'
import { CodeBlock } from "@/components/code-block";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Schema from "@mui/icons-material/Schema";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Terminal from "@mui/icons-material/Terminal";

import { useRouter } from "next/router";


export default function LandingPage() {
  const router = useRouter();
  const codeBlock = `import * as fs from "fs";
import * as path from "path";

/**
 * Represents an item in the file system (either a file or a directory).
 */
interface FileSystemItem {
  type: "directory" | "file";
  name: string;
  contents?: FileSystemItem[];
}

/**
 * Recursively generates a tree-like structure representing the contents of a directory.
 *
 * @param dirPath The path to the directory to process.
 * @param excludeFolders An array of folder names to exclude from the structure.
 * @returns A FileSystemItem object representing the directory structure.
 * @throws {Error} If an error occurs during directory traversal (e.g., directory not found, permission issues).  Consider removing the try/catch if you want calling function to handle it.
 */
export function getDirectoryStructure(
  dirPath: string,
  excludeFolders: string[] = []
): FileSystemItem {
  try {
    const stats = fs.statSync(dirPath);
    const item: FileSystemItem = {
      type: stats.isDirectory() ? "directory" : "file",
      name: path.basename(dirPath),
    };

    if (stats.isDirectory()) {
      const contents = fs.readdirSync(dirPath);

      const filteredContents = contents.filter(
        (child) => !excludeFolders.includes(child)
      );

      item.contents = filteredContents.map((child) =>
        getDirectoryStructure(path.join(dirPath, child), excludeFolders)
      );
    }

    return item;
  } catch (error) {

    // Return a default item or re-throw the error if you prefer
    return {
      type: "directory", // Or 'file' if you want a different default
      name: path.basename(dirPath),
      contents: [], // Or undefined if you don't want contents
    }; // Or throw error: throw error;
  }
}`;
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e1e2f, #111119)",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold">
            Dynamic Prisma Schema Manager
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, opacity: 0.8 }}>
            Effortlessly create, modify, and manage Prisma models with a GUI &
            interactive terminal.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4, px: 4, py: 1.5, fontSize: "1.2rem" }}
            onClick={() => router.push("/schema-editor")}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Image & Description Section */}
      <Container sx={{ py: 10 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid  size={{md: 6}}>
            <Box className="max-h-60 overflow-auto">
            <CodeBlock language="typescript" filename="utils/generateStructure.ts" code={codeBlock}/>
            </Box>
          </Grid>
          <Grid size={{md: 6}}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Why Choose Dynamic Prisma Schema Manager?
            </Typography>
            <Typography variant="body1">
              A powerful, user-friendly interface to handle your Prisma schemas
              dynamically. Modify and execute Prisma commands with ease, all
              within an intuitive UI.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid  size={{md: 4, sm: 6, xs: 12}}>
            <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
              <CardContent>
                <Schema sx={{ fontSize: 50, color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  Dynamic Schema Editing
                </Typography>
                <Typography variant="body2" mt={1}>
                  Add, update, and manage Prisma models effortlessly via an
                  intuitive UI.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{md: 4, sm: 6, xs: 12}}>
            <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
              <CardContent>
                <Terminal sx={{ fontSize: 50, color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  Interactive Terminal
                </Typography>
                <Typography variant="body2" mt={1}>
                  Execute Prisma commands (`migrate`, `db push`) directly from
                  the app.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{md: 4, sm: 6, xs: 12}}>
            <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
              <CardContent>
                <PlayArrow sx={{ fontSize: 50, color: "#1976d2" }} />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  Real-time Execution
                </Typography>
                <Typography variant="body2" mt={1}>
                  View live execution logs using Server-Sent Events (SSE).
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call-to-Action */}
      <Box sx={{ textAlign: "center", py: 6, background: "#f5f5f5" }}>
        <Typography variant="h5" fontWeight="bold">
          Ready to streamline your Prisma workflow?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1.2rem" }}
          onClick={() => router.push("/schema-editor")}
        >
          Get Started Now
        </Button>
      </Box>
    </Box>
  );
}
