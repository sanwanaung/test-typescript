import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
console.log(uuidv4());
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

type UserInfo = {
  name: string;
  email: string;
  age: number;
  id: string;
  // hobby?: "game" | "coding";
};

// type Test = (string | null | number | "gg")[];
// let arr: Test = ["hello", "apple", null, 1, 2, 3];

let users: UserInfo[] = [
  { name: "user1", email: "user1@gmail.com", age: 20, id: uuidv4() },
  {
    name: "user2",
    email: "user2@gmail.com",
    age: 22,
    id: uuidv4(),
  },
];
app.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const filterUser = users.filter((user) => user.id === id);
  users = filterUser;
  res.send(users);
});

app.put("/users", (req: Request, res: Response) => {
  const newUser = req.body;
  const checkId = newUser.id;
  const findUser = users.find((user) => user.id === checkId);
  if (findUser) {
    findUser.name = newUser.name;
    findUser.email = newUser.email;
    findUser.age = newUser.age;
    res.send(users);
  }
});

app.post("/users", (req: Request, res: Response) => {
  const newUser = req.body;
  newUser.id = uuidv4();
  users.push(newUser);
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server run in port ${port}`);
});
