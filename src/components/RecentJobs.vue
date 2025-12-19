<script setup>
import { computed } from 'vue'

const props = defineProps({
  jobs: { type: Array, required: true }
})

defineEmits(['view-job'])

const headers = computed(() => [
  { title: 'FILE NAME', key: 'filename', align: 'start', sortable: false },
  { title: 'OCR MODE', key: 'ocrMode', align: 'start', sortable: false },
  { title: 'CREATED', key: 'createdAt', align: 'start', sortable: false },
  { title: 'STATUS', key: 'status', align: 'start', sortable: false },
  { title: 'ACTIONS', key: 'actions', align: 'right', sortable: false },
])

const formatDate = (date) => {
  if (!date) return '-'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}
</script>

<template>

  <section class="tw:mt-8">
    <h2 class="tw:mb-4 tw:text-lg tw:font-semibold tw:text-white">Recent jobs</h2>

    <v-card v-if="jobs.length === 0" elevation="0" class="tw:bg-primary-175 tw:flex tw:flex-col tw:items-center tw:justify-center 
        tw:rounded-lg tw:border tw:border-dashed tw:border-light-gray tw:p-12">
      <div class="tw:mb-4 tw:flex tw:h-12 tw:w-12 tw:items-center tw:justify-center tw:rounded-full">
        <v-icon icon="mdi-file-document-outline" size="24" class="tw:text-gray-250 tw:bg-secondary tw:rounded-full tw:p-6" aria-hidden="true" />
      </div>
      <div class="tw:text-center">
        <p class="tw:text-white tw:font-medium">No files processed yet</p>
        <p class="tw:text-sm tw:text-gray-250 tw:mt-1">Upload a file to get started.</p>
      </div>
    </v-card>

    <v-data-table v-else :items="jobs" :headers="headers" :items-per-page="-1" hide-default-footer
      class="tw:bg-transparent tw:border tw:border-light-gray tw:rounded-lg tw:overflow-hidden">

      <template v-slot:headers="{ columns }">
        <tr class="tw:bg-primary-200">
          <th v-for="column in columns" :key="column.key"
            class="tw:py-3 tw:px-4 tw:text-xs tw:font-medium tw:text-gray-250 tw:uppercase tw:tracking-wider tw:border-b tw:border-light-gray">
            {{ column.title }}
          </th>
        </tr>
      </template>

      <template v-slot:[`item.filename`]="{ value }">
        <div class="tw:flex tw:items-center tw:gap-2">
          <v-icon icon="mdi-file-document-outline" size="18" class="tw:text-gray-400" />
          <span class="tw:text-sm tw:text-white tw:font-medium">{{ value }}</span>
        </div>
      </template>

      <template v-slot:[`item.ocrMode`]="{ value }">
        <span class="tw:text-sm tw:text-gray-400">{{ value }}</span>
      </template>

      <template v-slot:[`item.createdAt`]="{ value }">
        <span class="tw:text-sm tw:text-gray-400">{{ formatDate(value) }}</span>
      </template>

      <template v-slot:[`item.status`]="{ value }">
        <v-chip size="x-small" class="tw:font-bold tw:text-[12px]" color="success" variant="tonal">
          {{ value }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @click="$emit('view-job', item.id)" variant="text" size="small"
          class="tw:text-white tw:normal-case tw:h-9 tw:px-0.5 tw:rounded-lg tw:gap-2 hover:tw:bg-secondary">
          <v-icon icon="mdi-eye" size="16" class="tw:mr-2" />
          View
        </v-btn>
      </template>
    </v-data-table>
    
  </section>

</template>