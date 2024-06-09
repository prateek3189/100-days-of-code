const db = require("../db/database");
const mongodb = require("mongodb");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.image = productData.image;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.id = !!productData._id ? productData._id.toString() : "";
    this.updateImageData();
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map((product) => new Product(product));
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      // Update a product
      const productId = new mongoDb.ObjectId(this.id);
      if (!this.image) {
        delete productData.image;
      }

      db.getDb().collection("products").updateOne(
        { _id: productId },
        {
          $set: productData,
        }
      );
    } else {
      // Create a new product
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  static async findById(id) {
    let productId;
    try {
      productId = new mongodb.ObjectId(id);
      this.id = productId;
    } catch (e) {
      e.code = 404;
      throw e;
    }

    const productData = await db
      .getDb()
      .collection("products")
      .findOne({ _id: productId });
    if (!productData) {
      const error = new Error("Could not find product");
      throw error;
    }

    return new Product(productData);
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  async deleteProduct(id) {
    const productId = new mongoDb.ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
