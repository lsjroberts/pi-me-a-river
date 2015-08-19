BEGIN TRANSACTION;
DROP TABLE IF EXISTS `rivers`;
DROP TABLE IF EXISTS `river_coordinates`;
DROP TABLE IF EXISTS `coordinates`;
CREATE TABLE "rivers" (
  `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
  `name`  VARCHAR(255),
  `source`  INTEGER,
  `mouth` INTEGER
);
CREATE TABLE "river_coordinates" (
  `riverId` INTEGER,
  `coordinateId`  INTEGER
);
CREATE TABLE `coordinates` (
  `id`  INTEGER PRIMARY KEY AUTOINCREMENT,
  `latitude`  NUMERIC,
  `longitude` NUMERIC
);
COMMIT;
