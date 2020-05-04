const express = require('express');

require('./db/mongoose');
const productRouter = require('./routers/products');
const adminRouter = require('./routers/admin');
const modifyProductsRouter = require('./routers/productsUpdate');
const specialsRouter = require('./routers/special');
const modifySpecailsRouter = require('./routers/specialsupdate');
const emailRouter = require('./routers/emails');

const app = express();
const PORT = process.env.PORT ;

app.use(express.json());
app.use(productRouter);
app.use(specialsRouter);
app.use(adminRouter);
app.use(modifyProductsRouter);
app.use(modifySpecailsRouter);
app.use(emailRouter);

app.listen(PORT,()=>{
    console.log("listening to port " + PORT);
})



