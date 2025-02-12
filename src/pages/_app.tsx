import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  IconButton,
  Divider,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Paper,
 
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
//import Brightness4Icon from "@mui/icons-material/Brightness4";
//import Brightness7Icon from "@mui/icons-material/Brightness7";
import { SessionProvider } from "next-auth/react";
import SEOHead from "@/components/SEOHead";
import { lightTheme, darkTheme } from "@/theme";
import { useState, useEffect } from "react";
import { LoadingProvider } from "@/hooks/useLoading";
import GlobalLoader from "@/components/GlobalLoader";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  ApiRounded,
  ChevronLeftTwoTone,
  ViewKanbanRounded,
} from "@mui/icons-material";
import {
  IconBook2,
  IconBuildings,
  IconLayoutKanban,
  IconSettingsCog,
  IconTableColumn,
} from "@tabler/icons-react";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,

        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <SEOHead />

      {children}
    </React.Fragment>
  );
}
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) setThemeMode(storedTheme);
  }, []);

  return (
    <SessionProvider session={session}>
      <LoadingProvider hasSession={session}>
        {" "}
        {/* ✅ Wrap everything inside LoadingProvider */}
        <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
          <CssBaseline />
          <GlobalLoader />

          <AppLayout>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AppBar sx={{ p: 0 }} variant="elevation">
                <Toolbar>
                  <IconButton
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                      {
                        mr: 2,
                      },
                      open && { display: "none" },
                    ]}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                    Project Management
                  </Typography>

                  {/* preview-start */}

                  {/* preview-end */}
                </Toolbar>
              </AppBar>
              {/* Sidebar Drawer */}
              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                      <ChevronLeftIcon />
                    ) : (
                      <ChevronLeftTwoTone />
                    )}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  {["Projects", "Board", "Table"].map((text, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {text === "Projects" && <IconLayoutKanban />}
                          {text === "Board" && <ViewKanbanRounded />}
                          {text === "Table" && <IconTableColumn />}
                          {text === "Integrations" && <ApiRounded />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {["Organizations", "Settings", "Documentations"].map(
                    (text, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            {text === "Organizations" && <IconBuildings />}
                            {text === "Settings" && <IconSettingsCog />}
                            {text === "Documentations" && <IconBook2 />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    )
                  )}
                </List>
              </Drawer>

              {/* Main Content */}
              <Paper
                component="main"
                sx={{
                  marginTop: 7,
                  padding:4,
                  background:
                    themeMode === "dark"
                      ? "linear-gradient(to bottom, #000002, #001011)"
                      : "#100001",
                  color: themeMode === "dark" ? "white" : "",
                  flexGrow: 1,
                  height: "100vh",
                  overflow: "hidden",
                }}
              >
              
                <Component {...pageProps} />
                
              </Paper>
            </Box>
          </AppLayout>
        </ThemeProvider>
      </LoadingProvider>
    </SessionProvider>
  );
}
