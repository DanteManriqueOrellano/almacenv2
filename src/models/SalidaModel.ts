import {Property} from "@tsed/schema";

export class SalidaModel {
  @Property()
  idsalida: string;
  @Property()
  nroficharequerimiento:number;
  @Property()
  infcomplementaria:string
  @Property()
  idinsumo:string
  @Property()
  cantidad:number;
  @Property()
  obs:string;
  @Property()
  fechasalida:string
}
