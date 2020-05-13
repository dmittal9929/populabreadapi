const express = require('express');
var cors = require('cors');


require('./db/mongoose');
const productRouter = require('./routers/products');
const adminRouter = require('./routers/admin');
const modifyProductsRouter = require('./routers/productsUpdate');
const specialsRouter = require('./routers/special');
const modifySpecailsRouter = require('./routers/specialsupdate');
const emailRouter = require('./routers/emails');
const collaborationRouter = require('./routers/collaboration');
const collabUpdateRouter = require('./routers/collaborationipdate');


const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(productRouter);
app.use(specialsRouter);
app.use(adminRouter);
app.use(modifyProductsRouter);
app.use(modifySpecailsRouter);
app.use(emailRouter);
app.use(collaborationRouter);
app.use(collabUpdateRouter);


app.listen(PORT,()=>{
    console.log("listening to port " + PORT);
});




