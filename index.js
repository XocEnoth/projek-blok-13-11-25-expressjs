import express from "express";
import routes from "./src/routes.js";

const app = express();
const port = 3000;

app.use(express.json());

routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
