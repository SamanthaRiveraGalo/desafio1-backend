const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.products = []
        this.idProduct = 1
        this.path = path
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {

        //para que no se repita el codigo
        const repeatCode = this.products.find((product) => product.code === code)

        if (repeatCode) {
            console.log('Error, ya existe un producto con este codigo!')
            return;
        }

        //validar los campos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios');
            return
        }

        const newProduct = {
            id: this.idProduct,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct)
        this.idProduct++;
        console.log(`El producto se agregó correctamente`)

        //convierto el array en JSON
        const productsString = JSON.stringify(this.products, null, 2)
        //escribir el producto en el archivo
        await fs.writeFile(this.path, productsString)
        return this.products

    }

    async getProducts() {
        //leer el archivo de productos y devolver todos los productos en formato de arreglo.
        const productsString = await fs.readFile(this.path, 'utf-8')
        //la constante donde se guarde los productos pasados de string a rray
        const productsJson = JSON.parse(productsString)
        return productsJson
    }

    async getProductById(idProduct) {
        //lea los productos y los pase a un array que es lo que hace la funcion getproducts
        const product = await this.getProducts()
        //luego encontrar el producto
        const foundProduct = product.find((prod) => prod.id === idProduct)
        // que retorne el producto que encontro sino producto no encontrado
        return foundProduct ? foundProduct : "Producto no encontrado"
    }

    async updateProduct(idProduct, updatedFields) {
        //lea los productos y los pase a un array 
        const product = await this.getProducts();
        //Busco el producto que quiero actualizar con el indice
        const indice = product.findIndex((prod) => prod.id === idProduct);

        if (indice !== -1) {
            // Actualizo
            const updatedProduct = { ...product[indice], ...updatedFields };
            product[indice] = updatedProduct;
            //reescribo la modificacion
            const productsString = JSON.stringify(this.products, null, 2)
            await fs.writeFile(this.path, productsString)
            return updatedProduct;

        } else {
            console.log('Producto no encontrado')
        }
    }

    async deleteProduct(idProduct) {
        //primero lo leo y paso a array
        const product = await this.getProducts()
        //luego busco que producto quiero eliminar
        const indice = product.findIndex((prod) => prod.id === idProduct)

        if (indice !== -1) {
            //uso splice para modificar el contenido del array
            product.splice(indice, 1);
            //convierto el array en json y luego lo escribo
            const productsString = JSON.stringify(this.products, null, 2)
            await fs.writeFile(this.path, productsString)
            console.log('El producto seleccionado fue eliminado')
        } else {
            console.log('Producto no encontrado')
        }
    }
}

// export.productManager = ProductManager
exports.productManager = ProductManager