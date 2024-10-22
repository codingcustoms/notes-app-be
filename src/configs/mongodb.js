import mongoose from 'mongoose';

// # https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password
const username = encodeURIComponent(process.env.MONGO_DB_USERNAME);
const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);

let uri = `mongodb+srv://${username}:${password}@${process.env.MONGO_DB_CLUSTER_NAME}/?retryWrites=true&w=majority&appName=Cluster0`;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(uri).then(() => {
    console.log('Connected to database');
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
