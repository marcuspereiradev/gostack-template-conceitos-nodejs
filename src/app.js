const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");
const { isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const result = title
    ? repositories.find((repository) => repository.title.includes(title))
    : repositories;

  return response.status(200).json(result);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  repository = { id: uuid(), url, title, techs, likes: 0 };
  repositories.push(repository);

  isUuid(repository.id);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
