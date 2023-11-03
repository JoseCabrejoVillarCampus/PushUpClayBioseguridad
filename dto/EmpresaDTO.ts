import {Expose, Type, Transform} from 'class-transformer';
import {IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString, IsDate, IsNotEmpty} from 'class-validator';
export class EmpresaDTO{
    @Expose ({name: 'Id'})
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value)||value ==undefined) return Math.floor(value); else throw {status:400, message: `El Proveedor incumple los parametros acordados`};}, {toClassOnly:true})
    Id: number;

    @Expose ({name: 'nit'})
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(value)) return value; else throw {status:400, message: `El dato nit incumple los parametros acordados`};}, {toClassOnly:true})
    nit: string;

    @Expose ({name: 'razon_social'})
    @IsNotEmpty()
    razon_social: Text;

    @Expose ({name: 'representante_legal'})
    @IsString()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(value)) return value; else throw {status:400, message: `El dato representante_legal incumple los parametros acordados`};}, {toClassOnly:true})
    representante_legal: string;

    @Expose ({name: 'FechaCreacion'})
    @IsDate()
    FechaCreacion: Date;

    @Expose ({name: 'IdMunicipioFk'})
    @IsNumber()
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9]+$/.test(value)) return value; else throw {status:400, message: `El dato IdMunicipioFk incumple los parametros acordados`};}, {toClassOnly:true})
    IdMunicipioFk: number;
    
    constructor (Id:number, nit:string,razon_social:Text,representante_legal:string,FechaCreacion:Date,IdMunicipioFk:number){
        this.Id = Id;
        this.nit = nit;
        this.razon_social = razon_social;
        this.representante_legal = representante_legal;
        this.FechaCreacion = FechaCreacion;
        this.IdMunicipioFk = IdMunicipioFk;
    }
}