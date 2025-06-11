import express from 'express'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import connectDB from './utils/db.js'
import userRoute from './routes/user.route.js'
import courseRoute from './routes/course.route.js'
import mediaRoute from './routes/media.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env file in Server directory
dotenv.config({ path: path.join(__dirname, '../.env') })

const app = express()

const PORT = process.env.PORT || 3000

// default middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:"http://localhost:5173", // Replace with your frontend URL
    credentials: true // Allow cookies to be sent with requests
}))

//apis
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/media", mediaRoute)

// Serve static files from Client/dist
const clientPath = path.join(__dirname, '../Client/dist');
app.use(express.static(clientPath));

// Handle other routes by serving index.html
app.get("*", (req, res) => {
    const indexPath = path.join(clientPath, 'index.html');
    if (!indexPath) {
        return res.status(404).json({ message: "Can't find the client build files. Please run 'npm run build' first." });
    }
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});




app.listen(PORT, () => {
    connectDB()
    console.log(`Server listen at port ${PORT}`)
})