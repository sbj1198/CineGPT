import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}

export default App;
