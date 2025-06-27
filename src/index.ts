import express from 'express';
import { AppDataSource } from './database/dataSource';


import {AuthRoute} from  './routes/auth';
import {dashboardRoute} from './routes/userDashboard';
const app = express();
const PORT = process.env.PORT || 3333;
app.use(express.json());


// initilize the register using the register route
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/user', dashboardRoute);




AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  })

app.get('/', (req, res) => {
  res.send('Hello, World!');    
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});