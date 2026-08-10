import 'dotenv/config';
import express from 'express';
import { keywordFilter } from "./lib/keywordFilter.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from "cors";

const app = express();

// CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

// Parse request bodies
app.use(express.json());
app.use(express.text());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Keyword Filter API',
            version: '1.0.0',
            description: 'A microservice for filtering keywords',
        },
        servers: [
            {
                url: `http://localhost:${process.env.LOCALHOST}`,
            },
        ],
    },
    apis: ['./src/index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
);

app.get('/', (req, res) => {
    res.send("Hello from Keyword Filter!");
});

/**
 * @swagger
 * /filter-keywords:
 *   post:
 *     summary: Filter a list of keywords
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - keywords
 *               - filter
 *             properties:
 *               keywords:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["action", "comedy", "drama"]
 *               filter:
 *                 type: string
 *                 example: "com"
 *     responses:
 *       200:
 *         description: Keywords filtered successfully
 *       400:
 *         description: Invalid or missing keyword filter parameters
 *       500:
 *         description: Unable to filter keywords
 */
app.post('/filter-keywords', (req, res) => {
    try {
        const { keywords, filter } = req.body;

        console.log("Keyword filter request:", req.body);

        if (!keywords || !filter || !filterType) {
            return res.status(400).json({
                error: "keywords, filter, and filterType are required"
            });
        }

        const data = keywordFilter(
            keywords,
            filter,
            filterType
        );

        console.log("Filtered keywords:", data);

        if (!data) {
            return res.status(400).json({
                error: "Unable to filter keywords with the provided parameters"
            });
        }

        return res.status(200).json({
            filteredKeywords: data
        });

    } catch (error) {
        console.error("Keyword filter route error:", error);

        return res.status(500).json({
            error: "Unable to filter keywords"
        });
    }
});

app.listen(process.env.LOCALHOST, () => {
    console.log(
        `Keyword Filter microservice listening on port ${process.env.LOCALHOST}`
    );
});