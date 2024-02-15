import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ColorModeContext, tokens } from "../theme";
import {   Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { verifyCode } from '../features/auth/authApi';
import { signup } from '../features/auth/authApi';

export default function SetupDialog({open, handleClose}) {
    const dispatch = useDispatch()
    const { errors} = useSelector(({auth}) => auth);
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [code, setCode] = React.useState('');
    const [values, setValues] = React.useState({});
    const [isSetup, setIsSetup] = React.useState(false);
    
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(isSetup){
    dispatch(signup(values))
        .then(res => {
            console.log(res, 'signup')
            onClose();
        })
        
        } else {
        
        dispatch(verifyCode(code))
        .then(res => {
            console.log(res)
            if(res){
                setIsSetup(true)
                setValues({...res, isSuper: true, userLevel: res.areaType})
            } else {
              onClose();
            }
        })
        }
    
    }
    
    const onClose = () => {
        setCode('');
        setValues({})
        setIsSetup(false)
        handleClose()
    }
    

  return (
    <React.Fragment>
      <Dialog
        open={open}
        // onClose={handleClose}
        maxWidth={'xs'}
        fullWidth={true}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
          style: {
            backgroundColor: colors.primary[400]
          }
        }}
      >
      {isSetup ? 
      <>
      <DialogTitle sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}><Typography>Admin Signup</Typography></DialogTitle>
      <DialogContent
        sx={{p: 3}}
      >
        <DialogContentText>
         Please enter your login credentials here.
        </DialogContentText>
        <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={errors.username}
              helperText={errors.username && errors.username}
              value={values.username}
              onChange={(e) => setValues({...values, username: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password}
              helperText={errors.password && errors.password}
              value={values.password}
              onChange={(e) => setValues({...values, password: e.target.value})}
            />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="license"
            label="Lisence Code"
            type="license"
            fullWidth
            variant="standard"
            value={code}
            helperText={`${values.brgyDesc} ${values.citymunDesc} ${values.provDesc} ${values.regDesc}`}

          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="access"
            name="access"
            label="Access Level"
            fullWidth
            variant="standard"
            value={values.userLevel === 'provCode' ? 'PROVINCIAL' : values.userLevel === 'citymunCode' ? 'CITY/MUNICIPALITY' :  values.userLevel === 'brgyCode' ? 'BARANGAY' : 'REGIONAL'}
          />
      </DialogContent>
      </>
      :
      <>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your license code here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="license"
            label="Lisence Code"
            type="license"
            fullWidth
            variant="standard"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          
        </DialogContent>
        </>
        }
        <DialogActions>
          <Button onClick={onClose}
          sx={{
            backgroundColor: colors.blueAccent[300],
            color: colors.grey[100],
          }}
          >Cancel</Button>
          <Button type="submit"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
          >Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
