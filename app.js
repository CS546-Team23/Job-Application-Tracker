import express from "express";
const app = express();
// import configRoutes from "./routes/index.js";
// import exphbs from "express-handlebars";
import dataFun from "./data/applications.js";
import noteFunc from "./data/notes.js";

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

//console.log(await dataFun.createApplication("66244f5be7840fc13e5d3be6", "dummyCompany", "dummyjobposition","dummyappCity", "dummyappState","09/25/2024","appResume","status"));

 //console.log(await dataFun.getJobappByid("6624b5cb33ec2e52c08d14f6"));

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

 //console.log(await dataFun.removeJobapp("66244f5be7840fc13e5d3be4"));

//console.log(await noteFunc.createNote("6624a1a7acc268ab5adf1135", "wow im so gr8"));

//console.log(await noteFunc.getNoteById("6624b729db2c3cb4dd2550e6"));


//console.log(await noteFunc.removeNoteById("6624b366239e644f44ae1e76"))

console.log(await noteFunc.updateNoteById("6624b729db2c3cb4dd2550e6", "I'm not gr8, I'm Awesome !!!"))