import { IncomingMessage, ServerResponse } from "node:http";

export type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type Route = {
  method: string;
  path: string;
  action: (request: IncomingMessage, response: ServerResponse) => void;
};
