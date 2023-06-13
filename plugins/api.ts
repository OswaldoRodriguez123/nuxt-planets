import { $fetch, FetchOptions } from 'ohmyfetch';
import { defineNuxtPlugin } from '#app';
import PlanetModule from '~/repository/modules/planets';

interface IApiInstance {
  planet: PlanetModule
}

export default defineNuxtPlugin(() => {

  const fetchOptions: FetchOptions = {}
  const apiFetcher = $fetch.create(fetchOptions);

  const modules: IApiInstance = {
    planet: new PlanetModule(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});