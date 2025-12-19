<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FileUploadSection from './components/FileUploadSection.vue'
import RecentJobs from './components/RecentJobs.vue'
import AppFooter from './components/AppFooter.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import ResultView from './components/ResultView.vue'

const selectedFile = ref(null)
const filename = ref('')
const ocrMode = ref(0)
const isLoading = ref(false)
const loadingProgress = ref(0)
const currentTaskId = ref('')
const showResult = ref(false)
let progressInterval = null

const ocrModes = [
  { text: 'Mode 0', value: 0 },
  { text: 'Mode 1', value: 1 },
  { text: 'Mode 2', value: 2 },
]
const recentJobs = ref([])

const generateTaskId = () => [...Array(36)].map(() => Math.random().toString(36)[2]).join('')
const clearProgressInterval = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

const handleFileSelect = (file) => {
  selectedFile.value = file
  filename.value = file?.name || ''
}

const removeFile = () => {
  selectedFile.value = null
  filename.value = ''
}

const sendToOCR = () => {
  if (!selectedFile.value) return
  
  currentTaskId.value = generateTaskId()
  isLoading.value = true
  loadingProgress.value = 0
  
  clearProgressInterval()
  progressInterval = setInterval(() => {
    if (loadingProgress.value < 100) {
      loadingProgress.value = Math.min(100, loadingProgress.value + Math.random() * 15)
    } else {
      clearProgressInterval()
      isLoading.value = false
      showResult.value = true
      recentJobs.value.unshift({
        id: currentTaskId.value,
        filename: selectedFile.value.name,
        ocrMode: ocrMode.value,
        createdAt: new Date(),
        status: 'Finished'
      })
    }
  }, 500)
}

const handleLoadingClose = () => {
  clearProgressInterval()
  isLoading.value = loadingProgress.value = 0
}

const handleResultClose = () => showResult.value = false

const viewJob = (jobId) => {
  const job = recentJobs.value.find(j => j.id === jobId)
  if (job) {
    filename.value = job.filename
    showResult.value = true
  }
}

</script>

<template>

  <v-app class="tw:min-h-screen tw:bg-background">

      <AppHeader />

      <v-main>

        <div class="tw:py-8">
          <HeroSection />
        
          <div class="tw:max-w-8xl tw:mx-auto tw:px-8 tw:w-full">
            <div class="tw:space-y-8 tw:max-w-3xl tw:mx-auto">
              <FileUploadSection
                :selected-file="selectedFile"
                :filename="filename"
                :ocr-mode="ocrMode"
                :ocr-modes="ocrModes"
                :current-task-id="currentTaskId"
                :is-loading="isLoading"
                @file-selected="handleFileSelect"
                @remove-file="removeFile"
                @update:filename="filename = $event"
                @update:ocrMode="ocrMode = $event"
                @send-to-ocr="sendToOCR"
              />

              <RecentJobs :jobs="recentJobs" @view-job="viewJob" />
            </div>
          </div>
          
        </div>
      </v-main>

      <AppFooter/>

    <LoadingOverlay
      v-if="isLoading && !showResult"
      :filename="selectedFile?.name || filename || 'Untitled'"
      :progress="loadingProgress"
      :taskId="currentTaskId"
      @back="handleLoadingClose"
      @close="handleLoadingClose"
    />

    <ResultView
      v-if="showResult"
      :filename="selectedFile?.name || filename || 'Untitled'"
      :pageCount="3"
      @back="handleResultClose"
      @close="handleResultClose"
      @done="handleResultClose"
    />

  </v-app>

</template>