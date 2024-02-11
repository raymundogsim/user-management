import { Box, Button, Container, TextField, MenuItem, AppBar, Tabs, Tab, Typography, Grid } from "@mui/material";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { mockAreaData,SuffixData,  CivilStatusData, GenderData } from "data/mockData";
import { useEffect, useState } from "react";
import { getAreaOptions } from "features/data/dataApi";
import { validateSignupData } from "utils/validators";
import { useTheme } from "@mui/material";
import { signup } from "features/auth/authApi";
import { authFail } from "features/auth/authSlice";


const UserForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);

  const { user, area, message, errors } = useSelector(({auth}) => auth);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userData, setUserData] = useState({});
  const [provOptions, setProvOptions] = useState([]);
  const [cityMunOptions, setCityMunOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [activeCode, setActiveCode] = useState('');
  const [rnd, setRnd] = useState(0);
  const [created, setCreated] = useState(false);

  
  const handleFormSubmit = (e) => {
  console.log(e, 'SUBBMIT');
    e.preventDefault();
    let { valid, errors: newErrors } = validateSignupData(userData);
    console.log(userData, user, newErrors, 'CLICKED')
    if(!valid){
      dispatch(authFail({errors: newErrors}));
      return ;
    }
    
    
    dispatch(signup({...userData, createdBy:  user.id, contact_information: {
    ...area, ...userData
    }}))
    .then(res => {
      setCreated(res);
    });
    
    console.log(e.target.value);
    
  };

  const handleChanges = prop => (e) => {
  let newObj = {...userData, [prop]: e.target.value}
  let oldErrors = {...errors}
    let { valid, errors: newErrors } = validateSignupData(newObj);
    if(!valid){
      oldErrors = {...errors,[prop]: newErrors[prop]};
    } else {
      delete newErrors[prop];
      oldErrors = {...errors, ...newErrors}
    
    }
    
    
    console.log(prop == userData.userLevel, 'AREA CODE')
    if(prop == userData.userLevel){
        newObj.areaCode = e.target.value;
    }
    
    dispatch(authFail({errors: oldErrors}));

    setUserData(newObj);
    setRnd(Math.random())
    
  }
  
  const handleLevel = (code) => {
  
    let areaType = area.areaType == 'regCode' ? 'provinces' : area.areaType == 'provCode' ? 'citymuns' : area.areaType == 'citymunCode' ? 'brgies' : '';  
      
    dispatch(getAreaOptions(areaType, area.areaCode))
    .then(res => {
        if(areaType == 'provinces'){
          setProvOptions(res);
        }
        if(areaType == 'citymuns'){
          setCityMunOptions(res)
        }
        if(areaType == 'brgies'){
          setBrgyOptions(res)
        }
    })
    
    
    setActiveCode(code);
    setUserData({...userData, userLevel: code,  provCode: null, citymunCode: null, brgyCode: null, areaCode: null});
    setRnd(Math.random())
    dispatch(authFail({errors: {...errors, userLevel: null}}));
}
  
  
  
  const handleArea = (areaType, val) => {
      let code = val[areaType];
      let type = areaType == 'regCode' ? 'provinces' : areaType == 'provCode' ? 'citymuns' : areaType == 'citymunCode' ? 'brgies' : '';  
      dispatch(getAreaOptions(type, code))
      .then(res => {
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
      dispatch(authFail({errors: {...errors, userLevel: null}}));
  }



useEffect(() => {
  let {regCode, provCode, citymunCode, brgyCode} = area
  setUserData({regCode, provCode, citymunCode, brgyCode})
}, [])


  console.log(errors, area)

  return (
    <Box m="10px">
          <Container component="main" maxWidth="md" sx={{mt: 5 }}>
      <Header title="CREATE USER" subtitle="Create a New User Credentials" />
      
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
      setUserData({username: null, password: null, areaCode: null, userLevel: null})
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
          <form onSubmit={handleFormSubmit}>
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
                value={userData.firstName}
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
                value={userData.middleName}
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
                value={userData.lastName}
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
                value={userData.suffix}
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
                value={userData.birthDate}
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
                value={userData.gender}
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
                value={userData.civilStatus}
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
                placeholder="9xx xxx xxxx"
                label="Contact Number"
                onChange={handleChanges('mobile')}
                value={userData.mobile}
                name="mobile"
                error={errors.mobile}
                helperText={errors.mobile && errors.mobile}
                sx={{ gridColumn: "span 4" }}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
                <TextField
                fullWidth
                variant="filled"
                type="text"
                placeholder="9xx xxx xxxx"
                label="Emergency Contact Number"
                onChange={handleChanges('emergencyMobile')}
                value={userData.emergencyMobile}
                name="emergencyMobile"
                error={errors.emergencyMobile}
                helperText={errors.emergencyMobile && errors.emergencyMobile}
                sx={{ gridColumn: "span 4" }}
              />
            </Grid>
          </Grid>
          <br/><br/>
          <Typography  variant="h5" mb={2}>
          Account Details
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
                label="Username"
                onChange={handleChanges('username')}
                value={userData.username}
                name="username"
                error={errors.username}
                helperText={errors.username && errors.username}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
            <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onChange={handleChanges('password')}
                value={userData.password}
                name="password"
                error={errors.password}
                helperText={errors.password && errors.password}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
            <TextField
                fullWidth
                select
                variant="filled"
                // type="text"
                label="User Type"
                // onBlur={handleBlur}
                value={userData.userLevel}
                name="userLevel"
                error={errors.userLevel}
                helperText={errors.userLevel && errors.userLevel}
              >
              {mockAreaData[user.userLevel].options.map((option, index) => (
            <MenuItem key={option.value + index} value={option.value}
            onClick={() => handleLevel(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
               </TextField>
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
            {
             ((activeCode === 'provCode'  || userData.provCode) || ( userData.userLevel == 'citymunCode' || userData.userLevel == 'brgyCode') && !userData.provCode) && (area.areaType != 'citymunCode' && area.areaType != 'provCode') &&  
             <TextField
                 fullWidth
                 select
                 variant="filled"
                 // type="text"
                 label="Provinces"
                 onSelect={(e) => console.log('SELECTED')}
                 onChange={handleChanges('provCode')}
                 value={userData.provCode}
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
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
           
            { ((activeCode == 'citymunCode' || userData.citymunCode) || (userData.userLevel == 'brgyCode' && !userData.citymunCode)) && (area.areaType == 'provCode' || area.areaType == 'regCode' ) &&  <TextField
                 fullWidth
                 select
                 variant="filled"
                 // type="text"
                 label="City/Municipality"
                 // onBlur={handleBlur}
                 onChange={handleChanges('citymunCode')}
                 value={userData.citymunCode}
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
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
           
            { ((activeCode == 'brgyCode' || userData.brgyCode) || (userData.userLevel == 'brgyCode' && !userData.brgyCode)) &&  <TextField
                 fullWidth
                 select
                 variant="filled"
                 // type="text"
                 label="Barangay"
                 // onBlur={handleBlur}
                 onChange={handleChanges('brgyCode')}
                 value={userData.brgyCode}
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
            </Grid>
          </Grid>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
            
            
               
          
           
             
            </Box>
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



export default UserForm;
