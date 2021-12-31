import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} className="header">
      <AppBar position="static" style={{ backgroundColor: 'green' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ChatOutlinedIcon />
            {'  '}Chatify
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
