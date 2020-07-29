import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldPetImage1596023001194
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pets',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pets', 'image');
  }
}
