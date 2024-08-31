/// <reference types="vite/client" />

import { Env } from './env';

type ImportMetaEnv = Env;

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
