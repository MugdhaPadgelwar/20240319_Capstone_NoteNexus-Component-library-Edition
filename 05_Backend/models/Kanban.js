const mongoose = require("mongoose");

const kanbanBoardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inprogress", "done"],
    default: "active",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const KanbanBoard = mongoose.model("KanbanBoard", kanbanBoardSchema);

module.exports = KanbanBoard;
