import { isValidUser } from "./utils";
import { usersDB } from "./db";
import { Route, User } from "types";

const getUser: Route["action"] = async (_, res) => {
  const users = usersDB;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(users));
  res.end();
};

const addUser: Route["action"] = async (req, res) => {
  let newUserData = '';
  req.on('data', (chunk) => newUserData += chunk);
  req.on('end', () => {
    const newUser: User = JSON.parse(newUserData);
    if (isValidUser(newUser)) {
      usersDB.push(newUser);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(newUser));
      res.end();
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify("Bad input, please provide all the required fields: username, age, hobbies - in the correct format."));
      res.end();
    }
  });
};

export const routes: Route[] = [
  {
    method: 'GET',
    path: '/api/users',
    action: getUser,
  },
  {
    method: 'POST',
    path: '/api/users',
    action: addUser,
  }
];
