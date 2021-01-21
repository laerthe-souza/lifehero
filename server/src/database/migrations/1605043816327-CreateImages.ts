import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateImages1605043816327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_image',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'key',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'url',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'incident_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'OngId',
            columnNames: ['incident_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_incident',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_image');
  }
}
