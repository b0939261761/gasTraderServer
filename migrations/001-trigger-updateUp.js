const functionName = 'updateAtTimestamp';

export const up = knex => knex.raw(`
  CREATE OR REPLACE FUNCTION "${functionName}"() RETURNS TRIGGER AS $$
    BEGIN
      NEW."updatedAt" := CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ LANGUAGE PLPGSQL;
`);

export const down = knex => knex.raw(`
  DROP FUNCTION IF EXISTS "${functionName}"() CASCADE;
`);

export default { up, down };
