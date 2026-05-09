const express = require("express"); 
const fileRoutes = require("./routes/fileRoutes"); 
const app = express(); 
app.use("/api", fileRoutes); 
app.listen(3000, () => { console.log("Server running on port 3000"); 
    
});