import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import DynamicForm from "@/components/Form/DynamicForm";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useLoading } from "@/hooks/useLoading";
import { Close } from "@mui/icons-material";
/* 
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
} */
interface Field {
  name: string;
  type: string;
}
interface ModelPageProps {
  model: string;
  fields: Field[];
}

const ModelPage: React.FC<ModelPageProps> = ({ model, fields }) => {
  //const [formData, setFormData] = useState<ProjectFormData>(generateMockData(1)[0]);
  const [open, setOpen] = useState(false);
  // Access URL param
  const { setLoading } = useLoading();

  const [hasModel, setHasModel] = useState<[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  // Fetch data
  useEffect(() => {
    const fetchModel = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/${model}`);
        const data = await response.json();
        setLoading(false);
        setHasModel(data);

        // Dynamically generate columns from data keys
        if (data.length > 0) {
          const generatedColumns: GridColDef[] = Object.keys(data[0]).map(
            (key) => ({
              field: key,
              headerName: key.charAt(0).toUpperCase() + key.slice(1),
              flex: 1,
            })
          );
          setColumns(generatedColumns);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchModel();
  }, [model, setLoading]);

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 2 }}
      >
        <Typography variant="h5" className="uppercase">
          {model} List
        </Typography>

        {fields && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{}}

          >
            Add New {model}
          </Button>
        )}
      </Box>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={hasModel}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      {/* Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400, p: 3 }}>
          <IconButton onClick={() => setOpen(false)} sx={{ float: "right" }}>
            <Close />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            New {model}
          </Typography>
          <DynamicForm model={model} onSubmit={() => setOpen(false)} />
        </Box>
      </Drawer>
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions); // Get session for the request
  if (!session) {
    throw new Error(`Unauthorize`);
  }
  const { model } = context.params as { model: string };
  console.log(model, "model getServerSideProps");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${model}?type=fields`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const fields = await response.json();
    console.log(fields, "fields getServerSideProps");
    return {
      props: {
        model,
        fields,
      },
    };
  } catch (error) {
    console.error("Error fetching fields:", error);

    return {
      props: {
        model,
        fields: [],
      },
    };
  }
};

export default ModelPage;
