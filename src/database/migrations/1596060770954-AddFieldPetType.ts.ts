import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldPetType1596060770954
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pets',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pets', 'type');
  }
}
