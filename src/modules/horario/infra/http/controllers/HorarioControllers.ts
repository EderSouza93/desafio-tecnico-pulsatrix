import { Request, Response } from "express"
import { CreateHorarioService } from "src/modules/horario/services/CreateHorarioService";
import { ListHorariosDisponiveisService } from "src/modules/horario/services/ListHorarioService";
import { container } from "tsyringe";

export class HorarioController {
    public async index(request: Request, response: Response): Promise<void> {
        const { medico_id, data } = request.query;

        const list = container.resolve(ListHorariosDisponiveisService);

        const horarios = await list.execute(
            medico_id ? Number(medico_id) : undefined,
            data as string | undefined
        );

        response.json(horarios);
    }
    
    public async create(request: Request, response: Response): Promise<void> {
        const { medico_id, data, hora_inicio, hora_fim } = request.body;

        const createHorario = container.resolve(CreateHorarioService);

        const horario = await createHorario.execute({
            medico_id,
            data,
            hora_inicio,
            hora_fim,
        });

        response.status(201).json(horario)
    }

    public async delete(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const medico_id = request

    }
}