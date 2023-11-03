import {Expose, Type, Transform} from 'class-transformer';
import {IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString, IsDate} from 'class-validator';
export class ClienteDTO{
    @Expose ({name: 'Id'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El Proveedor incumple los parametros acordados`};}, {toClassOnly:true})
    Id: number;

    @Expose ({name: 'nombre'})
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(value)) return value; else throw {status:400, message: `El dato nombre incumple los parametros acordados`};}, {toClassOnly:true})
    nombre: string;

    @Expose ({name: 'IdCliente'})
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(value)) return value; else throw {status:400, message: `El dato IdCliente incumple los parametros acordados`};}, {toClassOnly:true})
    IdCliente: string;

    @Expose ({name: 'IdTipoPersonaFk'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El dato IdTipoPersonaFk incumple los parametros acordados`};}, {toClassOnly:true})
    IdTipoPersonaFk: number;

    @Expose ({name: 'fechaRegistro'})
    @IsDate()
    fechaRegistro: Date;

    @Expose ({name: 'IdMunicipioFk'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El dato IdMunicipioFk incumple los parametros acordados`};}, {toClassOnly:true})
    IdMunicipioFk: number;
    
    constructor (Id:number,nombre:string, IdCliente:string ,IdTipoPersonaFk:number, fechaRegistro: Date, IdMunicipioFk:number){
        this.Id = Id;
        this.nombre = nombre;
        this.IdCliente = IdCliente;
        this.IdTipoPersonaFk = IdTipoPersonaFk;
        this.fechaRegistro = fechaRegistro;
        this.IdMunicipioFk = IdMunicipioFk;
    }
}