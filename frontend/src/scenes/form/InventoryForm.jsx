import {
  Box,
  Button,
  Container,
  TextField,
  MenuItem,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Grid,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { mockAreaData } from "../../data/mockData";
import { useEffect, useState } from "react";
import { getAreaOptions } from "../../features/data/dataApi";
import { validateSignupData } from "../../utils/validators";
import { useTheme } from "@mui/material";
import { signup } from "../../features/auth/authApi";
import { authFail } from "../../features/auth/authSlice";
import PropTypes from "prop-types";
import { validateInventoryData } from "../../utils/validators";
import { setErrors, setInventories } from "../../features/data/dataSlice";
import { createInventory } from "../../features/data/dataApi";
import { SuffixData } from "../../data/mockData";
import { GenderData } from "../../data/mockData";
import { itemNameData } from "../../data/mockData";
import { itemCategoryData } from "../../data/mockData";
import { inventoryItemData } from "../../data/mockData";
import { inventoryRecordData } from "../../data/mockData";
import { businessUnitData } from "../../data/mockData";
import { recLossTypeData } from "../../data/mockData";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const InventoryForm = () => {
  const inventory = {};
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const { errors } = useSelector(({ data }) => data);
  const { user, area } = useSelector(({ auth }) => auth);
  const [contactData, setContactData] = useState({
    regCode: null,
    provCode: null,
    citymunCode: null,
    brgyCode: null,
  });
  const [regOptions, setRegOptions] = useState([]);
  const [provOptions, setProvOptions] = useState([]);
  const [cityMunOptions, setCityMunOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [activeCode, setActiveCode] = useState("");
  const [rnd, setRnd] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [created, setCreated] = useState(false);

  const handleFormSubmit = (e) => {
    console.log(e, "SUBBMIT");
    e.preventDefault();
    let { valid, errors: newErrors } = validateInventoryData(inventory);
    console.log(inventory, user, newErrors, "CLICKED");
    if (!valid) {
      dispatch(authFail({ errors: newErrors }));
      return;
    }

    dispatch(createInventory({inventory})).then((res) => {
      if (res) {
        setCreated(true);
      } else {
        setCreated(false);
      }
    });
  };

  const handleChanges = (prop) => (e) => {
    let newObj = { ...inventory, [prop]: e.target.value };
    let oldErrors = { ...errors };
    let { valid, errors: newErrors } = validateInventoryData(newObj);
    if (!valid) {
      oldErrors = { ...errors, [prop]: newErrors[prop] };
    } else {
      delete newErrors[prop];
      oldErrors = { ...errors, ...newErrors };
    }

    setRnd(Math.random());

    dispatch(setErrors(oldErrors));

    setInventories(newObj);
  };

  const handleArea = (areaType, val) => {
    let code = val ? val[areaType] : null;
    let type =
      areaType == "regions"
        ? "regions"
        : areaType == "regCode"
        ? "provinces"
        : areaType == "provCode"
        ? "citymuns"
        : areaType == "citymunCode"
        ? "brgies"
        : "";

    dispatch(getAreaOptions(type, code)).then((res) => {
      if (type == "regions") {
        setRegOptions(res);
      }
      if (type == "provinces") {
        setProvOptions(res);
      }
      if (type == "citymuns") {
        setCityMunOptions(res);
      }
      if (type == "brgies") {
        setBrgyOptions(res);
      }
    });
    dispatch(setErrors({ ...errors, userLevel: null }));
    setRnd(Math.random());
  };

  const handleRegions = () => {
    handleArea("regions", null);
    if (area.regCode) {
      handleArea("regCode", area);
    }
    if (area.provCode) {
      handleArea("provCode", area);
    }
    if (area.citymunCode) {
      handleArea("citymunCode", area);
    }
  };

  useEffect(() => {
    if (contactData.regCode) {
      handleRegions();
    }
  }, [contactData]);

  useEffect(() => {
    if (!created) {
      setContactData({
        regCode: area.regCode,
        provCode: area.provCode,
        citymunCode: area.citymunCode,
        brgyCode: area.brgyCode,
      });
    }
  }, [area, created]);

  console.log(area, contactData, "AREA");

  console.log(user, "oth")


  return (
    <Box m="10px">
      <Container component="main" maxWidth="md" sx={{ mt: 5 }}>
        <Header
          title="INVENTORY FORM"
          subtitle="Create a New inventory Record"
        />

        {created ? (
          <Box
            sx={{
              p: { xs: 1, md: 3 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            backgroundColor={colors.primary[400]}
          >
            <Typography variant="h3">New Record Created</Typography>
            <br />
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setContactData({
                  regCode: null,
                  provCode: null,
                  citymunCode: null,
                  brgyCode: null,
                });
                setCreated(false);
              }}
            >
              Create New Record
            </Button>
          </Box>
        ) : (
          <Box
            m="dense"
            sx={{
              p: { xs: 1, md: 3 },
            }}
            backgroundColor={colors.primary[400]}
          >
            <AppBar
              component="div"
              position="static"
              elevation={0}
              sx={{
                zIndex: 0,
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
              }}
            >
              <Tabs value={activeTab} textColor={colors.grey[100]}>
                <Tab
                  label="Direct Materials"
                  {...a11yProps(0)}
                  value={0}
                  onClick={() => setActiveTab(0)}
                />
                <Tab
                  label="Other Supplies"
                  disabled
                  {...a11yProps(1)}
                  value={1}
                  onClick={() => setActiveTab(1)}
                />
              </Tabs>
            </AppBar>
            <br />
            <form onSubmit={handleFormSubmit}>
              <Typography variant="h5" mb={2}>
                Direct Materials
              </Typography>

              <Grid
                container
                spacing={3}
                sx={{
                  p: { xs: 1 },
                }}
              >

                 {/* ITEM NAME FIELD */}

                <Grid item sm={12} xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    // type="text"
                    select
                    label="Inventory Item"
                    onChange={handleChanges("itemName")}
                    value={itemNameData.itemName}
                    name="itemName"
                    error={errors.itemName}
                    helperText={errors.itemName && errors.itemName}
                  >
                    {itemNameData.map((option, index) => (
                      <MenuItem key={option.value + index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                 {/* ITEM DESC FIELD */}

                <Grid item sm={12} xs={12} md={12}>
                  <TextField
                    fullWidth
                    disabled
                    variant="outlined"
                    type="text"
                    label="Item Description"
                    onChange={handleChanges("itemDesc")}
                    value={inventoryItemData.itemDesc}
                    name="itemDesc"
                    error={errors.itemDesc}
                    helperText={errors.itemDesc && errors.itemDesc}
                  >
                  </TextField>
                </Grid>

                {/* QTY SOLD FIELD */}

                <Grid item sm={12} xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    defaultValue={0}
                    label="Quantity Sold"
                    onChange={handleChanges("recSold")}
                    value={inventoryRecordData.recSold}
                    name="recSold"
                    error={errors.recSold}
                    helperText={errors.recSold && errors.recSold}
                  >
                  </TextField>
                </Grid>

                    {/* QTY PURCHASED FIELD */}

                    <Grid item sm={12} xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    defaultValue={0}
                    label="Quantity Purchased"
                    onChange={handleChanges("recPurchased")}
                    value={inventoryRecordData.recPurchased}
                    name="recPurchased"
                    error={errors.recPurchased}
                    helperText={errors.recPurchased && errors.recPurchased}
                  >
                  </TextField>
                </Grid>

                    {/* QTY TRANSFERRED FIELD */}

                <Grid item sm={12} xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    defaultValue={0}
                    label="Quantity Transferred"
                    onChange={handleChanges("rectransferred")}
                    value={contactData.rectransferred}
                    name="rectransferred"
                    error={errors.rectransferred}
                    helperText={errors.rectransferred && errors.rectransferred}
                  >
                  </TextField>
                </Grid>

                    {/* TO BRANCH FIELD */}

                <Grid item sm={12} xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    select
                    type="text"
                    label="To Branch"
                    onChange={handleChanges("recToBranch")}
                    value={inventoryRecordData.recToBranch}
                    name="recToBranch"
                    error={errors.recToBranch}
                    helperText={errors.recToBranch && errors.recToBranch}
                  >
                    {businessUnitData.map((option, index) => (
                      <MenuItem key={option.value + index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                    {/* QTY LOSS FIELD */}

                <Grid item sm={12} xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    defaultValue={0}
                    label="Quantity Loss"
                    onChange={handleChanges("suffix")}
                    value={inventoryRecordData.suffix}
                    name="suffix"
                    error={errors.suffix}
                    helperText={errors.suffix && errors.suffix}
                  ></TextField>
                </Grid>

                    {/* REC LOSS TYPE FIELD */}

                <Grid item sm={12} xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    variant="filled"
                    type="text"
                    label="Loss Type"
                    onChange={handleChanges("recLossType")}
                    value={inventoryRecordData.recLossType}
                    name="recLossType"
                    error={errors.recLossType}
                    helperText={errors.recLossType && errors.recLossType}
                  >
                    {recLossTypeData.map((option, index) => (
                      <MenuItem key={option.value + index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

              </Grid>

              <br />
              <br />

              <Typography variant="h5" mb={2}>
                Business Unit Details
              </Typography>

              <Grid
                container
                spacing={3}
                sx={{
                  p: { xs: 1 },
                }}
              >

                {/* USER NAME */}

                <Grid item sm={12} xs={12} md={6}>
                  <TextField
                    fullWidth
                    disabled
                    variant="outlined"
                    label="Username"
                    value={user.username}
                    name="username"
                    error={errors.username}
                    helperText={errors.username && errors.username}
                  >
                  </TextField>
                </Grid>

                {/* BRANCH NAME */}

                <Grid item sm={12} xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    variant="outlined"
                    label="Branch Name"
                    onChange={handleChanges("businessUnitName")}
                    value={businessUnitData.businessUnitName}
                    name="businessUnitName"
                    error={errors.businessUnitName}
                    helperText={errors.businessUnitName && errors.businessUnitName}
                  >
                    {businessUnitData.map((option, index) => (
                      <MenuItem
                        key={option.businessUnitName + index}
                        value={option.businessUnitName}
                        onClick={() => handleArea("businessUnitName", option)}
                      >
                        {option.businessUnitName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>


              </Grid>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default InventoryForm;
