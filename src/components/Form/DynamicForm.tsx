import React, { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useLoading } from "@/hooks/useLoading";


interface Field {
  name: string;
  type: string;
}

interface DynamicFormProps {
    model?:string;
    fields?: Field[];
  onSubmit: (values: Record<string, string | number | null>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ model, fields, onSubmit }) => {
  
  const [formData, setFormData] = React.useState<Record<string, string | number | null>>({});
  const [hasFields, setHasFields] = useState<Field[]>(fields||[]);
  const { setLoading} = useLoading();
    useEffect(() => {
        const fetchProjects = async () => {
          try {
            setLoading(true)
            const response = await fetch(`/api/${model}?type=fields`);
            const data = await response.json();
            setLoading(false)
            // Dynamically generate columns from data keys
            if (data.length > 0) {
                setHasFields(data);
            
            }
          } catch (error) {
            console.error("Error fetching projects:", error);
          }
        };
    
        fetchProjects();
      }, [model, setLoading]);
  const handleChange = (name: string, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2,width: "100%", marginTop:5 }}>
        {hasFields && hasFields?.map((field) => (
          
          <React.Fragment key={field?.name}>
            {field.type === "String" && (
              <TextField
              label={`Enter ${field.name}`}
              name={`${field.name}`}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                fullWidth
              />
            )}
            {field.type === "Int" && (
              <TextField
                label={`Enter ${field.name}`}
                name={`${field.name}`}
                type="number"
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, Number(e.target.value))}
                fullWidth
              />
            )}
            {field.type === "DateTime" && (
              <DatePicker
                label={field.name}
                value={formData[field.name] ? dayjs(formData[field.name] as string) : null}
                onChange={(date: Dayjs | null) => handleChange(field.name, date ? date.toISOString() : null)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            )}
          </React.Fragment>
        ))}
        {hasFields&&<Button type="submit" variant="contained" color="primary">
          Submit
        </Button>}
      
        
      </Box>
    </LocalizationProvider>
  );
};

export default DynamicForm;
