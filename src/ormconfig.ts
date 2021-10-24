import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'daniel',
  password: 'dragon',
  database: 'mediumclone',
};

export default config;
