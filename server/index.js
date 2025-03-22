import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';
import path from "path";


const app = express();

app.use(cors());
app.use('/', router);

const PORT = 8000;

const __dirname = path.resolve(); // Correctly using Node's built-in variable

DBConnection();

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "/client/build")));

// Wildcard route for serving React app for all undefined routes
app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));