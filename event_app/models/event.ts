import mongoose from "mongoose";

const Schema = mongoose.Schema;
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    publish: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const EventShow = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default EventShow;