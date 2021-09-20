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
  const [signUpForm, setSignUpForm] = React.useState({
    email: '',
    password: '',
    confirm: '',
    name: ''
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: value
    });
  };

  const handleClose = () => {
    goSignInStep();
    onClose();
  };

  const goSignInStep = () => {
    setActiveStep(0);
  };

  const goSignUpStep = () => {
    setActiveStep(1);
  };

  const onSignUp = () => {
    const data = {
      email: signUpForm.email,
      password: signUpForm.password,
      confirm: signUpForm.confirm,
      name: signUpForm.name
    };

    axios.post('/user/signup', data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
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
              <TextField margin="dense" id="email" label="이메일" type="email" fullWidth variant="outlined" />
              <TextField margin="dense" id="password" label="비밀번호" type="password" fullWidth variant="outlined" />
              <Button onClick={goSignUpStep}>회원가입</Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>로그인</Button>
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
                <TextField margin="dense" id="email" name="email" label="이메일" onChange={onChange} value={signUpForm.email} type="email" fullWidth variant="outlined" />
                <TextField margin="dense" id="password" name="password" label="비밀번호" onChange={onChange} value={signUpForm.password} type="password" fullWidth variant="outlined" />
                <TextField margin="dense" id="confirm" name="confirm" label="비밀번호 확인" onChange={onChange} value={signUpForm.confirm} type="password" fullWidth variant="outlined" />
                <TextField margin="dense" id="name" name="name" label="이름" onChange={onChange} value={signUpForm.name} type="text" fullWidth variant="outlined" />
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