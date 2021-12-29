export interface ServerToClientEvents {
  replayMessage: ({ name, message }: Message) => void;
  onlineUser: (database: User[]) => void;
}

export interface ClientToServerEvents {
  message: ({ name, message }: Message) => void;
}

export interface Message {
  name: string;
  message: string;
}

export interface User {
  id: string;
  username: string;
}
