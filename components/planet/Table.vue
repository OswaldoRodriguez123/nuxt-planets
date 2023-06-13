<template>
  <v-data-table v-model:items-per-page="itemsPerPage" :headers="props.headers" :items="props.items" item-value="name"
    class="elevation-1">
    <template v-slot:item.url="{ item }">
      <div class="text-right">
        <a :href="item.columns.url" target="_blank">
          <v-icon small> mdi-eye </v-icon>
        </a>
      </div>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
import { PlanetTableHeader, PlanetTableItem } from '~/types';

interface Props {
  headers: Array<PlanetTableHeader>;
  items: PlanetTableItem[];
}
const props = defineProps<Props>()

</script>
<script lang="ts">

export default {
  data: () => ({
    itemsPerPage: 10,
  }),
}
</script>