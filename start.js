import app from "./app";

const PORT = 3000;
app.listen(PORT, function() {
    console.log(`✔️   PORT No.${PORT}`);
    console.log(`✔️   http://localhost:${PORT}/`);
});