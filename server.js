require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const sequelize=require('./utils/db-connection');
const userRouter=require('./router/userRouter');

app.use(express.json());
app.use(cors());

app.use('/user',userRouter);

const PORT=process.env.port;
sequelize.sync().then(()=>{
  console.log('Database synced successfully.');
  app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(error=>{
  console.error('Error syncing database:', error);
})