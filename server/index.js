import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';
import path from "path";

const app = express();
const __dirname = path.resolve(); // if not already defined

app.use(cors());
app.use('/', router);

// ✅ Add this line below
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

DBConnection();

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
