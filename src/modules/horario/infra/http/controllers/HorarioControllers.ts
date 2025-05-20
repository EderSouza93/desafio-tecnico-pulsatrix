import AppError from "@shared/errors/AppError";
import { Request, Response } from "express"
import { CreateHorarioService } from "src/modules/horario/services/CreateHorarioService";
import { DeleteHorarioService } from "src/modules/horario/services/DeleteHorarioService";
import { ListHorariosDisponiveisService } from "src/modules/horario/services/ListHorarioService";
import ShowHorarioService from "src/modules/horario/services/ShowHorarioService";
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
        let { medico_id, data, hora_inicio, hora_fim } = request.body;


        if (data instanceof Date) {
            data = data.toISOString().split('T')[0]
        }
         else {
            throw new AppError('Data inválida no corpo da requisição.', 400)
       }


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
        const medico_id = request.usuario.id;

        const deleteHorario = container.resolve(DeleteHorarioService);

        await deleteHorario.execute(Number(id), medico_id);

        response.status(204).send()
    }

    public async show(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const showHorario = container.resolve(ShowHorarioService);
        const horario = await showHorario.execute({ id: Number(id) });
        response.json(horario)
    }
}