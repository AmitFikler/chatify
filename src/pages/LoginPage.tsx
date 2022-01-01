import { Button, TextField, Box } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import { userLogin } from '../reducers/chatReducer';

function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleLogin = () => {
    if (username) {
      dispatch(userLogin(username));
      navigate('/chat');
    } else {
      return;
    }
  };

  return (
    <>
      <div>
        <Box mt={20} textAlign={'center'} className="login">
          <h2>Please login</h2>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </div>
    </>
  );
}

export default LoginPage;
