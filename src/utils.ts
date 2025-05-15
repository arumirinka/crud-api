import { User } from "types";

export const isValidUser = (user: User) => {
  if (!user || !user.username || !user.age || !user.hobbies) {
    return false;
  } else {
    return true;
  }
};
