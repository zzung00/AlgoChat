import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function SignDialog(props) {
  const { onClose, open } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [signInData, setSignInData] = React.useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = React.useState({
    email: '',
    password: '',
    confirm: '',
    name: ''
  });

  const onSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value
    });
  };

  const onSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };

  const handleClose = () => {
    if (!isSignInStep()) {
      goSignInStep();
    }
    onClose();
  };

  const goSignInStep = () => {
    setActiveStep(0);
  };

  const goSignUpStep = () => {
    setActiveStep(1);
  };

  const onSignIn = () => {
    axios.post('/user/signin', signInData)
      .then(res => {

      })
      .catch(err => {

      })
      handleClose();
  }

  const onSignUp = () => {
    axios.post('/user/signup', signUpData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      handleClose();
  };

  const isSignInStep = () => {
    return activeStep === 0;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ width: '100%'}}>
        <Stepper activeStep={0} alternativeLabel>
        </Stepper>
        {isSignInStep() ? (
          <React.Fragment>
            <DialogTitle>
              로그인
              {onClose ? (
                <IconButton aria-label="close" onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                <CloseIcon />
                </IconButton>
              ) : null}
              </DialogTitle>
            <DialogContent>
              <div>
                <TextField margin="dense" id="email" name="email" label="이메일" onChange={onSignInChange} value={signInData.email} type="email" fullWidth variant="outlined" />
                <TextField margin="dense" id="password" name="password" label="비밀번호" onChange={onSignInChange} value={signInData.password} type="password" fullWidth variant="outlined" />
              </div>
              <Button onClick={goSignUpStep}>회원가입</Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={onSignIn}>로그인</Button>
            </DialogActions>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogTitle>
              회원가입
              {onClose ? (
                <IconButton aria-label="close" onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                <CloseIcon />
                </IconButton>
              ) : null}
              </DialogTitle>
            <DialogContent>
              <div>
                <TextField margin="dense" id="email" name="email" label="이메일" onChange={onSignUpChange} value={signUpData.email} type="email" fullWidth variant="outlined" />
                <TextField margin="dense" id="password" name="password" label="비밀번호" onChange={onSignUpChange} value={signUpData.password} type="password" fullWidth variant="outlined" />
                <TextField margin="dense" id="confirm" name="confirm" label="비밀번호 확인" onChange={onSignUpChange} value={signUpData.confirm} type="password" fullWidth variant="outlined" />
                <TextField margin="dense" id="name" name="name" label="이름" onChange={onSignUpChange} value={signUpData.name} type="text" fullWidth variant="outlined" />
              </div>
            </DialogContent>
            <DialogActions>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button onClick={goSignInStep} sx={{ mr: 1 }}>뒤로가기</Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={onSignUp} sx={{ mr: 1 }}>회원가입</Button>
              </Box>
            </DialogActions>
          </React.Fragment>
        )}
      </Box>
    </Dialog>
  )
}

SignDialog.prototype = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SignDialog;