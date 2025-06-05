const express = require('express');
const productRouters = require('./routers/products.rutas');
const cartRouters = require('./routers/carts.rutas'); 

const app = express();
const PORT = 8080;

app.use(express.json()); 

app.use('/api/products', productRouters);
app.use('/api/carts', cartRouters);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})