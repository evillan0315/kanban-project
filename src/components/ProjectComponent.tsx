import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import styled from "styled-components";

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const projects: Project[] = [
  { id: 1, name: "Apollo", description: "A space exploration project.", startDate: "2023-01-01T00:00:00Z", endDate: "2023-12-31T00:00:00Z" },
  { id: 2, name: "Beacon", description: "Developing advanced navigation systems.", startDate: "2023-02-01T00:00:00Z", endDate: "2023-10-15T00:00:00Z" },
  { id: 3, name: "Catalyst", description: "A project to boost renewable energy use.", startDate: "2023-03-05T00:00:00Z", endDate: "2024-03-05T00:00:00Z" },
  { id: 4, name: "Delta", description: "Delta project for new software development techniques.", startDate: "2023-01-20T00:00:00Z", endDate: "2023-09-20T00:00:00Z" },
  { id: 5, name: "Echo", description: "Echo project focused on AI advancements.", startDate: "2023-04-15T00:00:00Z", endDate: "2023-11-30T00:00:00Z" },
  { id: 6, name: "Foxtrot", description: "Exploring cutting-edge biotechnology.", startDate: "2023-02-25T00:00:00Z", endDate: "2023-08-25T00:00:00Z" },
  { id: 7, name: "Golf", description: "Development of new golf equipment using AI.", startDate: "2023-05-10T00:00:00Z", endDate: "2023-12-10T00:00:00Z" },
  { id: 8, name: "Hotel", description: "Hotel management system overhaul.", startDate: "2023-03-01T00:00:00Z", endDate: "2024-01-01T00:00:00Z" },
  { id: 9, name: "India", description: "Telecommunication infrastructure upgrade.", startDate: "2023-06-01T00:00:00Z", endDate: "2023-12-01T00:00:00Z" },
  { id: 10, name: "Juliet", description: "Initiative to enhance cyber-security measures.", startDate: "2023-07-01T00:00:00Z", endDate: "2024-02-01T00:00:00Z" }
];

const StyledCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProjectGrid: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {project.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {project.description}
              </Typography>
              <Typography variant="caption" display="block" marginTop={1}>
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectGrid;
