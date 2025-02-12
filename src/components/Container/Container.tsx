import React, { forwardRef, RefObject, useState } from "react";
import { Handle, Remove } from "../Item";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, DragIndicator, Edit, Settings } from "@mui/icons-material";
import MoreVert from "@mui/icons-material/MoreVert";

export interface Props {
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

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,

      handleProps,
      //horizontal,
      // hover,
      onClick,
      onRemove,
      label,
      placeholder,
      //style,
      //scrollable,
      //shadow,
      //unstyled,
      ...props
    }: Props,
    ref
  ) => {
    const [anchorEl, setAnchorEl] = useState<
      (EventTarget & HTMLButtonElement) | null
    >(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const index = 1;
    const Component = onClick ? "button" : "div";

    function handleMove(index: number): void {
      console.log(index);
      throw new Error("Function not implemented.");
    }
    const handleEdit = (index: number) => {
      console.log(`Edit column ${index}`);
    };

    const handleSettings = (index: number) => {
      console.log(`Settings for column ${index}`);
    };

    function handleDelete(index: number): void {
      console.log(index);
      throw new Error("Function not implemented.");
    }
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
    return (
      <Box
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as RefObject<any>}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
        sx={{ width: 300, height: "auto", boxShadow: 3 }}
      >
        <Card key={index} {...props}>
          <CardHeader
            title={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {label ? (
                  <>
                    <Handle {...handleProps} />
                    <Typography variant="body2">{label}</Typography>
                  </>
                ) : null}
              </Box>
            }
            action={
              <>
                <IconButton onClick={(e) => handleMenuOpen(e, index)}>
                  <MoreVert />
                </IconButton>
              </>
            }
          />
          <CardContent>
            {placeholder ? children : <List>{children}</List>}
          </CardContent>
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
      </Box>
    );
  }
);
Container.displayName = "Container";
