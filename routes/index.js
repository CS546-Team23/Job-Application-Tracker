//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import userRoutes from './users.js';
import apiRoutes from './api.js';

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/api', apiRoutes);
};
  
export default constructorMethod;