<template>
  <section>
    <h2 class="mb-4 text-lg font-semibold text-white">Recent jobs</h2>
      <div v-if="jobs.length === 0" class="bg-primary-175 flex flex-col items-center justify-center rounded-lg border border-dashed border-light-gray gap-3 p-12">
        <div class="flex h-12 w-12 items-center justify-center rounded-full">
          <v-icon icon="mdi-file-document-outline" size="24" class="text-gray-250 bg-secondary rounded-full p-6" aria-hidden="true" />
        </div>
        <div class="text-center">
          <p class="text-slate-30 font-medium">No files processed yet</p>
          <p class="text-sm text-gray-250 mt-1">Upload a file to get started.</p>
        </div>
      </div>

      <div v-else class="overflow-x-auto rounded-lg border border-light-gray">
        <table class="w-full">
          <thead>
            <tr class="border-b border-light-gray bg-primary-200">
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-250 uppercase tracking-wider">FILE NAME</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-250 uppercase tracking-wider">OCR MODE</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-250 uppercase tracking-wider">CREATED</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-250 uppercase tracking-wider">STATUS</th>
              <th class="text-right py-3 px-4 text-xs font-medium text-gray-250 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody class="bg-primary-150">
            <tr v-for="job in jobs" :key="job.id" class="border-b border-light-gray hover:bg-secondary transition-colors">
              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  <v-icon icon="mdi-file-document-outline" size="20" class="text-gray-250" aria-hidden="true" />
                  <span class="text-sm text-white">{{ job.filename }}</span>
                </div>
              </td>
              <td class="py-3 px-4 text-sm text-gray-250">{{ job.ocrMode }}</td>
              <td class="py-3 px-4 text-sm text-gray-250">{{ formatDate(job.createdAt) }}</td>
              <td class="py-3 px-4">
                <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/30 text-green-400">
                  {{ job.status }}
                </span>
              </td>
              <td class="py-3 px-4">
                <button 
                  @click="$emit('view-job', job.id)"
                  class="flex items-center gap-2 text-sm text-white font-medium"
                >
                  <v-icon icon="mdi-eye" size="16" aria-hidden="true" />
                  <span>View</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </section>
</template>

<script setup>
defineProps({
  jobs: {
    type: Array,
    required: true
  }
})

defineEmits(['view-job'])

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

