import HttpFactory from '../factory';
import { IPlanetResponse } from './types';

class PlanetModule extends HttpFactory {
  private RESOURCE = 'https://swapi.dev/api/planets';

  async get(params: string): Promise<IPlanetResponse> {
    return await this.call<IPlanetResponse>('GET', `${this.RESOURCE}/?${params}`);
  }
}

export default PlanetModule;