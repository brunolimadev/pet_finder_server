import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

async function createConn() {
  const connectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
    namingStrategy: new SnakeNamingStrategy(),
  });

  const conn = await createConnection(connectionOptions);

  return conn;
}

createConn();
