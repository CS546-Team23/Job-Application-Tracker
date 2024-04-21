import express from "express";
const app = express();
// import configRoutes from "./routes/index.js";
// import exphbs from "express-handlebars";
import dataFun from "./data/applications.js";

// const rewriteUnsupportedBrowserMethods = (req, res, next) => {
//   // If the user posts to the server with a property called _method, rewrite the request's method
//   // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
//   // rewritten in this middleware to a PUT route
//   if (req.body && req.body._method) {
//     req.method = req.body._method;
//     delete req.body._method;
//   }

//   // let the next middleware run:
//   next();
// };

// app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(rewriteUnsupportedBrowserMethods);

// app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// TODO: Routes to be defined in index.js
// configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

// console.log(dataFun.createApplication("661b1f0f00d5d86b38607305", "dummyCompany", "dummyjobposition","dummyappCity", "dummyappState","09/25/2024","appResume","status")
// );

// console.log(await dataFun.getJobappByid("661b1f0f00d5d86b386072ff"));

// let obj = {
//   companyName : "dummy2",
//   jobPosition : "dummy2 Engineer",
//   appCity : "duumy2 York",
//   appState : "2dummyNY2",
//   followUpDate : "03/25/2025",
//   appResume : "2dummy.docx",
//   status : "2dummy",
// }
// console.log(await dataFun.updateJobapp("661b1f0f00d5d86b38607301", obj));

console.log(dataFun.removeJobapp("66244f2bf8439327dc9fcd26"));