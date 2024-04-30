import userRoutes from './users.js';
import registerRoute from './register.js';
import loginRoute from './login.js';
import path from 'path';

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('*', (req, res) => {
    res.sendFile(path.resolve('static/landing.html'));
  });
};

export default constructorMethod;