export class Message{
    public message_id:number
    public user_id:number
    public chat_id:number
    public text:string
    public date:Date    
    
constructor(message_id:number, user_id:number, chat_id:number, text:string, date:Date){

    this.message_id=message_id;
    this.user_id=user_id;
    this.chat_id=chat_id;
    this.text=text;
    this.date=date;
    
    }
}