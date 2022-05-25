import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";

@Controller("/salida")
export class SalidaController {
  @Get("/")
  get() {
    return "hello";
  }
}
