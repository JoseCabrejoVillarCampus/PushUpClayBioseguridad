import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import appProveedor from './routes/ProveedorRoutes.js';
import appPais from './routes/PaisRoutes.js';
import appDepartamento from './routes/DepartamentoRoutes.js';
import appMunicipio from './routes/MunicipioRoutes.js';
import appCargos from './routes/CargosRoutes.js';
import appEmpleado from './routes/EmpleadoRoutes.js';

dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(cookieParser());
appExpress.use("/proveedores", appProveedor);
appExpress.use("/paises", appPais);
appExpress.use("/departamentos", appDepartamento);
appExpress.use("/municipios", appMunicipio);
appExpress.use("/cargos", appCargos);
appExpress.use("/empleados", appEmpleado);

const config = JSON.parse(process.env.MY_CONGIG);
appExpress.listen(config,
    ()=>console.log(`http://${config.hostname}:${config.port}`));