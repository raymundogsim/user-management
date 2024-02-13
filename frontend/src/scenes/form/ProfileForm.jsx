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
import { getAuthUser } from "features/auth/authApi";
import { updateContactDetails } from "features/data/dataApi";
import { updateUser } from "features/auth/authApi";


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




const ProfileForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const {  errors } = useSelector(({data}) => data);
  const { user, area, profile } = useSelector(({auth}) => auth);
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
  const [rnd, setRnd] = useState(0);

  
  const handleFormSubmit = (e) => {
  console.log(e, 'SUBBMIT');
    e.preventDefault();
    let { valid, errors: newErrors } = validateContactData(contactData);
    console.log(contactData, user, newErrors, 'CLICKED')
    if(!valid){
      dispatch(authFail({errors: newErrors}));
      return ;
    }
    
    if(!profile){
      dispatch(createContactInformation(contactData))
      .then(res => {
          dispatch(updateUser({contactId: res.id}, user.id))
      
        // dispatch(())
      })   
    } else {
      dispatch(updateContactDetails(contactData, profile.id))
      .then(res => {
         console.log(res, 'updated')
      }) 
    }
   

  };

  const handleChanges = prop => (e) => {
  let newObj = {...contactData, [prop]: e.target.value};
  if(prop === 'regCode'){
    newObj.provCode = '';
    newObj.citymunCode = '';
    newObj.brgyCode = '';
  } 
  if(prop === 'provCode'){
    newObj.citymunCode = '';
    newObj.brgyCode = '';
  } 
  if(prop === 'citymunCode'){
    newObj.brgyCode = ''
  }
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
  if(contactData.regCode){
    handleArea('regCode', contactData)
  }
  if(contactData.provCode){
    handleArea('provCode', contactData)
  }
  if(contactData.citymunCode){
    handleArea('citymunCode', contactData)
  }
}




useEffect(() => {
  console.log(contactData, "HANDLE REG")
  if(contactData.areaCode){
  console.log("HANDLE REG")
    handleRegions()
  }
}, [contactData])


useEffect(() => {
    setContactData({...area, ...profile, areaCode: user.userLevel})
  setRnd(Math.random())
}, [area, profile])

console.log(contactData,'Profile')
console.log(regOptions)
  return (
    <Box m="10px">
          <Container component="main" maxWidth="md" sx={{mt: 5 }}>
          <Header title="USER PROFILE" subtitle="Edit Your Profile Information" />
      <Box
        sx={{
          p: { xs: 1,  md: 3},
        }}
        backgroundColor={colors.primary[400]}
      >
 
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
                //  disabled={provOptions.length === 0 || (area.areaType == 'provCode' || area.areaType == 'brgyCode' || area.areaType == 'citymunCode')}
                  disabled={provOptions.length === 0}
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
                 disabled={regOptions.length === 0}
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
      
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {!profile ? 'Save' : 'Update'}
              </Button>
            </Box>
          </form>
      </Box>
          
      </Container>
    </Box>
  );
};



export default ProfileForm;
