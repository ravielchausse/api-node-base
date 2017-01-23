import moment from "moment";
import mongoose, { Schema } from "mongoose";

const AnswerSchema = new Schema({

  message: {
    type: String,
    required: true
  },

  userId: { type: Schema.Types.ObjectId  },

  userType: {
    type: String,
    enum: ['admin', 'asker', 'responder']
  },

  date: {
    type: Date,
    default: moment().toISOString()
  }

});

export default AnswerSchema;
