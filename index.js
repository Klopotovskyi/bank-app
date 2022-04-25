const express = require ('express');
const mongoose = require ('mongoose');
const router = require("./routes/routes");



const PORT = 5000;
const MONGO_URI = 'mongodb+srv://user:userpass@cluster0.l4nvo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
app.use(express.json({extended: true}));
app.use('/api', router);




async function startApp () {
  try {
      await mongoose.connect(MONGO_URI);
      app.listen(PORT, () => {console.log('server is started')})
  }catch (e) {
      console.log('server error:' + e.message );
      process.exit(1);
  }
}
startApp();

