import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateContacts1601943170655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_contact',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'whatsapp',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ong_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'OngId',
            columnNames: ['ong_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_ong',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_contact');
  }
}
