import expressQueryBoolean from "express-query-boolean";
import session from "express-session";
import mysql from "mysql2";
import { Router } from "express";
import { SignJWT, jwtVerify } from "jose";
import proxyCargos from "../middleware/CargosMiddleware.js";

const appCargos = Router();
let con = undefined;

appCargos.use("/:id?", async(req, res, next)=>{
    try {
        const encoder = new TextEncoder();
        const playload = { body: req.body, params: req.params, id: req.params.id};
        const jwtconstructor = new SignJWT(playload);
        const jwt = await jwtconstructor
            .setProtectedHeader({alg:"HS256", typ:"JWT"})
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.body = playload.body;
        req.session.jwt = jwt;
        const maxAgeInSeconds = 3600;
        res.cookie('token',jwt, {
            httpOnly: true, maxAge:maxAgeInSeconds * 1000
        });
        next();
    } catch (err) {
        console.error('Error al generar el JWT: ', err.message);
        res.sendStatus(500);
    }
});

appCargos.use((req, res, next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appCargos.use(expressQueryBoolean());
const getCargosById = (id)=>{
    return new Promise((resolve, reject)=>{
        const sql = [`SELECT * FROM cargos WHERE Id = ?`, id];
        con.query(...sql, (err, data)=>{
            if(err){
                reject(err);
            } else {
                resolve (data);
            }
        })
    })
};
appCargos.get("/:id?", proxyCargos, async(req, res)=>{
    try {
        const {id} = req.query;
        if (id){
            const data= await getCargosById(id);
            res.send(data);
        } else {
            const sql = [`SELECT * FROM cargos`];
            con.query(...sql,(err, data)=>{
                if (err){
                    console.error("Ocurrio un error intentando traer los datos de Cargos", err.message);
                    res.status(err.status || 500);
                } else {
                    res.send(data);
                }
            })
        }
    } catch (err) {
        console.error("Ocurrio un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});

appCargos.post("/", proxyCargos, async (req, res)=>{
    con.query(
        /*sql*/
        `INSERT INTO cargos SET = ?`,
        await getBody(req),
        (err, result)=>{
            if (err){
                console.error('Error al crear Cargos: ', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
        )
});

appCargos.put("/:id", proxyCargos, async (req,res)=>{
    const jwt = req.session.jwt;
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
        jwt, encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE cargos SET ? WHERE Id = ?`), [jwtData.payload.body, jwtData.payload.params.id],
        (err, result)=>{
            if(err){
                console.error('Error al actualizar Cargos: ', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
});

appCargos.delete("/:id", async (req, res)=>{
    const jwt = req.session.jwt;
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
        jwt, encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM cargos WHERE Id = ?`,jwtData.payload.paramas.id,
        (err, info)=>{
            if(err){
                console.error(`Error al eliminar Cargos ${req.params.id}: `, err.message);
                res.status(err.status);
            } else {
                res.send(info);
            }
        })
});

const getBody = async (req)=>{
    const jwt = req.session.jwt;
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
        jwt, encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    delete jwtData.payload.iat,
    delete jwtData.payload.exp;
    return jwtData.payload.body
}

export default appCargos;