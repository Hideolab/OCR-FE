<script setup>
import { ref, watch } from 'vue';
import { VFileUpload } from 'vuetify/labs/VFileUpload';

const props = defineProps({
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

const internalFile = ref(null)

watch(() => props.selectedFile, (newValue) => {
  if (!newValue) {
    internalFile.value = null
  }
})

const handleVuetifyFileChange = (files) => {
  const file = Array.isArray(files) && files.length > 0 ? files[0] : (files || null)
  if (file) {
    emit('file-selected', file)
  } else {
    internalFile.value = null
    emit('remove-file')
  }
}

const handleRemoveFile = () => {
  internalFile.value = null
  emit('remove-file')
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

<template>

  <v-card class="tw:rounded-xl tw:border tw:border-light-gray tw:p-6 tw:shadow-sm tw:bg-primary-150" variant="flat" color="primary-150">

    <v-card v-if="selectedFile" class="tw:relative tw:cursor-pointer tw:rounded-[12px] tw:border-2 tw:border-dashed 
        tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:p-8 tw:hover:border-blue-500/50 tw:hover:bg-primary-200
         tw:border-green-500/50 tw:bg-green-500/10" variant="flat">
      <div class="tw:flex tw:h-12 tw:w-12 tw:items-center tw:justify-center tw:rounded-full tw:bg-green-900/30">
        <v-icon icon="mdi-check" size="24" class="text-success" aria-hidden="true" />
      </div>
      <div class="tw:text-center">
        <p class="tw:font-medium tw:text-white">{{ selectedFile.name }}</p>
        <p class="tw:text-sm tw:text-gray-250">{{ getFileType(selectedFile.name) }} • {{ formatFileSize(selectedFile.size) }}
        </p>
      </div>
      <v-btn @click.stop="handleRemoveFile" icon="mdi-close" size="small" variant="text"
        class="tw:text-white tw:p-0 tw:hover:bg-secondary tw:rounded-lg tw:absolute tw:right-2 tw:top-2" />
    </v-card>

    <div v-if="!selectedFile" class="tw:relative tw:rounded-xl tw:border-2 tw:border-dashed tw:border-light-gray tw:bg-primary-150 tw:transition-all tw:duration-300 
            tw:hover:border-primary tw:hover:bg-primary-200
            tw:has-[.v-file-upload--dragging]:border-primary tw:has-[.v-file-upload--dragging]:bg-primary-200">

      <v-file-upload v-model="internalFile" :multiple="false" height="168" scrim="transparent" density="compact" 
        variant="outlined" class="tw:rounded-xl tw:flex tw:flex-col tw:bg-transparent tw:gap-y-1 tw:border-none"
        @update:model-value="handleVuetifyFileChange">
        <template #icon>
          <v-icon size="24" icon="mdi-tray-arrow-up" class="tw:text-gray-250 tw:bg-secondary tw:rounded-full tw:h-12 tw:w-12"></v-icon>
        </template>

        <template #title>
          <span class="tw:text-base tw:font-medium">Drop your file here or click to browse</span>
        </template>
      </v-file-upload>

      <div class="tw:absolute tw:bottom-6 tw:left-0 tw:right-0 tw:z-10 tw:pointer-events-none">
        <p class="tw:text-[14px] tw:leading-none tw:text-gray-250 tw:text-center">Accepts PDF, JPEG, PNG</p>
      </div>
    </div>

    <div class="tw:mt-6 tw:flex tw:gap-4">
      <div class="tw:flex-1">
        <label class="tw:text-sm tw:font-medium tw:leading-none tw:text-white" for="ocr-mode">OCR Mode</label>
        <v-select :model-value="ocrMode" @update:model-value="$emit('update:ocrMode', $event)" :items="ocrModes"
          base-color="transparent" variant="solo-flat" item-title="text" item-value="value"
          item-color="white" density="compact" :focused="false" bg-color="background" rounded="lg"
          hide-details id="ocr-mode" :list-props="{ bgColor: 'primary-150' }"
          class="tw:my-2 tw:border tw:border-light-gray tw:rounded-lg tw:overflow-hidden">
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <template v-slot:prepend>
                <div class="tw:w-5 tw:flex tw:items-center tw:justify-center">
                  <v-icon v-if="item.raw.value === ocrMode" icon="mdi-check" size="14" class="tw:text-white" />
                </div>
              </template>
            </v-list-item>
          </template>
        </v-select>
        <p class="tw:text-[12px] tw:text-gray-250">Different OCR models for various document types.</p>
      </div>

      <div class="tw:flex-1">
        <label class="tw:text-sm tw:font-medium tw:leading-none tw:text-white" for="filename">Filename (optional)</label>
        <v-text-field :model-value="filename" @update:model-value="$emit('update:filename', $event)" variant="solo-flat"
          active-color="transparent" base-color="light-gray" rounded="lg" hide-details id="filename"
          density="compact" placeholder="custom-name.pdf" bg-color="background" autocomplete="off"
          class="tw:my-2 tw:border tw:border-light-gray tw:rounded-lg tw:overflow-hidden" />
        <p class="tw:text-[12px] tw:text-gray-250">Will be echoed back in the result.</p>
      </div>
    </div>

    <div class="tw:mt-6 tw:space-y-3">
      <v-btn @click="$emit('send-to-ocr')" :disabled="!selectedFile" color="primary" size="large" rounded="lg" block
        :class="['tw:h-11 tw:normal-case tw:text-[14px]', !selectedFile && 'tw:opacity-75']">
        <v-icon icon="mdi-file-upload-outline" size="16" class="tw:mr-2" aria-hidden="true" />
        Send to OCR
      </v-btn>
      <div v-if="currentTaskId && isLoading" class="tw:text-sm tw:text-gray-250 tw:text-center tw:mt-2">
        Task created. ID: {{ currentTaskId }}
      </div>
      <div v-if="!selectedFile" class="tw:text-sm tw:text-gray-250 tw:text-center">Please select a file first.</div>
    </div>
  </v-card>

</template>