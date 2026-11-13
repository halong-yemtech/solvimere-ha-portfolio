import * as migration_20261113_170004_initial from './20261113_170004_initial';

export const migrations = [
  {
    up: migration_20261113_170004_initial.up,
    down: migration_20261113_170004_initial.down,
    name: '20261113_170004_initial'
  },
];
