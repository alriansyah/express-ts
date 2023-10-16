import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const port: number = 3001;

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 200, data: 'hello world' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
