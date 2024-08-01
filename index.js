const express = require('express');
const { productRouter } = require('./routes/productRoute');
const { userRouter } = require('./routes/userRoutes');
const { connectDb } = require('./config/db');
const { genericErrorhandle } = require('./error/errorHandle');
const app = express();
require('dotenv').config();
const port = 4000;


connectDb();


app.use('/api/products',productRouter)
app.use('/api/user',userRouter)

app.all('*',(req,res)=>{
  try {
    res.status(400).json({
      message:"endpoint dosn't exist"
    })
    
  } catch (error) {
    res.status(400).json(error)
    
  }
})
app.use(genericErrorhandle)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
