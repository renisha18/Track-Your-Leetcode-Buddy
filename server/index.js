import express from "express";
import dotenv from "dotenv";
import pool, { testConnection } from "./db.js";
import authRoutes from './routes/auth.js'

dotenv.config();

const app = express();
const PORT = 5003;

pool.query("SELECT NOW()")
  .then(res => console.log("DB Connected:", res.rows[0]))
  .catch(err => console.error(err));
app.use(express.json());
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  testConnection();
});