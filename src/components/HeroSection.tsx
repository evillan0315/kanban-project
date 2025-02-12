/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, Button, Typography, IconButton, Drawer, TextField, Grid, List, ListItem, ListItemText } from "@mui/material";


import React, { useState, useEffect } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import AddIcon from "@mui/icons-material/Add";
import HeroContent from "@/components/HeroContent";

interface HeroSectionProps {
  section: object;
  refs: Record<string, React.RefObject<HTMLDivElement>>;
  activeSection: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ refs, activeSection }) => {
  const handleScroll = (section: string) => {
    refs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"edit" | "add">("add");
  const [sectionName, setSectionName] = useState(""); // State for section name
  const [sectionProps, setSectionProps] = useState(""); // State for section properties
  const [sections, setSections] = useState<[]>([]); // List of sections
  const [loading, setLoading] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

  // Fetch sections on initial load
  const fetchSections = async () => {
    try {
      const response = await fetch("/api/section?model=section");
      const result = await response.json();
      setSections(result); // Set the sections array to the fetched sections
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  useEffect(() => {
    //fetchSections(); // Fetch sections when component mounts
  }, []);

  // Handle form submission for adding a new section
  const handleAddSection = async () => {
    if (!sectionName || !sectionProps) return;

    setLoading(true);

    try {
      const response = await fetch("/api/section?model=section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: sectionName,
          props: { content: sectionProps },
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Section added successfully!");
        fetchSections(); // Fetch sections after a new section is added
        setDrawerOpen(false); // Close the drawer
      } else {
        alert(result.error || "Failed to add section.");
      }
    } catch (error) {
      console.error("Error adding section:", error);
      alert("An error occurred while adding the section.");
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting a section to edit
  const handleEditSection = async () => {
    if (!currentSectionId || !sectionName || !sectionProps) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/section?model=section`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentSectionId,
          name: sectionName,
          props: { content: sectionProps },
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Section updated successfully!");
        fetchSections(); // Fetch sections after update
        setDrawerOpen(false); // Close the drawer
      } else {
        alert(result.error || "Failed to update section.");
      }
    } catch (error) {
      console.error("Error editing section:", error);
      alert("An error occurred while editing the section.");
    } finally {
      setLoading(false);
    }
  };

  // Background gradient state (changes dynamically based on active section)
  const [background, setBackground] = useState("linear-gradient(135deg, #2e3436 30%, #474f51 100%)");

  useEffect(() => {
    const backgrounds: Record<string, string> = {
      Home: "linear-gradient(135deg, #2e3436 30%, #474f51 100%)",
      Experience: "linear-gradient(135deg, #2b2e4a 30%, #4b4e6a 100%)",
      Skillset: "linear-gradient(135deg, #0d2f50 30%, #1d4e89 100%)",
    };

    setBackground(backgrounds[activeSection] || backgrounds["Home"]);
  }, [activeSection]);

  return (
    <>
      {activeSection === "Projects" ? (

          <HeroContent handleScroll={()=>handleScroll} />
 
      ) : (
        <Box
          sx={{
            background,
            transition: "background 1s ease-in-out",
            color: "white",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
          }}
        >
          <HeroContent handleScroll={()=>handleScroll} />
        </Box>
      )}

      {/* More Options Button */}
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "white" }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Right Drawer for Add/Edit Content */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ width: 400 }}
      >
        <Box sx={{ width: 400, padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {drawerMode === "add" ? "Add New Section Content" : "Edit Section Content"}
          </Typography>

          {/* Select Section to Edit */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Select Section to Edit</Typography>
              <List>
                {sections.map((section: any) => (
                  <ListItem
                 
                    key={section?.id}
                    onClick={() => {
                      setCurrentSectionId(section.id);
                      setSectionName(section.name);
                      setSectionProps(section.props.content);
                      setDrawerMode("edit"); // Switch to "edit" mode when a section is selected
                    }}
                  >
                    <ListItemText primary={section.name} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Section Form */}
            <Grid item xs={12}>
              <TextField
                label="Section Name"
                variant="outlined"
                fullWidth
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Section Content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={sectionProps}
                onChange={(e) => setSectionProps(e.target.value)}
                sx={{ marginBottom: 2 }}
              />

              <Button
                variant="contained"
                sx={{ width: "100%" }}
                startIcon={<AddIcon />}
                onClick={drawerMode === "add" ? handleAddSection : handleEditSection}
                disabled={loading}
              >
                {loading ? "Saving..." : drawerMode === "add" ? "Add Content" : "Save Changes"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};



export default HeroSection;
