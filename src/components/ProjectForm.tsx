import React, { useState } from "react";
import { Container, TextField, Select, MenuItem, Button, Typography, Grid, FormControl, InputLabel, Checkbox, FormControlLabel, Card, CardContent } from "@mui/material";

interface ProjectFormData {
  id: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  assignedTo: string[];
  budget: number;
  tags: string[];
  clientApproval: boolean;
  role: string;
}
const ProjectForm: React.FC = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    id: 0,
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "not_started",
    priority: "medium",
    assignedTo: [],
    budget: 0,
    tags: [],
    clientApproval: false,
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    e.preventDefault()
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Project Data Submitted:", formData);
  };

  return (
    <Container maxWidth="md" className="py-10 mt-4">
      <Typography variant="h4" gutterBottom>
        Create New Project
      </Typography>
     
      <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Project Name" name="projectName" value={formData.projectName} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={4} label="Description" name="description" value={formData.description} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="date" label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="date" label="End Date" name="endDate" value={formData.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={formData.status} onChange={()=>handleChange}>
                <MenuItem value="not_started">Not Started</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="on_hold">On Hold</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select name="priority" value={formData.priority as string} onChange={()=>handleChange}>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.clientApproval} onChange={(e) => setFormData((prev) => ({ ...prev, clientApproval: e.target.checked }))} />} label="Client Approval" />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </Grid>
        </Grid>
        </CardContent>
        </Card>
      </form>
     
    </Container>
  );
};

export default ProjectForm;
