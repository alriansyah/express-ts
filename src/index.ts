import express from 'express';

type Application = express.Application;
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const app: Application = express();
const port: number = 3001;

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 200, data: 'hello world' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
