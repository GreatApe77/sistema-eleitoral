import { useMediaQuery } from "@mui/material";
import { DashboardDesktop } from "../components/DashboardDesktop";
import { DashboardMobile } from "../components/DashboardMobile";

export  function Dashboard() {
  const isLargeScreen = useMediaQuery('(min-width:600px)');
  return (
    <>
      {
        isLargeScreen?
        <DashboardDesktop/>
        :
      <>
        <DashboardMobile/>
      </>
      }
      </>
  )
}
