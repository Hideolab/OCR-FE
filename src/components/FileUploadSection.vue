<template>
  <div class="rounded-md border border-light-gray p-6 shadow-sm bg-primary-150">

    <input type="file" accept=".pdf,.jpg,.jpeg,.png" class="hidden" 
      ref="fileInput" @change="handleFileSelect"/>

    <div v-if="selectedFile" @click="fileInput?.click()" class="relative cursor-pointer rounded-[12px] border-2 border-dashed 
      flex flex-col items-center justify-center gap-3 p-8 hover:border-blue-500/50 
      hover:opacity-80 border-green-500/50 bg-green-900/20">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-900/30">
        <v-icon icon="mdi-check" size="24" class="text-green-400" aria-hidden="true" />
      </div>
      <div class="text-center">
        <p class="font-medium text-white">{{ selectedFile.name }}</p>
        <p class="text-sm text-gray-250">{{ getFileType(selectedFile.name) }} • {{ formatFileSize(selectedFile.size) }}</p>
      </div>
      <button @click.stop="$emit('remove-file')" class="h-9 rounded-md px-3 absolute right-2 top-2 text-gray-400">
        <v-icon icon="mdi-close" size="16" color="white" aria-hidden="true" />
      </button>
    </div>

    <div v-else @click="fileInput?.click()" class="relative cursor-pointer rounded-lg border-2 border-dashed flex flex-col 
      items-center justify-center gap-3 p-8 hover:border-blue-500/50 hover:opacity-80 border-light-gray">
      
      <v-icon icon="mdi-tray-arrow-up" size="24" class="text-gray-250 bg-secondary rounded-full p-6" aria-hidden="true" />

      <div class="text-center">
        <p class="font-medium text-white">Drop your file here or click to browse</p>
        <p class="text-sm text-gray-250">Accepts PDF, JPEG, PNG</p>
      </div>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <label class="text-sm font-medium leading-none text-white" for="ocr-mode">OCR Mode</label>
        <v-select :model-value="ocrMode" @update:model-value="$emit('update:ocrMode', $event)"
          :items="ocrModes" item-title="text" item-value="value" variant="outlined" item-color="white"
          density="compact" bg-color="primary" color="light-gray" rounded="lg" hide-details id="ocr-mode"
          :list-props="{ bgColor: 'primary-150' }" class="my-2">
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <template v-slot:prepend>
                <div class="w-5 flex items-center justify-center">
                  <v-icon v-if="item.raw.value === ocrMode" icon="mdi-check" size="14" class="text-white" />
                </div>
              </template>
            </v-list-item>
          </template>
        </v-select>
        <p class="text-[12px] text-gray-250">Different OCR models for various document types.</p>
      </div>
      <div>
        <label class="text-sm font-medium leading-none text-white" for="filename">Filename (optional)</label>
        <v-text-field :model-value="filename" @update:model-value="$emit('update:filename', $event)"
          variant="outlined" density="compact" placeholder="custom-name.pdf" bg-color="primary"
          color="light-gray" rounded="lg" hide-details id="filename" class="my-2"/>
        <p class="text-[12px] text-gray-250">Will be echoed back in the result.</p>
      </div>
    </div>

    <div class="mt-6 space-y-3">
      <v-btn @click="$emit('send-to-ocr')" :disabled="!selectedFile" color="light-blue"  size="large" rounded="lg" block
        :class="['h-11 normal-case text-[14px]', !selectedFile && 'opacity-75']">
        <v-icon icon="mdi-file-upload-outline" size="16" class="mr-2" aria-hidden="true" />
        Send to OCR
      </v-btn>
      <div v-if="currentTaskId && isLoading" class="text-sm text-gray-250 text-center mt-2">
        Task created. ID: {{ currentTaskId }}
      </div>
      <div class="text-sm text-gray-250 text-center">Please select a file first.</div>
    </div>
  </div>
  
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  selectedFile: {
    type: File,
    default: null
  },
  filename: {
    type: String,
    default: ''
  },
  ocrMode: {
    type: Number,
    default: 0
  },
  ocrModes: {
    type: Array,
    required: true
  },
  currentTaskId: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['file-selected', 'remove-file', 'update:filename', 'update:ocrMode', 'send-to-ocr'])

const fileInput = ref(null)

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    emit('file-selected', file)
  }
}

const getFileType = (filename) => filename.split('.').pop().toUpperCase()

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
</script>

