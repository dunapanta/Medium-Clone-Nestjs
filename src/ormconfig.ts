import { dirname } from 'path/posix';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'daniel',
  password: 'dragon',
  database: 'mediumclone',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
