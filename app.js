const express = require('express')
const { productManager } = require('./main.js')
const app = express()
const port = 8080

//esto es necesario asi annde query
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = new productManager('./productos.json')

// con limite de llamados - query

app.get('/products', async (req, res) => {

    const limit = req.query.limit
    //traigo los productos en json por la funcion getproducts
    const product = await products.getProducts()

    // si el limit no es NaN entonces
    if (!isNaN(limit)) {
        product = product.slice(0, limit);
        res.status(200).json({
            status: "ok",
            data: product,
        })
    } else {
        res.status(500).json({
            error: "Error al obtener los productos"
        });
    }

})

//con el id (un solo producto)
app.get('/products/:id', async (req, res) => {

    const id = req.params.id
    const product = await products.getProductsById(id)

    if(!product){
        res.status(404).json({
            status:'fail',
            messenge: 'Producto no encontrado'
        })
        return
    }

    // si se encuentra el producto

    res.status(200).json({
        status:'ok',
        data: product
    })
})


// ejemplo en consola para saber que se levanto el servidor y que esta escuchando en el puerto 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

