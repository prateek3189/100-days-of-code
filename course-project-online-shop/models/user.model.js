const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

const db = require("../db/database");

class User {
  constructor(email, password, name, street, postalCode, city) {
    this.email = email;
    this.password = password;
    this.name = name || "";
    this.address = {
      street: street || "",
      postalCode: postalCode || "",
      city: city || "",
    };
  }

  static async findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async existsAlready() {
    return !!(await this.getUserWithSameEmail(this.email));
  }

  comparePassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
}

module.exports = User;
