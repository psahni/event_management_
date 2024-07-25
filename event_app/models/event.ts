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
    venue: {
      type: String,
      required: true
    },
    ticketsAvailable: {
      type: Number,
      required: true
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

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;