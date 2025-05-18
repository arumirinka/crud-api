import { User } from "types";

export const isValidUser = (user: User) => {
  if (
    !user
    || typeof user.username !== "string"
    || !user.username?.trim()
    || !user.age
    || typeof user.age !== "number"
    || user.age < 0
    || !user.hobbies
    || !Array.isArray(user.hobbies)
    || !user.hobbies.every((hobby) => typeof hobby === "string" && !!hobby?.trim())
  ) {
    return false;
  } else {
    return true;
  }
};
