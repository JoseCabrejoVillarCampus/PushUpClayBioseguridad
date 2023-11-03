import {Expose, Type, Transform} from 'class-transformer';
import {IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString, IsDate} from 'class-validator';
export class CargosDTO{
    @Expose ({name: 'Id'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El Proveedor incumple los parametros acordados`};}, {toClassOnly:true})
    Id: number;

    @Expose ({name: 'descripcion'})
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(value)) return value; else throw {status:400, message: `El dato descripcion incumple los parametros acordados`};}, {toClassOnly:true})
    descripcion: string;

    @Expose ({name: 'sueldo_base'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El dato sueldo_base incumple los parametros acordados`};}, {toClassOnly:true})
    sueldo_base: number;
    
    constructor (Id:number,descripcion:string,sueldo_base:number){
        this.Id = Id;
        this.descripcion = descripcion;
        this.sueldo_base = sueldo_base;
    }
}