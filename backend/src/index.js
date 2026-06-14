const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const sequelize = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const studentRoutes = require('./routes/student.routes');
const gradeRoutes = require('./routes/grade.routes');
const promoRoutes = require('./routes/promo.routes');
const teacherRoutes = require('./routes/teacher.routes');
const moduleRoutes = require('./routes/module.routes');
const courRoutes = require('./routes/cour.routes');
const resourceRoutes = require('./routes/recource.routes');
const fileRoutes = require('./routes/file.routes');
const quizRoutes = require('./routes/quiz.routes');
const messageRoutes = require('./routes/message.routes');

const { initAdmin } = require('./controllers/admin.controller');
const { initgrades } = require('./controllers/grade.controller');
const Message = require('./models/message.model');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// REST routes
app.use('/teachers', teacherRoutes);
app.use('/cours', courRoutes);
app.use('/users', userRoutes);
app.use('/student', studentRoutes);
app.use('/promo', promoRoutes);
app.use('/grades', gradeRoutes);
app.use('/modules', moduleRoutes);
app.use('/resources', resourceRoutes);
app.use('/files', fileRoutes);
app.use('/quiz', quizRoutes);
app.use('/messages', messageRoutes);

// Socket.io — each user joins their own room on connect
io.on('connection', (socket) => {
  const userId = parseInt(socket.handshake.query.userId);
  if (userId) socket.join(`user_${userId}`);

  socket.on('send_message', async ({ senderId, receiverId, text }) => {
    try {
      const message = await Message.create({
        senderId: parseInt(senderId),
        receiverId: parseInt(receiverId),
        text
      });

      const payload = {
        id: message.id,
        senderId: message.senderId,
        receiverId: message.receiverId,
        text: message.text,
        createdAt: message.createdAt
      };

      // Deliver to receiver
      io.to(`user_${receiverId}`).emit('receive_message', payload);
      // Confirm to sender
      socket.emit('message_sent', payload);
    } catch (err) {
      socket.emit('error', { message: 'Failed to send message' });
    }
  });
});

sequelize.sync()
  .then(async () => {
    console.log('Database synced successfully');
    await initgrades();
    await initAdmin();
  })
  .catch(err => console.error('Database sync error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
