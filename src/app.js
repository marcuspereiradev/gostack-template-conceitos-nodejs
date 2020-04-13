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
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex((repository) => repository.id == id);

  if (repoIndex < 0)
    return response.status(400).json({error: "Project not found"});

  const updatedRepository = { id, title, url, techs };

  repositories[repoIndex] = updatedRepository;

  return response.json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repository) => repository.id == id);

  if (repoIndex < 0)
    return response.status(400).json({ error: "Repository not found" });

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
