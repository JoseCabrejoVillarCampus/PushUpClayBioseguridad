import {Expose, Type, Transform} from 'class-transformer';
import {IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString, IsDate} from 'class-validator';
export class MunicipioDTO{
    @Expose ({name: 'Id'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El Municipio incumple los parametros acordados`};}, {toClassOnly:true})
    Id: number;

    @Expose ({name: 'nombre'})
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(value)) return value; else throw {status:400, message: `El dato nombre incumple los parametros acordados`};}, {toClassOnly:true})
    nombre: string;


    @Expose ({name: 'IdDepartamentoFk'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El dato IdDepartamentoFk incumple los parametros acordados`};}, {toClassOnly:true})
    IdDepartamentoFk: number;

    
    constructor (Id:number,nombre:string,IdDepartamentoFk:number){
        this.Id = Id;
        this.nombre = nombre;
        this.IdDepartamentoFk = IdDepartamentoFk;
    }
}