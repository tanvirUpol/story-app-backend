import { Schema, model } from 'mongoose';

const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorUsername: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags:[
    {
      tag: {
        type: String,
        required: true,
      },
    }
  ],
  chapters: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Story = model('Story', StorySchema);

export default Story;
