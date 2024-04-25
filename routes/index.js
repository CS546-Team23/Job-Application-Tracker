//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import userRoutes from './users.js';

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('*', (_req, res) => {
    return res.status(404).json({error:"404 error"});
  });
};

export default constructorMethod;