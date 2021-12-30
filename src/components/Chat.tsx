import { nanoid } from 'nanoid';
import { useAppSelector } from '../app/hooks';

function Chat() {
  const chat = useAppSelector((state) => state.chat.chat);
  const renderChat = () => {
    return chat.map(({ name, message }) => (
      <div key={nanoid()}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return <div className="chat-data">{renderChat()}</div>;
}

export default Chat;
