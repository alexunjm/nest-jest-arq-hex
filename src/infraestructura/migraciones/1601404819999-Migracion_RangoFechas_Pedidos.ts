import {MigrationInterface, QueryRunner} from "typeorm";

export class MigracionRangoFechasPedidos1601404819999 implements MigrationInterface {
    name = 'MigracionRangoFechasPedidos1601404819999'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `pedido` (`id` int NOT NULL AUTO_INCREMENT, `fechaCreacion` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `rango-fechas` (`id` int NOT NULL AUTO_INCREMENT, `desde` datetime NOT NULL, `hasta` datetime NOT NULL, `activa` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `rango-fechas`", undefined);
        await queryRunner.query("DROP TABLE `pedido`", undefined);
    }

}
