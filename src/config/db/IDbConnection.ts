export interface IDbConnectionSingleton {
  init(): Promise<void>;
}
