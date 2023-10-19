import 'dotenv/config';

const CONFIG: any = {
  db: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9ynnxbv.mongodb.net/belajar_express`,
  jwt_public: process.env.JWT_PUBLIC,
  jwt_private: process.env.JWT_PRIVATE
};

export default CONFIG;
