import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.models.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());

connectToDB();

//todo apis

app.get("/todos", async (req, res) => {
  try {
    const result = await Todo.find();
    res.send({
      success: true,
      message: " todo list retrived success",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "failed to retrived todo lists",
      data: [],
    });
  }
});

app.post("/create-todo", async (req, res) => {
  const todoDetails = req.body;
  try {
    const result = await Todo.create(todoDetails);
    res.send({
      success: true,
      message: "todo is created success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "todo is created failes",
      data: [],
    });
  }
});

app.get("/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const result = await Todo.findById(todoId);
    res.send({
      success: true,
      message: "todo is retrived success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "todo is retrived failes",
      data: [],
    });
  }
});

app.patch("/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  const updatedTodo = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
    });
    res.send({
      success: true,
      message: "todo is updated success",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "todo is updated failed",
      data: result,
    });
  }
});

app.delete("/delete/:todoId", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.todoId);
    res.send({
      success: true,
      message: "todo is deleted success",
      data: null,
    });
  } catch (error) {
    res.send({
      success: true,
      message: "todo is deleted failed",
      data: [],
    });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

//api declaration
// declare endpoints

// app.get("/get", (req, res) => {
//   res.send({
//     success: true,
//     message: "server is active",
//   });
// });
