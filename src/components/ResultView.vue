<template>
  <div class="fixed inset-0 z-[100] bg-primary flex flex-col">
    <div class="flex items-center justify-between px-4 border-b border-border py-3">
      <button @click="$emit('back')" class="flex items-center gap-2 text-[14px] text-white px-3">
        <v-icon icon="mdi-arrow-left" color="white" size="16" aria-hidden="true" />
        <span>Back</span>
      </button>
      
      <h2 class="text-base font-medium text-white truncate text-center">
        {{ filename }}
      </h2>
      
      <button @click="$emit('close')" class="flex items-center justify-center w-8 h-8 rounded-md text-muted transition-colors hover:text-white hover:bg-card">
        <v-icon icon="mdi-close" size="16" color="white" aria-hidden="true" />
      </button>
    </div>

    <v-divider color="white" />
    
    <div class="py-3 bg-accent-light w-full">
      <div class="flex items-center justify-center gap-1">
        <v-icon icon="mdi-check-circle-outline" size="20" color="primary" aria-hidden="true" />
        <span class="font-medium text-accent">Document processed successfully</span>
        <span class="text-sm text-muted">• {{ pageCount }} pages</span>
      </div>
    </div>

    <v-divider color="white" />

    <div class="flex items-center gap-2 py-3 px-4 justify-between">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" v-model="wrapLines" class="sr-only" />
        <div class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
             :class="wrapLines ? 'bg-accent' : 'bg-border'">
          <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                :class="wrapLines ? 'translate-x-6' : 'translate-x-1'"></span>
        </div>
        <v-icon icon="mdi-wrap" color="muted" size="16" aria-hidden="true" />
        <span class="text-sm text-muted">Wrap lines</span>
      </label>

      <div class="flex items-center gap-2">
        <button @click="handleCopy" class="flex items-center gap-1 px-3 text-white transition-colors hover:text-muted rounded-md hover:bg-secondary">
          <v-icon icon="mdi-content-copy" color="white" size="16" aria-hidden="true" />
          <span class="text-sm">Copy</span>
        </button>
        <button @click="handleDownload" class="flex items-center gap-1 px-3 text-white transition-colors hover:text-muted rounded-md hover:bg-secondary">
          <v-icon icon="mdi-download" color="white" size="16" aria-hidden="true" />
          <span class="text-sm">Download</span>
        </button>
      </div>
    </div>

    <v-divider color="white" />

    <div class="flex-1 overflow-auto p-4">
      <div class="bg-secondary mx-auto p-4 rounded-lg">
        <div class="prose prose-invert font-mono h-full">
          <h1 class="text-2xl font-bold text-white mb-4">Document Analysis Report</h1>
          <div class="text-muted">
            <p class="mb-4">Document: <span class="text-white font-medium">{{ filename }}</span></p>
            <p class="text-sm">Document processed successfully. Content will be displayed here once OCR processing is implemented.</p>
          </div>
        </div>
      </div>
    </div>

    <v-divider color="white" />

    <div class="p-4 border-t border-border">
      <v-btn @click="$emit('done')" color="accent" size="large" rounded="lg" block class="h-11 normal-case text-[14px]">
        Done
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  filename: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    default: 1
  }
})

defineEmits(['back', 'close', 'done'])

const wrapLines = ref(true)

</script>

<style scoped>
.prose {
  color: rgb(129, 136, 152);
}

.prose h1 {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.prose p {
  margin-bottom: 0.5rem;
}
</style>

