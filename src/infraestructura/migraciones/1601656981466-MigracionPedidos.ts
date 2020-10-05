import {MigrationInterface, QueryRunner} from "typeorm";

export class MigracionPedidos1601656981466 implements MigrationInterface {
    name = 'MigracionPedidos1601656981466'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `pedido` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(50) NOT NULL, `celular` varchar(13) NOT NULL, `direccion` varchar(100) NOT NULL, `fechaCreacion` datetime NOT NULL, `fechaPago` datetime NULL, `detalle` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `rango-fechas` (`id` int NOT NULL AUTO_INCREMENT, `desde` datetime NOT NULL, `hasta` datetime NOT NULL, `activa` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("INSERT INTO `rango-fechas` (`desde`, `hasta`, `activa`) VALUES ('2020-10-01 12:00:00', '2020-10-31 12:00:00', true);", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `rango-fechas`", undefined);
        await queryRunner.query("DROP TABLE `pedido`", undefined);
    }

}
