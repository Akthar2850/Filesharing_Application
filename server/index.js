import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';
import path from "path";


const app = express();

app.use(cors());
app.use('/', router);

const PORT = 8000;

const _dirname = path.resolve();

DBConnection();

app.use(express.static(path.join(_dirname, "/client/build")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
})

app.listen(PORT,()=> console.log(`Server is running on PORT ${PORT}`));