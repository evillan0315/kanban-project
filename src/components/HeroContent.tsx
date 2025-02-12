import { Container, Box, Typography, Button } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import Image from "next/image"
type Props = {
    handleScroll?: ()=> void;
}

const HeroContent:React.FC<Props> = ({handleScroll}) => {

  return (
    <Container
 
    maxWidth="lg"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 4,
    }}
  >
    {/* Left Side: Text */}
    <Box sx={{ maxWidth: "50%" }}>
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", lineHeight: 1.2, color: "white" }}>
          Build <br />
          Scalable <br /> & Modern <br /> Applications
        </Typography>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <Typography variant="body1" sx={{ my: 3, color: "#d1d5db" }}>
          I specialize in building dynamic, scalable, and high-performance web applications.
          From intuitive frontends to powerful backends, my full-stack expertise ensures
          seamless functionality, modern design, and future-ready solutions tailored to your needs.
        </Typography>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Button
          variant="contained"
          sx={{
            mr: 2,
            backgroundColor: "#ffffff",
            color: "#2e3436",
            fontWeight: "bold",
            transition: "0.3s ease",
            "&:hover": {
              backgroundColor: "#d1d5db",
              transform: "scale(1.05)",
            },
          }}
          onClick={handleScroll}
        >
          View Projects
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#ffffff",
            color: "#ffffff",
            fontWeight: "bold",
            transition: "0.3s ease",
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#2e3436",
              transform: "scale(1.05)",
            },
          }}
          onClick={handleScroll}
        >
          Resume
        </Button>
      </motion.div>
    </Box>

    {/* Right Side: Image */}
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
      <Image
        src="https://raw.githubusercontent.com/evillan0315/portfolio/refs/heads/master/github-project-screen.png"
        alt="Project Preview"
        width={500}
        height={400}
        style={{
          borderRadius: "8px",
          boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          border: "2px solid white",
        }}
      />
    </motion.div>
  </Container>
  )
}

export default HeroContent