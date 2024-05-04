const express = require("express");
const mongoose = require("mongoose");
//Damos acceso a poder declarar variables de ambiente
require("dotenv").config();
//Importamos las rutas que estan siendo exportadas desde la carpeta de rutas
const bikeRoutes = require("./routes/bikes.routes");

const app = express();
const PORT = process.env.PORT || 3002


//middleware
app.use(express.json());
app.use("/api", bikeRoutes);

//autenticación
const isAuth = async (req, res, next) => {
    try {
        //req.params, req.url, req.body
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(400).json({ message: "No hay token" })
        }
        const token = auth.split(" ")[1];
        const tokenVerified = verifyToken(token)
        console.log(tokenVerified)
        if (!tokenVerified._id) {
            return res.status(400).json({ message: "Token  incorrecto" })
        }
        const userProfile = await User.findById(tokenVerified._id)

        req.userProfile = userProfile;
        next()

    } catch (error) {
        console.log(error)
    }
};


//Rutas ¿..?
app.get("/", (req, res) => {
    res.send("Welcome to my proyect")
});


//Server.use("/user", router);


//Conectando mongoose (Usando variables de entorno)
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to my MongoDB Atlas"))
.catch((error) => console.error(error));


app.listen(PORT, () =>
    console.log("server listening on port", PORT)
);