<template>
  <div class="fixed inset-0 z-[100] bg-primary flex flex-col">
    <div class="flex h-14 items-center justify-between px-8">
      <button 
        @click="$emit('back')"
        class="flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
      >
        <v-icon icon="mdi-arrow-left" size="20" aria-hidden="true" />
        <span>Back</span>
      </button>
      
      <h2 class="text-sm font-medium text-white truncate max-w-sm text-center">
        {{ filename }}
      </h2>
      
      <button @click="$emit('close')" class="flex items-center justify-center w-8 h-8 rounded-md 
        text-muted transition-colors hover:text-white hover:bg-card-opacity">
        <v-icon icon="mdi-close" size="20" aria-hidden="true" />
      </button>
    </div>

    <v-divider color="white"/>

    <div class="flex-1 flex flex-col items-center justify-center px-8 py-12">
      <v-progress-circular :size="64" :width="4" color="primary" indeterminate
        class="mb-6" />

      <h3 class="text-xl font-semibold text-white mb-2">
        {{ loadingMessage }}
      </h3>
      
      <p class="text-sm text-muted mb-8 text-center max-w-sm">
        Please wait while we process your document. This may take a few moments.
      </p>

      <div class="w-full max-w-sm px-6 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted">Progress</span>
          <span class="text-sm font-medium text-white">{{ Math.round(progress) }}%</span>
        </div>
        <div class="w-full h-2 bg-card rounded-full overflow-hidden">
          <div 
            class="h-full bg-accent transition-all duration-300 rounded-full"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="py-4 px-8 border-t border-border">
      <p class="text-xs text-center text-muted">
        Task ID: {{ taskId }}
      </p>
    </div>
  </div>
</template>

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
  if (props.progress < 25) {
    return 'Uploading file...'
  } else if (props.progress < 50) {
    return 'Task created, initializing...'
  } else if (props.progress < 75) {
    return 'Connecting to OCR service...'
  } else {
    return 'Processing document...'
  }
})
</script>

