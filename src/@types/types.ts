export interface ServerToClientEvents {
  replayMessage: ({ name, message }: Message) => void;
}

export interface ClientToServerEvents {
  message: ({ name, message }: Message) => void;
}

export interface Message {
  name: string;
  message: string;
}
