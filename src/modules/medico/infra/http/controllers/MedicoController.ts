import { Request, Response } from "express";
import { CreateMedicoService } from "src/modules/medico/services/CreateMedicoService";
import { ListMedicosService } from "src/modules/medico/services/ListMedicosServices";
import ShowMedicoService from "src/modules/medico/services/ShowMedicoService";
import { container } from "tsyringe";

export class MedicoController {
    public async create(request: Request, response: Response): Promise<void> {
        const { especialidade, crm } = request.body;
        const id = Number(request.body.id)

        const createMedico = container.resolve(CreateMedicoService);

        const medico = await createMedico.execute({ id, especialidade, crm });

        response.status(201).json(medico)
    }

    public async index(request: Request, response: Response): Promise<void> {
        const {nome, especialidade} = request.query
        const service = container.resolve(ListMedicosService);
        const medicos = await service.execute();
        response.json(medicos);
    }

    public async show(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const service = container.resolve(ShowMedicoService);
        const medico = await service.execute({ id });
        response.json(medico);
    }

}