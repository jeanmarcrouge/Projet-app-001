const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const regulationRoutes = require('./routes/regulationRoutes');
const deadlineRoutes = require('./routes/deadlineRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const preRegistrationRoutes = require('./routes/preRegistrationRoutes');

const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');
const { startDeadlineNotifications } = require('./services/notificationService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'saas-compliance-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/regulations', regulationRoutes);
app.use('/api/deadlines', deadlineRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/preregistrations', preRegistrationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
  startDeadlineNotifications();
});
