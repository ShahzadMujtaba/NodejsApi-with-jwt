const express = require('express');
const connectDB = require('./config/db')

const app = express();


//Connect Database
connectDB();

// Init Middleware  or use bodyParser
app.use(express.json({extended:false}))


app.get('/', (req,res)=>{
  res.send('hello programmers world ');
})

// Define Route
app.use('/api/users',require('./route/api/users'));
app.use('/api/auth',require('./route/api/auth'));
app.use('/api/profile',require('./route/api/profile'));
app.use('/api/post',require('./route/api/post'));


const PORT = process.env.PORT||5000;

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));
