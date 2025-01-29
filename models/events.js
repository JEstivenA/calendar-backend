const { model, Schema } = require("mongoose");

const eventsSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: [true, "Start date is required"],
  },
  end: {
    type: Date,
    required: [true, "End date is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

eventsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Event", eventsSchema);
