class ProductManager {

    constructor() {
        //array
        this.products = []
        this.idProduct = 1
    }

    addProduct(title, description, price, thumbnail, code, stock) {

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

    }

    getProducts() {
        return this.products
    }

    getProductById(idProduct) {
        const foundProduct = this.products.find(
            (prod) => prod.id === idProduct
        );
        if (!foundProduct) {
            console.log("Error: Producto no encontrado");
            return "Producto No Encontrado";
        }
        return foundProduct;
    }
}

// pruebas

const productManager = new ProductManager()

console.log(productManager.getProducts())
console.log('hola mundo')