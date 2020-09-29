const tableName = 'Users';

export const up = knex => knex.raw(`
  CREATE TABLE "${tableName}" (
    id VARCHAR(9) PRIMARY KEY,
    token VARCHAR(254) NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  COMMENT ON table "${tableName}" IS 'Пользователи';
  COMMENT ON COLUMN "${tableName}".id IS 'Уникальный идентификатор';
  COMMENT ON COLUMN "${tableName}".token IS 'Refresh token';
  COMMENT ON COLUMN "${tableName}"."createdAt" IS 'Дата создания записи';
  COMMENT ON COLUMN "${tableName}"."updatedAt" IS 'Дата обновления записи';

  CREATE TRIGGER "${tableName}UpdateAt"
    BEFORE UPDATE ON "${tableName}"
      FOR EACH ROW EXECUTE PROCEDURE "updateAtTimestamp"();

  COMMENT ON TRIGGER "${tableName}UpdateAt" ON "${tableName}" IS 'Изменение даты обновления записи';
`);

export const down = knex => knex.raw(`
  DROP TABLE IF EXISTS "${tableName}";
`);

export default { up, down };
