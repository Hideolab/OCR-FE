<script setup>
import { computed } from 'vue'

const props = defineProps({
  filename: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  taskId: {
    type: String,
    required: true
  }
})

defineEmits(['back', 'close'])

const loadingMessage = computed(() => {
  if (props.progress < 25) return 'Uploading file...'
  if (props.progress < 50) return 'Task created, initializing...'
  if (props.progress < 75) return 'Connecting to OCR service...'
  return 'Processing document...'
})
</script>

<template>

  <v-dialog :model-value="true" fullscreen persistent scrim="background" transition="dialog-bottom-transition">
    
    <div class="tw:bg-background tw:flex tw:flex-col tw:h-full tw:w-full">

      <v-toolbar color="background" height="65" flat class="tw:border-b tw:border-light-gray tw:px-2">
        <div class="tw:flex tw:items-center tw:justify-between tw:w-full">

          <v-btn @click="$emit('back')" variant="text" size="small" class="tw:text-white tw:normal-case tw:h-9 tw:px-0.5 tw:rounded-lg tw:gap-2 hover:tw:bg-secondary">
            <v-icon icon="mdi-arrow-left" size="16" class="tw:mr-2" />
            <span class="tw:text-sm">Back</span>
          </v-btn>

          <h2 class="tw:text-base tw:font-medium tw:text-white tw:truncate tw:max-w-[200px] tw:md:max-w-sm tw:text-center">
            {{ filename }}
          </h2>

          <v-btn @click="$emit('close')" icon="mdi-close" size="small" variant="text"
            class="tw:text-white tw:p-0 tw:mr-2 hover:tw:bg-secondary tw:rounded-lg" />
        </div>
      </v-toolbar>

      <div class="tw:flex-1 tw:flex tw:flex-col tw:items-center tw:justify-center tw:px-8 tw:py-12">
        <div class="tw:mb-6 tw:bg-secondary-300 tw:rounded-full tw:p-6 tw:border-4 tw:border-secondary-300 tw:opacity-95 tw:flex tw:items-center tw:justify-center">
          <v-progress-circular :size="45" :width="3" color="light-blue" indeterminate />
        </div>

        <h3 class="tw:text-xl tw:font-semibold tw:text-white tw:mb-2">
          {{ loadingMessage }}
        </h3>

        <p class="tw:text-sm tw:text-gray-250 tw:mb-8 tw:text-center tw:max-w-sm">
          Please wait while we process your document. This may take a few moments.
        </p>

        <div class="tw:w-full tw:max-w-sm tw:px-6 tw:space-y-2">
          <div class="tw:flex tw:items-center tw:justify-between">
            <span class="tw:text-sm tw:text-gray-250 tw:font-medium">Progress</span>
            <span class="tw:text-sm tw:font-bold tw:text-white">{{ Math.round(progress) }}%</span>
          </div>
          <v-progress-linear :model-value="progress" color="primary" height="8" rounded class="tw:bg-surface" />
          <p class="tw:text-xs tw:text-center tw:text-gray-250">
            Task ID: <span class="tw:font-mono">{{ taskId }}</span>
          </p>
        </div>
      </div>

    </div>
  </v-dialog>

</template>