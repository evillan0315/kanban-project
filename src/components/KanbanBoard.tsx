'use client'
import React, { useRef, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {loading} from "@/hooks/useLoading"
import { motion } from "framer-motion";
import MiniDrawer from "./MiniDrawer";
import Chip from '@mui/material/Chip';
import { SessionProvider, useSession } from "next-auth/react";
interface Task {
  id: string;
  content: string;
  column_id: string;
}

interface Column {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const initialData = [
  {
    id: "draft",
    icon: "IconDraft",
    title: "Draft",
    desc: "",
    color: "inherit"
  },
  {
    id: "todo",
    icon: "IconTodo",
    title: "To Do",
    desc: "",
    color: "secondary"
  },
  {
    id: "inProgress",
    icon: "IconProgress",
    desc: "",
    title: "In Progress",
    color: "info"
  },
  {
    id: "done",
    icon: "IconDone",
    desc: "",
    title: "Done",
    color: "success"
  },
];
const taskCard = [
  { id: "task-3", content: " Kanban  UI", column_id: "todo" },
  { id: "task-1", content: " Done  UI", column_id: "done" },
  { id: "task-11", content: " Draft  UI", column_id: "draft" },
  { id: "task-10", content: "Design Kanban Board UI", column_id: "inProgress" },
  { id: "task-6", content: "Board UI", column_id: "inProgress" },
];
export default function KanbanBoard() {
const {data: session} = useSession()
  const drop = useRef<HTMLDivElement>(null);
  const [columns] = useState<Column[]>(initialData);
  const [cards, setCards] = useState<Task[]>(taskCard);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [dragElement, setdDragElement] = useState<{
    c_id: string;
    p_id: string;
  } | null>(null);
  function onDragCard(id: string, p_id: string) {
    setdDragElement({ c_id: id, p_id });
  }
  function onDropCard(id: string) {
    if (dragElement?.c_id) {
      setCards([
        ...cards.map((item) => {
          if (dragElement.c_id === item.id) {
            item.column_id = id; // ✅ Move the dragged card to the new column
          }

          return item; // ✅ Ensure all other items are returned unchanged
        }),
      ]);
    }
  }
  const handleCreateItem = (item: string) => {
    taskCard.push(item)
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Box sx={{ display: "flex", gap: 1,  }}>
          {columns.map((c, idx) => (
              <>
            <motion.div
            key={idx}
            initial={{ opacity: .8, y: 8 }}
            animate={{
              opacity: hoveredCard === c.id ? 1 : .8,
              y: hoveredCard === c.id ? 0 : 8,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <Card
              shadowLg
              className="relative"
              variant="elevation"
              key={c.id}
              
              sx={{ p: 2, minWidth: 340, width: "100%", transition: "all 0.3s ease-in-out" }}
              onMouseEnter={() => setHoveredCard(c.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Typography variant="h4" >
                {c.title}
              </Typography>
              <Typography variant="subtitle" >
                {c.desc}
              </Typography>
              <Box
               color="primary"
                sx={{ width: "100%", overflow: "auto", height: "100%" }}
                ref={drop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={() => onDropCard(c.id)}
              >
                <Box>
                  {cards.map((card: Task, idx: number) => (
                    <>
                      {c.id === card.column_id && (
                        <Box key={idx}>
                          <motion.div
                            key={idx}
                            draggable
                            onDrag={() => onDragCard(card.id, card.column_id)}
                            dragConstraints={{
                              top: 0,
                              bottom: 0,
                              left: 0,
                              right: 0,
                            }}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={() => setIsDragging(false)}
                            animate={{
                              opacity: isDragging ? 0.5 : 1,
                              scale: isDragging ? 0.95 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card variant="outlined" boxShadow sx={{ p: 2, mb: 1 }}>
                              <Typography variant="body2" marginBottom={1}>
                                <Link href="#" title={card.id} color="inherit" fontSize={12} underline={"none"}>
                                {card.content}
                                </Link>
                                
                              </Typography>
                              <div>
      <Chip size="sm" variant="elevation" label={c.id}/>
    </div>
                      
                            </Card>
                          </motion.div>
                        </Box>
                      )}
                    </>
                  ))}
                </Box>
              </Box>
              {/* Create Item Button */}
              <Box sx={{ display: "flex", justifyContent: "left" }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredCard === c.id ? 1 : 0,
                    y: hoveredCard === c.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
            
                  }}
                >
                  {hoveredCard === c.id && (
                  <MiniDrawer open={open} task={c.id} onCreate={handleCreateItem} />
                    
                    
                  )}
                 
                </motion.div>
              </Box>
            </Card>
         </motion.div>
       </>
          ))}
        </Box>
         
      </DndProvider>
      
    </>
  );
}
