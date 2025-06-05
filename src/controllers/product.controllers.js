const ProductManager = require('../services/ProductManager');
const manager = new ProductManager('./src/data/products.json');

module.exports = {
    getAll: async (req, res) =>{
        const result = await manager.getProducts();
        res.json(result);
    },

    getById: async (req, res) => { 
        const result = await manager.getProductById(req.params.pid);
        result ? res.json(result): res.status(404).send('El producto no ha sido encontrado');
    },

    create: async(req, res) => {
        const result = await manager.addProduct(req.body);
        res.status(201).json(result);
    },

    update: async (req, res) => {
        const result =await manager.updatedProduct(req.params.pid, req.body);
        result ? res.json(result): res.status(404).send('El producto no ha sido encontrado');
    },

    delete: async (req, res) => {
        const result = await manager.deleteProduct(req.params.pid);
        result ? res.json(result): res.status(404).send('El producto no ha sido encontrado');
    },
}