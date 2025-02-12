import React, { forwardRef, CSSProperties } from "react";
import { Button, ButtonProps, IconButton } from "@mui/material";

export interface KanbanButtonProps extends ButtonProps {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
  variantType?: "primary" | "secondary"; // Custom styling variant
  icon?: boolean; // Determines whether to render an IconButton or Button
}

export const Action = forwardRef<HTMLButtonElement, KanbanButtonProps>(
  ({ active, className, cursor, variantType, style, icon, ...props }, ref) => {
    const commonStyles = {

      textTransform: "none",
      cursor: cursor || "pointer",
      backgroundColor: active?.background || "transparent",
      color: active?.fill || "inherit",
      "&:hover": {
        backgroundColor: active ? active.background : "rgba(0, 0, 0, 0.04)",
      },
    };

    if (icon) {
      return (
        <IconButton className={className} style={style} ref={ref} {...props} sx={commonStyles} />
      );
    }

    return (
      <Button className={className} style={style} ref={ref} {...props} sx={commonStyles} variant={variantType === "primary" ? "contained" : "outlined"} />
    );
  }
);

Action.displayName = "Action";
