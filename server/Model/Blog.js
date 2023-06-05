const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  body: {
    type: String,
    trim: true,
    required: true
  },
  tags: [String],
  category: {
    type: String,
    required: true
  },
  subcategory: [String],
  publishedAt: {
    type: Date,
    default: null
  },
  isPublished: {
    type: String
    },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});


module.exports = mongoose.model("Blog", blogSchema);