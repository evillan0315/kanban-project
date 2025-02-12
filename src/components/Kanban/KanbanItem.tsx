import React, { useEffect } from "react";
import classNames from "classnames";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

import { KanbanHandle } from "./KanbanColumn";
import styles from "@/styles/Item.module.scss";
import { Box, Card, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export interface KanbanItemProps {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: KanbanItemProps["transform"];
    transition: KanbanItemProps["transition"];
    value: KanbanItemProps["value"];
  }): React.ReactElement;
}

const KanbanItem = React.memo(
  React.forwardRef<HTMLLIElement, KanbanItemProps>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        wrapperStyle,
        value,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <Card variant="outlined" className={classNames(fadeIn && "fadeIn")}>
          <Box
            className={classNames(
              styles.Wrapper,
              fadeIn && styles.fadeIn,
              sorting && styles.sorting,
              dragOverlay && styles.dragOverlay
            )}
            ref={ref}
            style={
              {
                ...wrapperStyle,
                transition: [transition, wrapperStyle?.transition]
                  .filter(Boolean)
                  .join(", "),
                "--translate-x": transform
                  ? `${Math.round(transform.x)}px`
                  : undefined,
                "--translate-y": transform
                  ? `${Math.round(transform.y)}px`
                  : undefined,
                "--scale-x": transform?.scaleX
                  ? `${transform.scaleX}`
                  : undefined,
                "--scale-y": transform?.scaleY
                  ? `${transform.scaleY}`
                  : undefined,
                "--index": index,
                "--color": color,
              } as React.CSSProperties
            }
          >
            <Box
              className={classNames(
                styles.Item,
                dragging && styles.dragging,
                handle && styles.withHandle,
                dragOverlay && styles.dragOverlay,
                disabled && styles.disabled,
                color && styles.color
              )}
              style={style}
              data-cypress="draggable-item"
              {...(!handle ? listeners : undefined)}
              {...props}
              tabIndex={!handle ? 0 : undefined}
            >
              {value} {/* ✅ Ensure value is rendered */}
              <Box>
                {onRemove ? (
                  <IconButton onClick={onRemove}>
                    <Delete />
                  </IconButton>
                ) : null}
                {handle ? (
                  <KanbanHandle {...handleProps} {...listeners} />
                ) : null}
              </Box>
            </Box>
          </Box>
        </Card>
      );
    }
  )
);
export default KanbanItem;
