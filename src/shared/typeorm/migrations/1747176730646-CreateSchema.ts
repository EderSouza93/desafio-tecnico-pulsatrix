import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateSchema1747176730646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "usuario_tipo_enum" AS ENUM('MEDICO', 'PACIENTE')`);

        await queryRunner.createTable(new Table({
            name: 'usuario',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'nome', type: 'varchar' },
                { name: 'email', type: 'varchar', isUnique: true },
                { name: 'senha_hash', type: 'varchar' },
                { name: 'tipo', type: 'usuario_tipo_enum' },
                { name: 'criado_em', type: 'timestamp', default: 'now()' },
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'medico',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true },
                { name: 'especialidade', type: 'varchar' },
                { name: 'crm', type: 'varchar' },
            ],
        }));

        await queryRunner.createForeignKey('medico', new TableForeignKey({
            columnNames: ['id'],
            referencedTableName: 'usuario',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createTable(new Table({
            name: 'paciente',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true },
                { name: 'telefone', type: 'varchar' },
                { name: 'data_nascimento', type: 'date' },
            ],
        }));

        await queryRunner.createForeignKey('paciente', new TableForeignKey({
            columnNames: ['id'],
            referencedTableName: 'usuario',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createTable(new Table({
            name: 'horario_disponivel',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'medico_id', type: 'integer' },
                { name: 'data', type: 'date' },
                { name: 'hora_inicio', type: 'time' },
                { name: 'hora_fim', type: 'time' },
                { name: 'criado_em', type: 'timestamp', default: 'now()' },
            ],
        }));

        await queryRunner.createForeignKey('horario_disponivel', new TableForeignKey({
            columnNames: ['medico_id'],
            referencedTableName: 'medico',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createTable(new Table({
            name: 'agendamento',
            columns: [
                { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'paciente_id', type: 'integer' },
                { name: 'medico_id', type: 'integer' },
                { name: 'data', type: 'date' },
                { name: 'hora_inicio', type: 'time' },
                { name: 'hora_fim', type: 'time' },
                { name: 'criado_em', type: 'timestamp', default: 'now()' },
            ],
        }));

        await queryRunner.createForeignKey('agendamento', new TableForeignKey({
            columnNames: ['paciente_id'],
            referencedTableName: 'paciente',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('agendamento', new TableForeignKey({
            columnNames: ['medico_id'],
            referencedTableName: 'medico',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createIndex('agendamento', new TableIndex({
            name: 'IDX_agendamento_unico',
            columnNames: ['medico_id', 'data', 'hora_inicio', 'hora_fim'],
            isUnique: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('agendamento', 'IDX_agendamento_unico');
        await queryRunner.dropTable('agendamento');
        await queryRunner.dropTable('horario_disponivel');
        await queryRunner.dropTable('paciente');
        await queryRunner.dropTable('medico');
        await queryRunner.dropTable('usuario');
        await queryRunner.query(`DROP TYPE IF EXISTS "usuario_tipo_enum"`);
    }

}
