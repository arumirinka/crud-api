import request from 'supertest';
import { server } from '../src/index';

const newUser = {
  username: "Bob",
  age: 58,
  hobbies: ["bike"],
};

let newUserId: string;

afterAll(async () => server.close());

describe("Users tests", () => {
  test("should get all users", async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
  });
  
  test("should create new user", async () => {
    const response = await request(server).post('/api/users/').send(newUser);
    newUserId = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body.username).toEqual(newUser.username);
  });

  test("should get new user by id", async () => {
    const response = await request(server).get(`/api/users/${newUserId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({...newUser, id: newUserId});
  });

  test("should delete new user by id", async () => {
    const response = await request(server).delete(`/api/users/${newUserId}`);
    expect(response.status).toBe(204);
  });
});

describe("Error handling tests", () => {  
  test("should return 404 for incorrect url", async () => {
    const response = await request(server).get('/api/us');
    expect(response.status).toBe(404);
  });

  test("should return 400 when trying to get user by invalid id", async () => {
    const response = await request(server).get('/api/users/123');
    expect(response.status).toBe(400);
  });

  test("should return 404 when trying to delete user with valid, but non-existing id", async () => {
    const response = await request(server).delete('/api/users/b38590e8-777d-4620-8699-aa9bdbdb3cfe');
    expect(response.status).toBe(404);
  });
});
