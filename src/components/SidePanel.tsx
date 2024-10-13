import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { HistoricalChart } from "./Chart"; // Make sure the path is correct

import BikeIcon from "../assets/sidepanel/bike.svg"; // Adjust the path accordingly
import DockIcon from "../assets/sidepanel/dock.svg"; // Adjust the path accordingly

interface SidePanelProps {
  isOpen: boolean;
  station: any;
  stationIndex: any;
  status: any;
  information: any
  closeSideBar: () => void;
}

const drawerWidth = 440;

export const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  station,
  stationIndex,
  status,
  information,
  closeSideBar,
}) => {
  const theme = useTheme();

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Box sx={{ display: "flex"  }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <DrawerHeader>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" component="div">
              {`Station Details: ${station?.address ?? "No Station Selected"}`}
            </Typography>
          </Box>
          <IconButton onClick={closeSideBar}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              text: `Bikes: ${status?.data?.stations[stationIndex]?.num_bikes_available ?? "N/A"}`,
              icon: (
                <img
                  src={BikeIcon}
                  alt="Bike"
                  width={24}
                  height={24}
                  style={{ filter: "brightness(0) saturate(100%) invert(0%)" }}
                />
              ),
            },
            {
              text: `Docks: ${status?.data?.stations[stationIndex]?.num_docks_available ?? "N/A"}`,
              icon: (
                <img
                  src={DockIcon}
                  alt="Dock"
                  width={24}
                  height={24}
                  style={{ filter: "brightness(0) saturate(100%) invert(0%)"}}
                />
              ),
            },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* Pass stationID only if station exists */}
        <Typography style={{ textAlign: 'center' }}><br/>Average Bcycle availability over time</Typography>
        {station && (
          <HistoricalChart
            stationID={station.station_id}
            widthPercent={60}
            heightPercent={80}
          />
        )}
      </Drawer>
      <Main open={isOpen}>
        <DrawerHeader />
      </Main>
    </Box>
  );
};
