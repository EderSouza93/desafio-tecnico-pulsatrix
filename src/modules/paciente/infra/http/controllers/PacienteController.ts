import { Request, Response } from "express";
import { CreatePacienteService } from "src/modules/paciente/services/CreatePacienteService";
import { container } from "tsyringe";

export class PacienteController {
    public async create(request: Request, response: Response): Promise<void> {
        const { telefone, data_nascimento } = request.body;
        const id = Number(request.body.id)

        const createPaciente = container.resolve(CreatePacienteService);

        const paciente = await createPaciente.execute({ id, telefone, data_nascimento });

        response.status(201).json(paciente);
    }
}