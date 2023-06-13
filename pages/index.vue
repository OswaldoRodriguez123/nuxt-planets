<template>
  <v-card class="main pb-5">
    <v-container>
      <v-row class="pt-6">
        <v-col>
          <v-text-field style="background-color: white;" v-model="search" @input="setSearch" append-icon="mdi-magnify pr-5"
            label="Search by Name" single-line hide-details />
        </v-col>
      </v-row>

      <v-data-table-server v-model:items-per-page="itemsPerPage" v-model:options="options" :headers="headers"
        :items-length="totalPlanets" :items="planets" :loading="loading" :search="search" class="elevation-1"
        @update:page="setPage" @update:sort-by="setSort" items-per-page-text="" :items-per-page-options="[
          { value: 10, title: '10' },
        ]">
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="() => showPlanet(item.raw)"> mdi-eye </v-icon>
        </template>
        <template v-slot:item.population="{ item }">
          {{ parsePopulation(item.columns) }}
        </template>
      </v-data-table-server>
    </v-container>
  </v-card>
  <PlanetDialog :item="planet" :showDialog="showDialog" :closeDialog="closeDialog" />
</template>
<script lang="ts">
import debounce from '~/helpers/debounce';
import { Planet, SortBy, Options } from '~/types';

export default {
  name: 'index',
  data: () => ({
    search: "",
    itemsPerPage: 10,
    headers: [
      { title: 'Name', key: 'name' },
      { title: 'Climate', key: 'climate' },
      { title: 'Gravity', key: 'gravity' },
      { title: 'Terrain', key: 'terrain' },
      { title: 'Population', key: 'population' },
      { title: '', key: 'actions', sortable: false, },
    ],
    options: {
      search: "",
      sortBy: [],
      page: 1,
    } as Options,
    planets: [] as Planet[],
    planet: null as Planet | null,
    loading: true,
    totalPlanets: 0,
    showDialog: false,
  }),
  mounted() {
    this.loadPlanets();
  },
  methods: {
    async loadPlanets() {
      this.loading = true;
      try {
        const params = this.getSearchParams();
        const res = await this.$api?.planet?.get(params);
        if (res) {
          this.totalPlanets = res?.count;
          const planets = this.sortPlanets(res?.results);
          this.planets = planets;
        }
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
    setSearch: debounce(function () {
      // @ts-ignore
      const context = this;
      context.options.search = context.search;
      context.loadPlanets();
    }),
    setPage(page: number) {
      this.options.page = page;
      this.loadPlanets();
    },
    setSort(sortBy: SortBy[]) {
      this.options.sortBy = sortBy;
      this.loadPlanets();
    },
    sortPlanets(planets: Planet[]) {
      const sortBy = this.options.sortBy[0];
      if (!sortBy) return planets;
      const { key, order } = sortBy as SortBy;
      return planets.sort((a, b) => {
        const first = order === 'asc' ? a : b;
        const last = order === 'desc' ? a : b;
        const firstValue = first[key];
        const lastValue = last[key];

        if (key !== 'population')
          return this.sortStrings(firstValue as string, lastValue as string);
        return this.sortNumbers(firstValue as number, lastValue as number);
      });
    },
    getSearchParams() {
      const options = this.options;
      const params: { [key: string]: string | number } = {};
      for (const [index] of Object.entries(options)) {
        const key = index as keyof Options;
        const value = key !== 'sortBy' ? options[key] : options?.sortBy[0]?.key;
        if (value && value.toString().trim() !== '') params[key] = value;
      }
      if (options?.page) params.page = options.page;
      if (options?.search) params.search = options.search;
      return new URLSearchParams(params as Record<string, string>).toString();
    },
    sortStrings(firstValue: string, lastValue: string) {
      return firstValue.localeCompare(lastValue)
    },
    sortNumbers(firstValue: number, lastValue: number) {
      if (isNaN(firstValue)) firstValue = 0;
      if (isNaN(lastValue)) lastValue = 0;
      return +firstValue - +lastValue;
    },
    parsePopulation(planet: Partial<Planet>) {
      let population = planet.population || '';
      if (!isNaN(population as number)) population = (+population).toLocaleString();
      return population;
    },
    showPlanet(planet: Planet) {
      this.planet = planet;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    }
  },
}
</script>