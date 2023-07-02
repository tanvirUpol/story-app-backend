import Story from "../models/story.js";

// Create a new story
const createStory = async (req, res) => {
  try {
    const { title, author, description, chapters, tags, authorUsername } =
      req.body;
    const story = new Story({
      title,
      author,
      description,
      chapters,
      tags,
      authorUsername,
    });
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all stories
const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user stories
const getAllUserStories = async (req, res) => {
  const _id = req.params.id;
  try {
    const stories = await Story.find({ author: _id }).sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific story
const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a story
const updateStory = async (req, res) => {
  // console.log(req.body);
  try {
    const { title, author, authorUsername, description, chapters, tags } =
      req.body;
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { title, author, authorUsername, description, chapters, tags },
      { new: true }
    );
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a story
const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndRemove(req.params.id);
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new chapter to a story
const addChapterToStory = async (req, res) => {
  try {
    const { title, content } = req.body;
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    const newChapter = { title, content };
    story.chapters.push(newChapter);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createStory,
  getAllStories,
  getStory,
  updateStory,
  deleteStory,
  addChapterToStory,
  getAllUserStories,
};
