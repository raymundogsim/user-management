import { Box, Button, Container, TextField, MenuItem, AppBar, Tabs, Tab, Typography, Grid } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { mockAreaData } from "data/mockData";
import { useEffect, useState } from "react";
import { getAreaOptions } from "features/data/dataApi";
import { validateSignupData } from "utils/validators";
import { useTheme } from "@mui/material";
import { signup } from "features/auth/authApi";
import { authFail } from "features/auth/authSlice";
import PropTypes from 'prop-types';
import { validateContactData } from "utils/validators";
import { setErrors } from "features/data/dataSlice";
import { createContactInformation } from "features/data/dataApi";
import { SuffixData } from "data/mockData";
import { GenderData } from "data/mockData";
import { CivilStatusData } from "data/mockData";


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
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




const ContactForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const {  errors } = useSelector(({data}) => data);
  const { user, area } = useSelector(({auth}) => auth);
  const [contactData, setContactData] = useState({
    regCode: null,
    provCode: null,
    citymunCode: null,
    brgyCode: null
  });
  const [regOptions, setRegOptions] = useState([]);
  const [provOptions, setProvOptions] = useState([]);
  const [cityMunOptions, setCityMunOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [activeCode, setActiveCode] = useState('');
  const [rnd, setRnd] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [created, setCreated] = useState(false);

  
  const handleFormSubmit = (e) => {
  console.log(e, 'SUBBMIT');
    e.preventDefault();
    let { valid, errors: newErrors } = validateContactData(contactData);
    console.log(contactData, user, newErrors, 'CLICKED')
    if(!valid){
      dispatch(authFail({errors: newErrors}));
      return ;
    }
    
    
    dispatch(createContactInformation(contactData))
    .then(res => {
     if(res){
      setCreated(true)
     } else {
      setCreated(false)

     }
   
    });
  };

  const handleChanges = prop => (e) => {
  let newObj = {...contactData, [prop]: e.target.value}
  let oldErrors = {...errors}
    let { valid, errors: newErrors } = validateContactData(newObj);
    if(!valid){
      oldErrors = {...errors,[prop]: newErrors[prop]};
    } else {
      delete newErrors[prop];
      oldErrors = {...errors, ...newErrors}
    
    }
    
    
    setRnd(Math.random())
  
    dispatch(setErrors(oldErrors));

    setContactData(newObj);
    
  }
  
  
  
  const handleArea = (areaType, val) => {
      let code = val ? val[areaType] : null;
      let type = areaType == 'regions' ? 'regions': areaType == 'regCode' ? 'provinces' : areaType == 'provCode' ? 'citymuns' : areaType == 'citymunCode' ? 'brgies' : '';  
      
      dispatch(getAreaOptions(type, code))
      .then(res => {
          if(type == 'regions'){
            setRegOptions(res)
          }
          if(type == 'provinces'){
            setProvOptions(res);
          }
          if(type == 'citymuns'){
            setCityMunOptions(res)

          }
          if(type == 'brgies'){
            setBrgyOptions(res)
          }
      })
      dispatch(setErrors({...errors, userLevel: null}));
      setRnd(Math.random())

  }
  
  
const handleRegions =  () => {

    handleArea('regions', null)
  if(area.regCode){
    handleArea('regCode', area)
  }
  if(area.provCode){
    handleArea('provCode', area)
  }
  if(area.citymunCode){
    handleArea('citymunCode', area)
  }
}




useEffect(() => {
  if(contactData.regCode){
    handleRegions()
  }
}, [contactData])


useEffect(() => {
  if(!created){
    setContactData({regCode: area.regCode, provCode: area.provCode, citymunCode: area.citymunCode, brgyCode: area.brgyCode})
  }
}, [area, created])

  console.log( area, contactData, 'AREA')

  return (
    <Box m="10px">
          <Container component="main" maxWidth="md" sx={{mt: 5 }}>
          <Header title="CREATE CONTACT" subtitle="Create a New Contact Information" />
      
      {created ? 
      <Box
      sx={{
        p: { xs: 1,  md: 3},
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
      backgroundColor={colors.primary[400]}
    >
    <Typography variant="h3">
    New User Created
    </Typography>
    <br/>
    <Button color="secondary" variant="contained" onClick={() => {
      setContactData({regCode: null, provCode: null, citymunCode: null, brgyCode: null})
    setCreated(false)
    }}>
                Create New
              </Button>
    </Box>
    :
      <Box
        sx={{
          p: { xs: 1,  md: 3},
        }}
        backgroundColor={colors.primary[400]}
      >
     <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0,
        backgroundColor: colors.primary[400],
        color: colors.grey[100]
      }}   
        >
        <Tabs value={activeTab} textColor={colors.grey[100]}>
          <Tab label="Basic Information" {...a11yProps(0)} value={0} onClick={() => setActiveTab(0)} />
          <Tab label="Other Details" disabled {...a11yProps(1)} value={1} onClick={() => setActiveTab(1)} />
        </Tabs>
      </AppBar>    
      <br/>     
          <form onSubmit={handleFormSubmit}
          
          >
          <Typography  variant="h5" mb={2}>
          Personal
          </Typography>
          <Grid container spacing={3}
            sx={{
            p: {xs: 1}
            }}
          >
            <Grid item sm={12} xs={12} md={4}>
            <TextField
            fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onChange={handleChanges('firstName')}
                value={contactData.firstName}
                name="firstName"
                error={errors.firstName}
                helperText={errors.firstName && errors.firstName}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4}>
            <TextField
              fullWidth
                variant="filled"
                type="text"
                label="Middle Name"
                onChange={handleChanges('middleName')}
                value={contactData.middleName}
                name="middleName"
                error={errors.middleName}
                helperText={errors.middleName && errors.middleName}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4}>
            <TextField
            fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onChange={handleChanges('lastName')}
                value={contactData.lastName}
                name="lastName"
                error={errors.lastName}
                helperText={errors.lastName && errors.lastName}
              />
            </Grid>
          
            <Grid item sm={12} xs={12} md={3}>
            <TextField
            fullWidth
                variant="filled"
                type="text"
                label="Suffix"
                onChange={handleChanges('suffix')}
                value={contactData.suffix}
                name="suffix"
                error={errors.suffix}
                helperText={errors.suffix && errors.suffix}
              >
                   {SuffixData.map((option, index) => (
            <MenuItem key={option.value + index} value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
              </TextField>
            </Grid>
            <Grid item sm={12} xs={12} md={3}>
            <TextField
              fullWidth
                variant="filled"
                type="date"
                label="Birth Date"
                onChange={handleChanges('birthDate')}
                value={contactData.birthDate}
                name="birthDate"
                error={errors.birthDate}
                helperText={errors.birthDate && errors.birthDate}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={3}>
            <TextField
            fullWidth
              select
                variant="filled"
                // type="text"
                label="Gender"
                onChange={handleChanges('gender')}
                value={contactData.gender}
                name="gender"
                error={errors.gender}
                helperText={errors.gender && errors.gender}
              >
                {GenderData.map((option, index) => (
            <MenuItem key={option.value + index} value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
              </TextField>
            </Grid>
            <Grid item sm={12} xs={12} md={3}>
            <TextField
            fullWidth
                variant="filled"
                // type="text"
                select
                label="Civil Status"
                onChange={handleChanges('civilStatus')}
                value={contactData.civilStatus}
                name="civilStatus"
                error={errors.civilStatus}
                helperText={errors.civilStatus && errors.civilStatus}
              >
                {CivilStatusData.map((option, index) => (
            <MenuItem key={option.value + index} value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
              </TextField>
            </Grid>
          </Grid>
          <br/><br/>
          <Typography  variant="h5" mb={2}>
          Contact Information
          </Typography>
          <Grid container spacing={3}
          sx={{
            p: {xs: 1}
            }}
          >
            <Grid item sm={12} xs={12} md={6}>
            <TextField
            fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onChange={handleChanges('mobile')}
                value={contactData.mobile}
                name="mobile"
                error={errors.mobile}
                helperText={errors.mobile && errors.mobile}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
            <TextField
              fullWidth
                variant="filled"
                type="text"
                label="Emergency Contact Number"
                onChange={handleChanges('emergencyMobile')}
                value={contactData.emergencyMobile}
                name="emergencyMobile"
                error={errors.emergencyMobile}
                helperText={errors.emergencyMobile && errors.emergencyMobile}
              />
            </Grid>
          </Grid>
            <br/><br/>

          <Typography  variant="h5" mb={2}>
            Registered Address
          </Typography>
            <Grid container spacing={3}
            sx={{
              p: {xs: 1}
              }}
            >
            <Grid item sm={12} xs={12} md={12}>
            <TextField
            fullWidth
                variant="filled"
                type="text"
                label="Address Line"
                onChange={handleChanges('address')}
                value={contactData.address}
                name="address"
                error={errors.address}
                helperText={errors.address && errors.address}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
                        <TextField
                 fullWidth
                 disabled={brgyOptions.length === 0}
                 select
                 variant="filled"
                 // type="text"
                 label="Barangay"
                 // onBlur={handleBlur}
                 onChange={handleChanges('brgyCode')}
                 value={contactData.brgyCode}
                 name="brgyCode"
                 error={errors.brgyCode}
                 helperText={errors.brgyCode &&errors.brgyCode}
               >
               {brgyOptions.map((option, index) => (
             <MenuItem key={option.brgyCode + index} value={option.brgyCode}
             onClick={() => handleArea('brgyCode', option)}
             >
               {option.brgyDesc}
             </MenuItem>
           ))}
                </TextField>
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
             <TextField
                 fullWidth
                 select
                 disabled={cityMunOptions.length === 0}
                 variant="filled"
                 // type="text"
                 label="City/Municipality"
                 // onBlur={handleBlur}
                 onChange={handleChanges('citymunCode')}
                 value={contactData.citymunCode}
                 name="citymunCode"
                 error={errors.citymunCode}
                 helperText={errors.citymunCode && errors.citymunCode}
               >
               {cityMunOptions.map((option, index) => (
             <MenuItem key={option.value + index} value={option.citymunCode}
             onClick={() => handleArea('citymunCode', option)}
             >
               {option.citymunDesc}
             </MenuItem>
           ))}
                </TextField>
            </Grid>
                 
                        <Grid item sm={12} xs={12} md={6}>
             <TextField
                 fullWidth
                 disabled={provOptions.length === 0 || (area.areaType == 'brgyCode' || area.areaType == 'citymunCode')}
                 select
                 variant="filled"
                 // type="text"
                 label="Provinces"
                 onChange={handleChanges('provCode')}
                 value={contactData.provCode}
                 name="provCode"
                 error={errors.provCode}
                 helperText={errors.provCode && errors.provCode}
               >
               {provOptions.map((option, index) => (
             <MenuItem key={option.provCode + index} value={option.provCode}
             onClick={() => handleArea('provCode', option)}
             >
               {option.provDesc}
             </MenuItem>
           ))}
                </TextField>
    
            </Grid>
                        <Grid item sm={12} xs={12} md={6}>
                        <TextField
                 fullWidth
                 autoComplete
                 disabled={true}
                 select
                 variant="filled"
                 // type="text"
                 label="Regions"
                 onChange={handleChanges('regCode')}
                 value={contactData.regCode}
                 name="regCode"
                 error={errors.regCode}
                 helperText={errors.regCode && errors.regCode}
               >
               {regOptions.map((option, index) => (
             <MenuItem key={option.regCode + index} value={option.regCode}
             onClick={() => handleArea('regCode', option)}
             >
               {option.regDesc}
             </MenuItem>
           ))}
                </TextField>
            </Grid>
          </Grid>
        {/*     <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onChange={handleChanges('username')}
                value={contactData.username}
                name="username"
                error={errors.username}
                helperText={errors.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onChange={handleChanges('password')}
                value={contactData.password}
                name="password"
                error={errors.password}
                helperText={errors.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                placeholder="9xx xxx xxxx"
                label="Contact Number"
                onChange={handleChanges('mobile')}
                value={contactData.mobile}
                name="mobile"
                error={errors.mobile}
                helperText={errors.mobile && errors.mobile}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                // type="text"
                label="User Type"
                // onBlur={handleBlur}
                value={contactData.userLevel}
                name="userLevel"
                error={errors.userLevel}
                helperText={errors.userLevel && errors.userLevel}
                sx={{ gridColumn: "span 4" }}
              >
              {mockAreaData[user.userLevel].options.map((option, index) => (
            <MenuItem key={option.value + index} value={option.value}
            onClick={() => handleLevel(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
               </TextField>
             {
             ((activeCode === 'provCode'  || contactData.provCode) || ( contactData.userLevel == 'citymunCode' || contactData.userLevel == 'brgyCode') && !contactData.provCode) && (area.areaType != 'citymunCode' && area.areaType != 'provCode') &&  
             <TextField
                 fullWidth
                 select
                 variant="filled"
                 // type="text"
                 label="Provinces"
                 onSelect={(e) => console.log('SELECTED')}
                 onChange={handleChanges('provCode')}
                 value={contactData.provCode}
                 name="provCode"
                 error={errors.provCode}
                 helperText={errors.provCode && errors.provCode}
                 sx={{ gridColumn: "span 4" }}
               >
               {provOptions.map((option, index) => (
             <MenuItem key={option.provCode + index} value={option.provCode}
             onClick={() => handleArea('provCode', option)}
             >
               {option.provDesc}
             </MenuItem>
           ))}
                </TextField>}
                { ((activeCode == 'citymunCode' || contactData.citymunCode) || (contactData.userLevel == 'brgyCode' && !contactData.citymunCode)) && (area.areaType == 'provCode' || area.areaType == 'regCode' ) &&  <TextField
                 fullWidth
                 select
                 variant="filled"
                 // type="text"
                 label="City/Municipality"
                 // onBlur={handleBlur}
                 onChange={handleChanges('citymunCode')}
                 value={contactData.citymunCode}
                 name="citymunCode"
                 error={errors.citymunCode}
                 helperText={errors.citymunCode && errors.citymunCode}
                 sx={{ gridColumn: "span 4" }}
               >
               {cityMunOptions.map((option, index) => (
             <MenuItem key={option.value + index} value={option.citymunCode}
             onClick={() => handleArea('citymunCode', option)}
             >
               {option.citymunDesc}
             </MenuItem>
           ))}
                </TextField>}
                { ((activeCode == 'brgyCode' || contactData.brgyCode) || (contactData.userLevel == 'brgyCode' && !contactData.brgyCode)) &&  <TextField
                 fullWidth
                 select
                 variant="filled"
                 // type="text"
                 label="Barangay"
                 // onBlur={handleBlur}
                 onChange={handleChanges('brgyCode')}
                 value={contactData.brgyCode}
                 name="brgyCode"
                 error={errors.brgyCode}
                 helperText={errors.brgyCode &&errors.brgyCode}
                 sx={{ gridColumn: "span 4" }}
               >
               {brgyOptions.map((option, index) => (
             <MenuItem key={option.brgyCode + index} value={option.brgyCode}
             onClick={() => handleArea('brgyCode', option)}
             >
               {option.brgyDesc}
             </MenuItem>
           ))}
                </TextField>}
            </Box> */}
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create
              </Button>
            </Box>
          </form>
      </Box>
      }
          
      </Container>
    </Box>
  );
};



export default ContactForm;
