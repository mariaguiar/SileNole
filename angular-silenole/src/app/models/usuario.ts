export class Usuario {
    public name:string;
    public password:string;
    public email:string;
    public comunidad: string;
    public provincia:string;
    public localidad:string;
    public cp:number;

    constructor(name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
        this.name = name;
        this.password = password;
        this.email = email;
        this.comunidad = comunidad;
        this.provincia = provincia;
        this.localidad = localidad;
        this.cp = cp;
    }
}
