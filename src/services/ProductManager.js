const fs = require('fs').promises;
const {v4: uuidv4} = require ('uuid');

class ProductManager {
    constructor(path){
        this.path = path;
    }

    async getProducts(){
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(id){
        const products = await this.getProducts();
        return products.find(p => p.id.trim() === id.trim());
    }

    async addProduct(product){
        if (
            typeof product.title !== 'string' ||
            typeof product.description !== 'string' ||
            typeof product.code !== 'string' ||
            typeof product.price !== 'number' ||
            typeof product.stock !== 'number' ||
            typeof product.category !== 'string' ||
            !Array.isArray(product.thumbnails)
        ) {
        throw new Error('Los campos del producto no son válidos o están incompletos');
        }
        /*if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category || !product.thumbnails) {
            throw new Error('Todos los campos son obligatorios');
        }*/
        const products = await this.getProducts();
        const newProduct = {id: uuidv4(), status: true, ...product};
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }
    
    async updatedProduct(pid, update){ 
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === pid);
        products[index]={...products[index], ...update, pid: products[index].pid};
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(pid){ 
        const products = await this.getProducts();
        const updated = products.filter(p => p.id !== pid);
        if(products.length === updated.length) return null;
        await fs.writeFile(this.path, JSON.stringify(updated, null, 2));
        return true;
    } 
}
module.exports = ProductManager