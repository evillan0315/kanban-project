import React, { forwardRef, RefObject, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import DragIndicator from "@mui/icons-material/DragIndicator";
import MoreVert from "@mui/icons-material/MoreVert";
import { Edit, Settings } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import DynamicFormDialog from "./KanbanColumnModal";

export interface KanbanColumnsProps {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
}
export const KanbanHandle = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <IconButton
      ref={ref}
      data-cypress="draggable-handle"
      {...props}
      disableRipple
    >
      <DragIndicator />
    </IconButton>
  );
});
KanbanHandle.displayName = "KanbanHandle";
const KanbanColumn = forwardRef<HTMLDivElement, KanbanColumnsProps>(
  (
    {
      children,

      handleProps,
      //horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      //style,
      scrollable,
      //shadow,
      unstyled,
      ...props
    }: KanbanColumnsProps,
    ref
  ) => {
    if (!hover) {
      hover = false;
    }
    if (!unstyled) {
      unstyled = false;
    }
    if (!placeholder) {
      placeholder = false;
    }

    if (!scrollable) {
      scrollable = false;
    }
    const [anchorEl, setAnchorEl] = useState<
      (EventTarget & HTMLButtonElement) | null
    >(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    //const Component = onClick ? 'button' : 'div';
    // Handlers

    const handleEdit = (index: number) => {
      console.log(`Edit column ${index}`);
    };

    const handleSettings = (index: number) => {
      console.log(`Settings for column ${index}`);
    };

    const handleMenuOpen = (
      event: React.MouseEvent<HTMLButtonElement>,
      index: number
    ) => {
      setAnchorEl(event.currentTarget);
      setSelectedIndex(index);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setSelectedIndex(null);
    };
    const handleCreateItem = (column: string) => {
      console.log(`Create ${column}`);
    };
    const handleDialogClose = () => {

    }
    return (
      <Box
        {...props}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as RefObject<any>}
        tabIndex={onClick ? 0 : undefined}
        minWidth="300px"
        height={"100%"}
      >
        <Card variant="elevation" onClick={onClick} sx={{ height: "100%" }}>
          {label ? (
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <KanbanHandle {...handleProps} />
                  <Typography variant="h6">{label ? label : null}</Typography>
                </Box>
              }
              action={
                <IconButton onClick={(e) => handleMenuOpen(e, 0)}>
                  <MoreVert />
                </IconButton>
              }
            />
          ) : null}

          <CardContent>{children}</CardContent>
          {label ? (
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpen(true)}
              >
                Add Item
              </Button>
            </CardActions>
          ) : null}

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleEdit(selectedIndex!);
                handleMenuClose();
              }}
            >
              <Edit sx={{ mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleSettings(selectedIndex!);
                handleMenuClose();
              }}
            >
              <Settings sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={onRemove}>
              <Delete sx={{ mr: 1, color: "error.main" }} /> Delete
            </MenuItem>
          </Menu>
        </Card>
        <DynamicFormDialog open={open} onClose={handleDialogClose} handleAddColumn={handleCreateItem} model={"task"} />
      </Box>
    );
  }
);
KanbanColumn.displayName = "KanbanColumn";
export default KanbanColumn;
