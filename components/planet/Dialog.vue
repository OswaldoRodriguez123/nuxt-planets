<template>
  <v-dialog v-model="props.showDialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition"
    scrollable>
    <v-card tile>
      <v-toolbar flat dark color="primary" style="flex: none">
        <v-btn icon dark @click="props.closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          Planet: {{ planet?.name }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="pt-2 bg-default">
        <v-row>
          <v-col lg="6" sm="12">
            <PlanetTable :headers="headersResidents" :items="residents" />
          </v-col>
          <v-col lg="6" sm="12">
            <PlanetTable :headers="headersFilms" :items="films" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">

import { Planet, PlanetTableItem } from '~/types';
interface Props {
  item: Planet | null;
  showDialog: boolean;
  closeDialog: () => void;
}
const props = defineProps<Props>()

</script>
<script lang="ts">

export default {
  data: () => ({
    planet: null as Planet | null,
    headersFilms: [
      { title: 'Film', key: 'number' },
      { title: '', key: 'url', sortable: false, },
    ],
    films: [] as PlanetTableItem[],
    headersResidents: [
      { title: 'Resident', key: 'number' },
      { title: '', key: 'url', sortable: false, },
    ],
    residents: [] as PlanetTableItem[],
  }),
  methods: {
    setTables() {
      const item = this.$props.item;
      if (!item) return;
      this.residents = this.createTableData(item.residents, 'Resident');
      this.films = this.createTableData(item.films, 'Film');
    },
    createTableData(urls: string[], prefix: string) {
      return urls.map(url => {
        const number = this.getNumberByUrl(url);
        return {
          number: `${prefix} #${number}`,
          url
        };
      });
    },
    getNumberByUrl(url: string) {
      const segments = new URL(url).pathname.split('/');
      return segments.pop() || segments.pop() || '';
    }
  },
  watch: {
    showDialog() {
      this.planet = this.$props.item;
      this.setTables();
    }
  },
}
</script>