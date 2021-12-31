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
    <form
      style={{ padding: '15px' }}
      onSubmit={onMessageSubmit}
      className="input-message"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="message"
          onChange={(e) => onTextChange(e)}
          placeholder="type your message here..."
          name="message"
        />
      </div>
      <button>Send</button>
    </form>
  );
}

export default MessageForm;
