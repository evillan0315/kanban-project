import { Button } from "@mui/material";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Terminal, Schema, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

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
          <Grid item xs={12} md={6}>
            <Image
              src="/dynamic-prisma-schema-manager.png"
              alt="Dynamic Prisma Schema Manager"
              width={500}
              height={300}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
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
