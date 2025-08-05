import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";
import mySqlPool from "./db/db.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";



dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;

app.use('/api-docs' , swaggerUi.serve , swaggerUi.setup(swaggerJsdoc))

// Establishing Database Connection

mySqlPool.query("SELECT 1")
.then( () => {
    
    console.log("MySQL DB Connection successful");
    
     
    app.listen(port , ()=> {
        console.log(`Server successfully running on port: ${port}`);
        
    })
}
    
).catch(err => console.log("MySQL Database connection Failed",err)
)
