import express from 'express';
const app = express();

app.use((res,req,next) => {
    console.log("This is a middleware function");
    next();
})

app.use((res,req,next) => {
    console.log("This is a second middleware function");
    next();

});