import { Request, Response } from "express";
import { CreateMedicoService } from "src/modules/medico/services/CreateMedicoService";
import { container } from "tsyringe";

export class MedicoController {
    public async create(request: Request, response: Response): Promise<void> {
        const { id, especialidade, crm } = request.body;

        const createMedico = container.resolve(CreateMedicoService);

        const medico = await createMedico.execute({ id, especialidade, crm });

        response.status(201).json(medico)
    }
}