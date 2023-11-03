import expressQueryBoolean from "express-query-boolean";
import session from "express-session";
import mysql from "mysql2";
import { Router } from "express";
import { SignJWT, jwtVerify } from "jose";
import proxyTipoPersona from "../middleware/TipoPersonaMiddleware.js";

const appTipoPersona = Router();
let con = undefined;

appTipoPersona.use("/:id?", async(req, res, next)=>{
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

appTipoPersona.use((req, res, next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appTipoPersona.use(expressQueryBoolean());
const getTipoPersonaById = (id)=>{
    return new Promise((resolve, reject)=>{
        const sql = [`SELECT * FROM tipo_persona WHERE Id = ?`, id];
        con.query(...sql, (err, data)=>{
            if(err){
                reject(err);
            } else {
                resolve (data);
            }
        })
    })
};
appTipoPersona.get("/:id?", proxyTipoPersona, async(req, res)=>{
    try {
        const {id} = req.query;
        if (id){
            const data= await getTipoPersonaById(id);
            res.send(data);
        } else {
            const sql = [`SELECT * FROM tipo_persona`];
            con.query(...sql,(err, data)=>{
                if (err){
                    console.error("Ocurrio un error intentando traer los datos de TipoPersona", err.message);
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

appTipoPersona.post("/", proxyTipoPersona, async (req, res)=>{
    con.query(
        /*sql*/
        `INSERT INTO tipo_persona SET = ?`,
        await getBody(req),
        (err, result)=>{
            if (err){
                console.error('Error al crear TipoPersona: ', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
        )
});

appTipoPersona.put("/:id", proxyTipoPersona, async (req,res)=>{
    const jwt = req.session.jwt;
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
        jwt, encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`UPDATE tipo_persona SET ? WHERE Id = ?`), [jwtData.payload.body, jwtData.payload.params.id],
        (err, result)=>{
            if(err){
                console.error('Error al actualizar TipoPersona: ', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
});

appTipoPersona.delete("/:id", async (req, res)=>{
    const jwt = req.session.jwt;
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
        jwt, encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM tipo_persona WHERE Id = ?`,jwtData.payload.paramas.id,
        (err, info)=>{
            if(err){
                console.error(`Error al eliminar TipoPersona ${req.params.id}: `, err.message);
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

export default appTipoPersona;