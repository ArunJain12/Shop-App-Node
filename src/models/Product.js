// const products = [];
// Using file storage for storing data
const fs = require("fs");
const path = require("path");

const Cart = require("./Cart");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else if (fileContent.length === 0) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
    // const p = path.join(rootDir, 'data', 'products.json');
    // fs.readFile(p, (err, fileContent) => {
    //     console.log(fileContent);
    //     let products = [];
    //     if (!err) {
    //         products = JSON.parse(fileContent);
    //     };
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), (err) => {
    //         console.log(err);
    //     });
    // });
    // products.push(this); // when working with static data variable
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
    // return products; // when working with static data variable
  }

  static findProductById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProductFromCart(id, product.price);
        }
      });
    });
  }
};
