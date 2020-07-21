export class Product {
    public product_id: number;
    public name: string;
    public descripcion: string;
    public categoria: string;
    public user_id: number;
    public image: string;
    
    constructor(product_id: number, name: string, descripcion: string, categoria: string, user_id: number, image: string)
    {
        this.product_id = product_id;
        this.name= name;
        this.descripcion = descripcion;
        this.categoria= categoria;
        this.user_id= user_id;
        this.image= image;
    }
}