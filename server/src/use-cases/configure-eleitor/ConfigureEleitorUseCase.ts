import { ISistemaEleitoralRepository } from "../../repositories/ISistemaEleitoralRepository";
import { IConfigureEleitorDTO } from "./ConfigureEleitorDTO";

export class ConfigureEleitorUseCase {


    constructor(private sistemaEleitoralRepository: ISistemaEleitoralRepository) {
        
    }

    async execute(data :IConfigureEleitorDTO){
        switch (data.method) {
            case "anexar":
                    
                break;
            case "remover":
                    
                    break;
            default:
                break;
        }
    }
}