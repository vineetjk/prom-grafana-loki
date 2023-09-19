import express, { Request, Response } from "express";
import { doHeavyTask } from './utils.js';
const PORT = process.env.PORT || 8000;
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to prom-grafana-loki" });
});

app.get("/slow", async (req: Request, res: Response) => {
    try {
        const timeTaken = await doHeavyTask();
        return res.json({
            status: "Success",
            message: `Heavy task completed in ${timeTaken}ms`
        });
    } catch (error) {
        return res.status(500).json({ status: "Error", error: "Internal server Error" });
    }
})

app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
})

