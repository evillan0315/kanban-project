import React  from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Kanban from "@/components/Kanban";


export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        p: 3,
        justifyContent: "bottom", // Center content horizontally
        alignItems: "stretch", // Center content vertically
        height: "100vh", // Full viewport height
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="bottom" // Center horizontally
        alignItems="stretch" // Center vertically
      >
        <Kanban />
      </Grid>
    </Box>
  );
}
