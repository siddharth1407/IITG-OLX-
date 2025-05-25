const express = require("express");
const mongoose = require('mongoose');
const router = require("./Routes/appRouter");
const InitiateMongoServer = require('./config/db');
const routerAdminBro = require('./adminPanel/adminBro')
const path = require('path');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('/server/admin', routerAdminBro);
// servinging react app
app.use(express.static(path.join(__dirname, '../client/build')));


InitiateMongoServer()
.then(()=>{
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  if(db.readyState){
    console.log("connection was successful ");
    // app.use('/server/admin', routerAdminBro);
  }
    
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });