class ProductManager {

    constructor() {
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

const productManager = new ProductManager();
//array vacio
console.log(productManager.getProducts())


productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin img", "abc123", 25);
productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 300, "sin img", "abc1234", 30);
productManager.addProduct("producto prueba 3", "Este es un producto prueba 3", 100, "sin img", "abc12345", 40);

// codigo repetido
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin img", "abc123", 25);


console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));
console.log(productManager.getProductById(3));
console.log(productManager.getProductById(4)) //cogido repetido
// todos los productos agregados
console.log(productManager.getProducts())