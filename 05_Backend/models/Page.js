const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  review_status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  comments: {
    type: [String],
    default: [],
  },
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
