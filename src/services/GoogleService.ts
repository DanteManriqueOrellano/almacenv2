import {Injectable} from "@tsed/di";
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet, ServiceAccountCredentials } from 'google-spreadsheet';

export interface Context {
    dataSources: {
        basecrud: GoogleService;//el crud debe tener el mismo nosmbre que el que se encuentra en el datasource de apollo.
    };
}
export type createInput<T> = {
    values: {[header: string]: string | number | boolean }
}

interface IDatabase {
    create<T>(input: createInput<T>, id?: string): Promise<any>;
    /*deleteById(id: string): Promise<string>;
    findById(id: string): Promise<any>;
    listAll(): Promise<any[]>;
    update<T>(input: createInput<T>, id?: any): Promise<any>*/
}



@Injectable()
export class GoogleService implements IDatabase {
    public sheetName:string; 
    private doc:GoogleSpreadsheet;
    private credentials:ServiceAccountCredentials;

    async create<T>(input: createInput<T>): Promise<any> {
        let sheet = await this.loadSheet(this.sheetName)
        sheet.addRow(input.values)
    }
    /*
    async deleteById(id: string): Promise<string> {
        
    }
    async findById(id: string): Promise<any> {
        
    }
    async listAll(): Promise<any[]> {
        
    }
    async update<T>(input: createInput<T>, id?: any): Promise<any> {
        
    }
    */
    
    private async loadSheet(sheetName:string):Promise<GoogleSpreadsheetWorksheet>{
        this.doc = new GoogleSpreadsheet("1Smlg0vdnDPWPdQ_6023ex9OTwnMwVjgtfjEQyIuPQGA");
        this.credentials = {
      
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC79EZLvGaZgqLe\n1I4boyNeW9AvlH48c/0LvIWSHuO33gf8lxcFH/08CSGmVlqJLEcHohKyYLTlYzrZ\nDJ+ARUsl+UAugSGxwfQQRZLCiE05QSBsrNCqGn5dhN4hQLOHNqUzo7pYvqoj+4tU\nVwtrvxv4S96A/TiMv3PDZweaIcQQNEZ6zl59dR/M/xRSciQFnJ7VCk2WlgQWyF21\nJugKPt6Oc+z7E0kcRpM1zCW+9jdrV+6ALyddSDDUYBgOYPkw/FFYLNY+nGN3BeMR\n28naPcoW85Febmw9hrFrzJqwN1qPTrB0XuGUj2n3Kqh6AW98Vit0AUr/WeIrloAF\n+4unhTIrAgMBAAECggEAGqidld1tkgV483EjjOD5Qcd1AmKl+w4ajKEbMuwFsY0h\nBd8qSTRN10eWScECy2UH2BnRXBKiZczKyoFjWC6753FwfIgdTtirNOmhVM0/YskN\nf8yNNitW1A3l8cJ7FEkYanglFLRKbpsdmoNUH9616WRddV81N6VqFoOVDPQQGpoJ\nPRr1MUr46HZE/kL+Azz/ZA2/HxXZTm0vCAPK1ElMUya5BsPD1kbJ0nfX3e5mjTK0\n5QZ5rTAbKQ+Da5IUL9VQiSWWX5UfCFE9Vl2kXIxFJqhvHyR304dbSL7KsbLJ0FjN\n7TJHfT2U/iNlI3FV/nHuswk/zCq2JhCw2aYSbUOT0QKBgQDmtAfRw1go0uUsflMH\n4kssK2tKba3RmFI1Vih/Q+KyYQ3Iq9LTXZspkpXjGO9w/WALtW5R56mDpFf0wj8W\n2kYI7+SUJ07tZvMsaIcFCzjDh++uhjXuECUjFuzL6UwcC/BH9XjJ/Ouz4f1iMRA0\nNVZ+MppAmvoDTi9nqJcmxmZo2wKBgQDQkEEb9Ou0HHPk+jI+KFSHYprc2yJhAHci\n9DYkJHmmu49rcj9T9zFBXd/7PjTPHaPivoryI1l1WGMeE4J8861rIvlTzvfnhDBb\nNhb2WSheNRSN020b+5VWM6ieaqxpLtg5iiSvmZfHqTxxC6qCkjoSYkz6dl8sYgbp\n0AC83HA08QKBgQCCDcFOtfGv6du5rmj+S8qW1s9AAP545oaJfM2NmOZmKqJLmtlZ\nwC4lTHZktHze1GddkmTjlVYRWQcgepR4PIo4pYvVHSe4W04AndhntoDEcZBjcVNb\npgxZcKYC+bynHu/QkQgLziHNoTtnLEN3Ow5MTBh7DSKd1GiS5g53lGbM+wKBgDrx\nqhUWoU7kA7UhKPX8O/ePXKkynYLAuOr+Dhck3+TJeX0qas92O0t4FodRS2eFvv2k\nUGyipPPPKSQk62oZDFgNKF4RTmr2JxyAKvkwtYH6inaS3HFeJxSXwP4Us+l+Pcn1\nSuz+AbGCGPzyCRyh6xurAIqAzeEjS0Tlbm/x9RxhAoGBAMy1/S0BREC32tXuIU1X\ndL2Pm6MDhfUJWa7UaxkKwx5p6efzsS3ocMShEAaZG4mZTXnU2HkifA0jTcpzcsQN\ntpU4fSDKDuETghaA3vSwWt+CCg7DnyYP8F33WPz1MKKZMYm0PU08bVxarWE9yjeC\nCKL7HE5JPpKJfC8hMvDM/yig\n-----END PRIVATE KEY-----\n",//String(process.env.GOOGLE_PRIVATE_KEY),
        "client_email": "googleserviceaccountaquasinfac@aquasinfactura.iam.gserviceaccount.com"
      
        }

        await this.doc.useServiceAccountAuth(this.credentials); 
        await this.doc.loadInfo();
        
        return this.doc.sheetsByTitle[sheetName]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
        
        
    }
    

}
