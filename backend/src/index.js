


const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const studentRoutes = require('./routes/student.routes')
const gradeRoutes = require("./routes/grade.routes");
const promoRoutes = require("./routes/promo.routes");
const teacherRoutes = require("./routes/teacher.routes");
const moduleRoutes = require("./routes/module.routes");
const courRoutes = require("./routes/cour.routes")
const resourceRoutes = require('./routes/recource.routes')
const fileRoutes = require("./routes/file.routes");

const { initAdmin } = require("./controllers/admin.controller");
const { initgrades} = require("./controllers/grade.controller")
const cors = require("cors");



require('dotenv').config();

const app = express();

// Allow all origins (not recommended for production)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/teachers", teacherRoutes);
app.use("/cours",courRoutes)
app.use('/users', userRoutes);
app.use('/student', studentRoutes);
app.use("/promo", promoRoutes);
app.use("/grades", gradeRoutes);
app.use("/modules", moduleRoutes);
app.use("/resources",resourceRoutes)
app.use("/files", fileRoutes);
initgrades();
initAdmin();

sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error('Database sync error:', err));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
