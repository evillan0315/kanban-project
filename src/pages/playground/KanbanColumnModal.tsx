/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

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

const DynamicFormDialog = ({ open, onClose, handleAddColumn }: { open: boolean; onClose: () => void, handleAddColumn: (data:any)=>void }) => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [schema, setSchema] = useState<Field[]>([]);

  useEffect(() => {
    fetch("/api/column?type=fields")
      .then((response) => response.json())
      .then((data) => setSchema(data))
      .catch((error) => console.error("Error fetching schema:", error));
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
        if(data.slug){
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
      handleAddColumn(result)
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              field.name === "color" ? (
                <div style={{ margin: "10px 0" }}>
                  <SketchPicker color={value || "#000000"} onChange={(color) => onChange(color.hex)} />
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
            )}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicFormDialog;
