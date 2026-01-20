import express from "express";
const app = express();
app.get("/", (req, res) => {
    res.json({
        message: "Test Route",
    });
});
app.listen(8000, function () {
    console.log("Server is listening on PORT:8000");
});
//# sourceMappingURL=index.js.map