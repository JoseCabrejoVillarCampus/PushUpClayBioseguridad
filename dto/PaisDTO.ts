import {Expose, Type, Transform} from 'class-transformer';
import {IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString, IsDate} from 'class-validator';
export class PaisDTO{
    @Expose ({name: 'Id'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El Proveedor incumple los parametros acordados`};}, {toClassOnly:true})
    Id: number;

    @Expose ({name: 'nombre'})
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(value)) return value; else throw {status:400, message: `El dato nombre incumple los parametros acordados`};}, {toClassOnly:true})
    nombre: string;
    
    constructor (Id:number,nombre:string){
        this.Id = Id;
        this.nombre = nombre;
    }
}