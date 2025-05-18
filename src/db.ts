import { v4 as uuidV4 } from "uuid";
import { User } from "types";

export const usersDB: User[] = [
  {
    id: uuidV4(),
    username: "Jane",
    age: 25,
    hobbies: ['programming']
  },
  {
    id: uuidV4(),
    username: "John",
    age: 40,
    hobbies: ['reading']
  }
];
