import {Injectable} from "@tsed/di";
import { GoogleService } from "./GoogleService";

@Injectable()
export class SalidaService {
    constructor(private sheet:GoogleService){  }
    async agregarRegistro(data:any){
        this.sheet.sheetName="SALIDA"
         
         return await this.sheet.create({values:data})
        
    }

}
