import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";

import session from "express-session";

app.use(
  session({
    name: "AuthenticationSession",
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: false,
    resave: false,
  })
);

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use("/", (req, res, next) => {
  if (req.originalUrl === "/") {
    if (req.session.user) {
      return res.redirect("/dashboard");
    }
  }
  next();
});
app.use('/register', (req, res, next) => {
  if(req.session.user){
    return res.redirect('/dashboard');
  }
  next();
});
app.use('/login', (req,res, next) => {
  if(req.method === 'GET' && req.session.user){
    return res.redirect('/dashboard');
  }
  next();
});
app.use("/dashboard", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});
app.use('/statistics', (req, res, next) => {
  if(!req.session.user){
    return res.redirect('/login');
  }
  next();
});
app.use('/company', (req, res, next) => {
  if(!req.session.user){
    return res.redirect('/login');
  }
  next();
});
app.use('/profile', (req, res, next) => {
  if(!req.session.user){
    return res.redirect('/login');
  }
  next();
});

app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine(
  "handlebars",
  exphbs.engine({ defaultLayout: "main", partialsDir: ["views/partials/"] })
);
app.set("view engine", "handlebars");

// TODO: Routes to be defined in index.js
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
