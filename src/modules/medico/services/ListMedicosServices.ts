import { inject, injectable } from "tsyringe";
import { IMedicoRepository } from "../domain/repositories/IMedicoRepository";

@injectable()
export class ListMedicosService {
    constructor(
        @inject('MedicoRepository')
        private medicoRepository: IMedicoRepository
    ) { }
    
    public async execute() {
        return this.medicoRepository.findAll();
    }
}