import { TextField } from '@material-ui/core';

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
    <form style={{ padding: '15px' }} onSubmit={onMessageSubmit}>
      <div>
        <TextField
          required
          id="outlined-required"
          label="name"
          onChange={(e) => onTextChange(e)}
          defaultValue="name"
          name="name"
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="message"
          onChange={(e) => onTextChange(e)}
          defaultValue="Hello World"
          name="message"
        />
      </div>
      <button>Send</button>
    </form>
  );
}

export default MessageForm;
