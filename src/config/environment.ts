import 'dotenv/config';

const CONFIG = {
  db: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9ynnxbv.mongodb.net/belajar_express`
};

export default CONFIG;
