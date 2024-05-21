const Chat = require('../models/chat');

// Controller functions for chat operations

const createChat = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const chat = new Chat({
      senderId,
      receiverId,
      message
    });
    const savedChat = await chat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getChatsBySenderIdAndReceiverId = async (req, res) => {
  try {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    const chats = await Chat.find({ senderId, receiverId }).sort({ timestamp: 'asc' });
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    await Chat.findByIdAndDelete(chatId);
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createChat,
  getChatsBySenderIdAndReceiverId,
  deleteChat,
};
