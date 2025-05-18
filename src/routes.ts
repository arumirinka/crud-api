import { v4 as uuidV4, validate } from "uuid";
import { isValidUser } from "./utils";
import { usersDB } from "./db";
import { Route, User } from "types";

const getUsers: Route["action"] = async (req, res) => {
  const id = req.url?.split('/api/users/')?.at(-1);
  if (id && !id.startsWith('/api/users')) {
    if (!validate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(`Invalid id ${id}.`));
      res.end();
    } else {
      const userById = usersDB.find((user) => user.id === id);
      if (userById) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(userById));
        res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(`User with id ${id} was not found.`));
        res.end();
      }
    }
  } else {
    const users = usersDB;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(users));
    res.end();
  }
};

const addUser: Route["action"] = async (req, res) => {
  let newUserData = '';
  req.on('data', (chunk) => newUserData += chunk);
  req.on('end', () => {
    try {
      const newUser: User = JSON.parse(newUserData);
      newUser.id = uuidV4();
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
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify("Something went wrong."));
      res.end();
    }
  });
};

const updateUser: Route["action"] = async (req, res) => {
  const id = req.url?.split('/api/users/')?.at(-1);
  if (id && !id.startsWith('/api/users')) {
    if (!validate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(`Invalid id ${id}.`));
      res.end();
    } else {
      const userId = usersDB.findIndex((user) => user.id === id);
      if (userId >= 0) {
        let updatedUserData = '';
        req.on('data', (chunk) => updatedUserData += chunk);
        req.on('end', () => {
          try {
            const updatedUser: User = JSON.parse(updatedUserData);
            if (isValidUser(updatedUser)) {
              usersDB[userId] = {
                ...usersDB[userId],
                id,
                username: updatedUser.username,
                age: updatedUser.age,
                hobbies: updatedUser.hobbies
              };
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify(usersDB[userId]));
              res.end();
            } else {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify("Bad input, please provide all the required fields: username, age, hobbies - in the correct format."));
              res.end();
            }
          } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify("Something went wrong."));
            res.end();
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(`User with id ${id} was not found.`));
        res.end();
      }
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(`User with id ${id} was not found.`));
    res.end();
  }
};

const deleteUser: Route["action"] = async (req, res) => {
  const id = req.url?.split('/api/users/')?.at(-1);
  if (id && !id.startsWith('/api/users')) {
    if (!validate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(`Invalid id ${id}.`));
      res.end();
    } else {
      const userId = usersDB.findIndex((user) => user.id === id);
      if (userId >= 0) {
        usersDB.splice(userId, 1);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(`User with id ${id} successfully deleted.`));
        res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(`User with id ${id} was not found.`));
        res.end();
      }
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(`User with id ${id} was not found.`));
    res.end();
  }
};

export const routes: Route[] = [
  {
    method: 'GET',
    path: '/api/users',
    action: getUsers,
  },
  {
    method: 'POST',
    path: '/api/users',
    action: addUser,
  },
  {
    method: 'PUT',
    path: '/api/users',
    action: updateUser,
  },
  {
    method: 'DELETE',
    path: '/api/users',
    action: deleteUser,
  }
];
