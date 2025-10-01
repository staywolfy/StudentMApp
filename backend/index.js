import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import routes from './routes/routes.js';
import path from "path";

const app = express();
dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOptions = {
  origin: 'https://studentapp.i-tech.net.in',
  credentials: true
}
app.use(cors(corsOptions));



// API Routes
app.use("/api/v1/routes",routes);

// Serve React Frontend
// Serve React build from ../frontend/dist
const clientBuildPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(clientBuildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
