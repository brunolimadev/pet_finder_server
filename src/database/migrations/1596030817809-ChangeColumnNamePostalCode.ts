import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeColumnNamePostalCode1596030817809
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users RENAME COLUMN "postalCode" TO postal_code`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users RENAME COLUMN postal_code TO "postalCode"`,
    );
  }
}
