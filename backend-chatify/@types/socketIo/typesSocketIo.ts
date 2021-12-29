interface ServerToClientEvents {
  replayMessage: ({ name, message }: Message) => void;
}

interface ClientToServerEvents {
  message: ({ name, message }: Message) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface Message {
  name: string;
  message: string;
}

interface SocketData {
  name: string;
  age: number;
}
