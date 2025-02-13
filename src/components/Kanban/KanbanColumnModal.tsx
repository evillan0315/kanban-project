/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { DatePicker } from "@mui/x-date-pickers";

interface Attribute {
  name: string;
  args: any[];
}

interface Field {
  name: string;
  type: string;
  required: boolean;
  attributes: Attribute[];
}

interface FormData {
  [key: string]: string;
}
const options = {
  TaskPriority: ["Low", "Medium", "High", "Urgent"],
  TaskStatus: ["To Do", "In Progress", "Completed"],
  TaskTag: ["Bug", "Feature", "Research"],
};
const DynamicForm = ({
  open,
  onClose,
  handleAddColumn,
  model,
}: {
  open: boolean;
  onClose: () => void;
  handleAddColumn: (data: any) => void;
  model: string;
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { handleSubmit, reset } = useForm<FormData>();
  const [schema, setSchema] = useState<Field[]>([]);
  useEffect(() => {
    fetch(`/api/${model}?type=fields`)
      .then((response) => response.json())
      .then((data) => setSchema(data))
      .catch((error) => console.error("Error fetching schema:", error));
  }, [model]);
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const onSubmit = async (data: FormData) => {
    try {
      if (data.slug) {
        data.slug = data.name.toLowerCase().replace(/\s+/g, "-");
      }
      const response = await fetch("/api/column", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      //setColumn()
      const result = await response.json();
      console.log("Form submitted successfully", result);
      handleAddColumn(result);
      onClose();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Dynamic Form</DialogTitle>
      <DialogContent>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500, margin: "auto" }}>
      {schema.map((field) => {
        const isArray = field.type.endsWith("[]");

        if (isArray) {
          const fieldName = field.name;
          return (
            <FormControl key={fieldName} fullWidth>
              <InputLabel>{fieldName}</InputLabel>
              <Select
                multiple
                value={formData[fieldName] || []}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                input={<OutlinedInput label={fieldName} />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {options[fieldName as keyof typeof options]?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }

        if (field.type === "Int") {
          return (
            <TextField
              key={field.name}
              label={field.name}
              type="number"
              required={field.required}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              fullWidth
            />
          );
        }

        if (field.type === "String") {
          if (field.name === 'color') {
            return (
             <>
                    <SketchPicker
                      key={field.name}
                      color={formData[field.name] || "#000000"}
                      onChange={(color) => handleChange(field.name,color.hex)}
                    />
                  </>
            );
          }
          return (
            <TextField
              key={field.name}
              label={field.name}
              type="text"
              required={field.required}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              fullWidth
            />
          );
        }

        if (field.type === "DateTime") {
          return (
            <DatePicker
              key={field.name}
              label={field.name}
              value={formData[field.name] || null}
              onChange={(date) => handleChange(field.name, date)}
              slots={{ textField: (params) => <TextField {...params} /> }}
              //renderInput={(params) => <TextField {...params} fullWidth required={field.required} />}
            />
          );
        }
        
        return null;
      })}

      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Box>
    </DialogContent>
    </Dialog>
  );
};
const DynamicFormDialog = ({
  open,
  onClose,
  handleAddColumn,
  model,
}: {
  open: boolean;
  onClose: () => void;
  handleAddColumn: (data: any) => void;
  model: string;
}) => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [schema, setSchema] = useState<Field[]>([]);

  useEffect(() => {
    fetch(`/api/${model}?type=fields`)
      .then((response) => response.json())
      .then((data) => setSchema(data))
      .catch((error) => console.error("Error fetching schema:", error));
  }, [model]);

  const onSubmit = async (data: FormData) => {
    try {
      if (data.slug) {
        data.slug = data.name.toLowerCase().replace(/\s+/g, "-");
      }
      const response = await fetch("/api/column", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      //setColumn()
      const result = await response.json();
      console.log("Form submitted successfully", result);
      handleAddColumn(result);
      onClose();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Dynamic Form</DialogTitle>
      <DialogContent>
        {schema.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            defaultValue=""
            rules={{ required: field.required }}
            render={({ field: { onChange, value }, fieldState: { error } }) =>
              field.name === "color" ? (
                <div style={{ margin: "10px 0" }}>
                  <SketchPicker
                    color={value || "#000000"}
                    onChange={(color) => onChange(color.hex)}
                  />
                </div>
              ) : (
                <TextField
                  fullWidth
                  margin="dense"
                  label={field.name}
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? "This field is required" : ""}
                />
              )
            }
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicForm;
