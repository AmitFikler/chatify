import { nanoid } from 'nanoid';
import { useAppSelector } from '../app/hooks';

function Chat({ typingUser }: { typingUser: string }) {
  const { chat, username } = useAppSelector((state) => state.chat);
  const renderChat = () => {
    return chat.map(({ name, message }) => (
      <div key={nanoid()}>
        <div
          className="message"
          style={
            name === username
              ? { backgroundColor: 'rgba(69, 245, 192, 0.637)', float: 'right' }
              : { backgroundColor: 'rgba(26, 243, 91, 0.637)' }
          }
        >
          {name}: <span>{message}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="chat-data">
      {renderChat()}
      <div className="typing">{typingUser}</div>
    </div>
  );
}

export default Chat;
