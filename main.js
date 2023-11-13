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
        const productsString = JSON.stringify(this.products)
        //escribir el producto en el archivo
        await fs.writeFile(this.path, productsString, 'utf-8')

    }

    async getProducts() {
        //leer el archivo de productos y devolver todos los productos en formato de arreglo.
        const productsString = await fs.readFile(this.path, 'utf-8')
        const products = JSON.parse(productsString)
        return products
    }

    async getProductById(idProduct) {
        //lea los productos y los pase a un array que es lo que hace la funcion getproducts
        const products = await this.getProducts()
        //luego encontrar el producto
        const foundProduct = products.find((prod) => prod.id === idProduct)
        return foundProduct;
    }

    async updateProduct(idProduct, updatedFields) {

        const products = await this.getProducts();

        const indice = products.findIndex((prod) => prod.id === idProduct);

        if (indice !== 1) {
            // Actualizo
            const updatedProduct = { ...products[indice], ...updatedFields };
            products[indice] = updatedProduct;

            // Escribo el producto actualizado
            await fs.writeFile(path, JSON.stringify(products));
            return updatedProduct;

        } else {
            console.log('Producto no encontrado')
        }
    }

    async deleteProduct(idProduct) {
        //primero lo leo
        const products = await this.getProducts()

        //luego busco que producto quiero eliminar
        const foundProduct = products.find((prod) => prod.id === idProduct)

        if (foundProduct) {
            // elimino el producto
            products.splice(products.indexOf(foundProduct), 1);
            //convierto el array en json y luego lo escribo
            const productsJson = JSON.stringify(this.products);
            fs.writeFile('products.json', productsJson, 'utf-8');
            console.log('El producto seleccionado fue eliminado')
        } else {
            console.log('Producto no encontrado')
        }
    }
}

//TEST

const productManager = new ProductManager('./productos.json');

productManager.getProducts();

productManager.addProduct({title: 'producto prueba' , description:'Este es un producto prueba', price:200, thumbnail:'Sin imagen' , code:'abc123', stock:25} )

productManager.getProducts();

productManager.getProductById(1);

productManager.updateProduct(2 ,  { title: 'prueba 2', description: 'Este es un producto prueba', price: 100, thumbnail: 'Sin imagen', code:'abc12345', stock: 41 })

productManager.deleteProduct(1)