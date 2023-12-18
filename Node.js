const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Hantera CRUD-operationer för kommentarer
app.get('/api/comments', async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.json(comments);
});

app.post('/api/comments', async (req, res) => {
  const { text, userId, imageId } = req.body;
  const comment = await prisma.comment.create({
    data: { text, userId, imageId },
  });
  res.json(comment);
});

app.put('/api/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const comment = await prisma.comment.update({
    where: { id: parseInt(id) },
    data: { text },
  });
  res.json(comment);
});

app.delete('/api/comments/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.comment.delete({ where: { id: parseInt(id) } });
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
