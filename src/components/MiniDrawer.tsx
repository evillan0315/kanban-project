import React, { useState } from "react";
import { Drawer, TextField, Button } from "@mui/material";

type MiniDrawerProps = {
  task: string;
  onCreate: (item: string) => void;
};
interface Task {
  id: string;
  content: string;
  column_id: string;
}
const MiniDrawer: React.FC<MiniDrawerProps> = ({ task, onCreate }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      const d = {
      	id: Date.now(),
      	content: inputValue.trim(),
      	column_id: task
      }
      onCreate(d);
      setInputValue("");
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
        size="md"
        sx={{position: "absolute", bottom: 10, left: 10, width: 140, zIndex:20}}
      >
        Add Item
      </Button>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: { height: "auto", padding: "4px", background: "#001011" } }}
      >
        <TextField
          
          fullWidth
          autoFocus
          placeholder={`Start typing to add a quick ${task}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          color="secondary"
        />
      </Drawer>
    </>
  );
};

export default MiniDrawer;
