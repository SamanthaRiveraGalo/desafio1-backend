const express = require('express')
const ProductManager = require('./main.js')

const app = express()
const port = 8080

const productManager = new ProductManager('./productos.json')

// con limite de llamados - query

app.get('/products', async (req, res) => {

    try {
        const limit = parseInt( req.query.limit)
        //traigo los productos 
        const products = await productManager.getProducts()

        // si el limit no es NaN entonces
        if (!isNaN(limit)) {

            res.status(200).json({ status: "ok", data: products.slice(0, limit) });
            // res.json(products.slice(0, limit))

        } else {
            res.status(200).json({ status: "ok", data: products });
            // res.json(products)
        }
    } catch (error) {
        res.status(500).json({ error: error.menssage })
    }

})

//con el id (un solo producto)
app.get('/products/:pid', async (req, res) => {

    try {

        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductsById(productId);

        res.status(200).json({ status: "ok", data: product });
    
    } catch (error) {

        res.status(404).json({ status: "error", message: error.message });
    }
});

// ejemplo en consola para saber que se levanto el servidor y que esta escuchando en el puerto 8080
app.listen(port, () => {
    console.log(`Server listening at [localhost:${port}]`);
})