import { Request, Response } from "express"
import { UpdateStatusAgendamentoService } from "src/modules/agendamento/services/UpdateStatusAgendamentoService";
import { CreateAgendamentoService } from "src/modules/agendamento/services/CreateAgendamentoService";
import { ListAgendamentosService } from "src/modules/agendamento/services/ListAgendamentosServices";
import { container } from "tsyringe";

export class AgendamentoController {
    public async create(request: Request, response: Response): Promise<void> {
        const paciente_id = request.usuario.id
        const { medico_id, data, hora_inicio, hora_fim } = request.body;

        const service = container.resolve(CreateAgendamentoService);

        const agendamento = await service.execute({
            paciente_id,
            medico_id,
            data,
            hora_inicio,
            hora_fim
        });

        response.status(201).json(agendamento);
    }

    public async list(request: Request, response: Response): Promise<void> {
        const paciente_id = request.usuario.id;

        const list = container.resolve(ListAgendamentosService);
        const agendamentos = await list.execute(paciente_id);
        
        response.json(agendamentos)
    }

    public async updateStatus(request: Request, response: Response): Promise<void> {
        const usuario_id = request.usuario.id;
        const { id } = request.params;
        const { status } = request.body;

        const service = container.resolve(UpdateStatusAgendamentoService);

        await service.execute({
            agendamento_id: Number(id),
            usuario_id,
            status,
        });

        response.status(204).send()

    }
 }