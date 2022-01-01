import { TextField } from '@material-ui/core';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function MessageForm({
  onMessageSubmit,
  onTextChange,
}: {
  onMessageSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onTextChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <form
      style={{ padding: '15px' }}
      onSubmit={onMessageSubmit}
      className="input-message"
    >
      <div>
        <TextField
          fullWidth
          label="Message"
          id="fullWidth"
          required
          onChange={(e) => onTextChange(e)}
          placeholder="type your message here..."
          name="message"
          style={{ width: '92%' }}
        />
        <Button
          style={{ backgroundColor: '#50C878', marginTop: '10px' }}
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
        >
          Send
        </Button>
      </div>
    </form>
  );
}

export default MessageForm;
