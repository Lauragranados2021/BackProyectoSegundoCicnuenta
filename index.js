const express= require('express');
const cors = require('cors');


require("./drivers/conect-db");
const app = express();
app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use("/servicio",require("./routes/route-servicio"));
app.use("/propietario",require("./routes/route-propietario"));
app.use("/mascota",require("./routes/route-mascota"));
app.use("/registro",require("./routes/route-registro"));
app.use("/",(req,res)=>
res.send("Back Proyecto segundo cincuenta")
);
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});
