const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  html_code: {
    type: String,
    required: true,
  },
  css_code: {
    type: String,
  },

  javascript_code: {
    type: String,
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
