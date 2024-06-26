const db = require("../data/database");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async getAll() {
    const posts = await db.getDb().collection("posts").find().toArray();
    return posts;
  }

  static async getOne() {
    if (!this.id) {
      return;
    }

    const post = await db.getDb().collection("posts").findOne({ _id: this.id });
    this.title = post.title;
    this.content = post.content;
  }

  save() {
    let result;
    if (this.id) {
      result = db
        .getDb()
        .collection("posts")
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } }
        );
    }
    result = db.getDb().collection("posts").insertOne({
      title: this.title,
      content: this.content,
    });
    return result;
  }

  delete() {
    if (!this.id) {
      return;
    }
    return db.getDb().collection("posts").deleteOne({ _id: this.id });
  }
}

module.exports = Post;
