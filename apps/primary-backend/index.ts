import { prismaClient } from "db/client";
import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware";

const app = express();
app.use(express.json());
app.use(cors());

//TODO: add auth middleware
app.post("/project" , authMiddleware, async (req , res) => {
    const { prompt } = req.body;
    const userId = req.userId!;
    //TODO: add logi to get useful name for the project from the prompt
    const description = prompt.split("\n")[0];
    const project = await prismaClient.project.create({
        data: {
            description,
            userId
        }
    });
    res.json({projectId: project.id});
});

app.get("/projects" , authMiddleware , async (req , res) => {
    const userId = req.userId!;
    try {
        const projects = await prismaClient.project.findMany({
            where: {userId}
        });
        if (projects.length === 0) {
            res.status(400).json({error: "Project not found"});
            return;
        } 
        res.json({projects});
    } catch (error) {
        console.error("Error fetching projects", error);
        res.status(500).json({error: "Internal server error"});
    }
});

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});