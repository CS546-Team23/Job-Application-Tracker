import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";
import session from "express-session";

import multer from "multer";
import * as fsExtra from "fs-extra";

const upload = multer({ dest: "uploads/" });

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
app.use("/register", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  next();
});
app.use("/login", (req, res, next) => {
  if (req.method === "GET" && req.session.user) {
    return res.redirect("/dashboard");
  }
  next();
});
app.use("/dashboard", upload.single("appResume"), (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});
app.use("/applications", upload.single("appResume"), (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});
app.use("/statistics", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});
app.use("/companies", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});
app.use("/profile", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
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

// concat helper function
let hbs = exphbs.create({});
hbs.handlebars.registerHelper("concat", function () {
  var outStr = "";
  for (var arg in arguments) {
    if (typeof arguments[arg] != "object") {
      outStr += arguments[arg];
    }
  }
  return outStr;
});

// select option with attribute
hbs.handlebars.registerHelper("select", function (value, options) {
  // content of page
  let content = options.fn(this);
  // find where value is equal to target
  const search_term = `value="${value}"`;
  let opt_index = content.search(search_term);
  // if not found, return as is
  if (opt_index === -1) {
    return content;
  }
  // else find end of search term in string
  opt_index += search_term.length;
  // insert selected parameter
  content =
    content.slice(0, opt_index) + " selected" + content.slice(opt_index);
  return content;
});

hbs.handlebars.registerHelper("isEmptyObject", function (obj) {
  if (typeof obj !== "object") return true;
  if (Object.keys(obj).length != 0) return false;
  return true;
});

// TODO: Routes to be defined in index.js
configRoutes(app);

app.listen(3000, () => {
  fsExtra.emptyDirSync("uploads");
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
