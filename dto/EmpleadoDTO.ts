import {Expose, Type, Transform} from 'class-transformer';
import {IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString, IsDate} from 'class-validator';
export class EmpleadoDTO{
    @Expose ({name: 'Id'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El Proveedor incumple los parametros acordados`};}, {toClassOnly:true})
    Id: number;

    @Expose ({name: 'nombre'})
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(value)) return value; else throw {status:400, message: `El dato nombre incumple los parametros acordados`};}, {toClassOnly:true})
    nombre: string;

    @Expose ({name: 'IdCargoFk'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El dato IdCargoFk incumple los parametros acordados`};}, {toClassOnly:true})
    IdCargoFk: number;

    @Expose ({name: 'fecha_igreso'})
    @IsDate()
    fecha_igreso: Date;

    @Expose ({name: 'IdMunicipioFk'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El dato IdMunicipioFk incumple los parametros acordados`};}, {toClassOnly:true})
    IdMunicipioFk: number;
    
    constructor (Id:number,nombre:string,IdCargoFk:number, fecha_igreso: Date, IdMunicipioFk:number){
        this.Id = Id;
        this.nombre = nombre;
        this.IdCargoFk = IdCargoFk;
        this.fecha_igreso = fecha_igreso;
        this.IdMunicipioFk = IdMunicipioFk;
    }
}