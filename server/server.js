import express from 'express';
import cors from 'cors';
import router from './routes/router.js'; // Import main router
import deleteRouter from './routes/deleteRouter.js';
import eventsRouter from './routes/eventRouter.js';
import eventsHomeRouter from './routes/eventsHomeRouter.js';
import createEvent from './routes/createEvent.js';
import eventSideBarRouter from './routes/eventSideBar.js';
import cadetRouter from './routes/cadetRouter.js';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve images statically from uploads folder


// Use the routes
app.use('/api', router);
app.use('/api', deleteRouter);
app.use('/api', eventsRouter);
app.use('/api', eventsHomeRouter);
app.use('/api', createEvent);
app.use('/api', eventSideBarRouter);
app.use('/api', cadetRouter);

// Server start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
