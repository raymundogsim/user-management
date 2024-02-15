import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PostAddIcon from '@mui/icons-material/PostAdd';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "features/auth/authSlice";
import { logoutUser } from "features/auth/authApi";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      {to && <Link to={to} />}
    </MenuItem>
  );
};

const Sidebar = ({isCollapsed, setIsCollapsed}) => {
  const { user, profile } = useSelector(({auth}) => auth)
  const dispatch = useDispatch()
  const theme = useTheme();
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  const handleLogout = () => {
  
    console.log('Logout')
    dispatch(logoutUser())
    .then(() => {
        navigate('/signin')
    })
    
  }
  
  

  let coordPos = user.userLevel === 'regCode' ? 'Proprietor' : user.userLevel === 'provCode' ? 'Inventory Controller' : user.userLevel === 'Admin Staff' ? 'City/Municipality Leader' : 'Crew';
  let coordArea = profile ? (user.userLevel === 'regCode' ? `${profile.regDesc}` : user.userLevel === 'provCode' ? `${profile.provDesc}` : user.userLevel === 'citymunCode' ? `${profile.citymunDesc}, ${profile.provDesc}` : `${profile.brgyDesc}, ${profile.citymunDesc}`) : '';

  


  return (
    <Box
      sx={{
        overflowX: 'hidden',
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          alignItems: "center",
          justifyContent: "space-between",
          height: "93vh",
          width: "100%"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={false}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          {!isCollapsed && (
            <Box mb="50px">
            {profile && 
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                 {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                 {coordPos}
                </Typography>
                <Typography variant="caption" color={colors.greenAccent[200]}>
                 {/* {coordArea} */}
                </Typography>
              </Box>
              </>              } 
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>

            <Item
              disabled
              title="Admin Dashboard"
              to="/dashboard"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
       
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >

              Data
            </Typography>
            {user.userLevel != 'brgyCode' && 
            <Item
              title="Manage Team"
              to="/dashboard/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            }
            <Item
              title="Inventory Record"
              to="/dashboard/inventory"
              icon={<WarehouseIcon />}
              selected={selected}
              setSelected={setSelected}
            />
        {/*   <Item
              title="Invoices Balances"
              to="/dashboard/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >

              Forms
            </Typography>
            {user.userLevel != 'brgyCode' && 
            <Item
              title="User Form"
              to="/dashboard/user-form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />}
            <Item
              title="Inventory Form"
              to="/dashboard/inventory-form"
              icon={<PostAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           {/* <Item
              title="Contact Form"
              to="/dashboard/contact-form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Calendar"
              to="/dashboard/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/dashboard/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
                <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >

            Exit
            </Typography>
            <Item
              title="Logout"
              icon={<ExitToAppIcon />}
              setSelected={handleLogout}
            />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
