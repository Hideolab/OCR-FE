<script setup>
import { ref } from "vue";

defineProps({
  filename: { type: String, required: true },
  pageCount: { type: Number, default: 1 },
});

defineEmits(["back", "close", "done"]);

const wrapLines = ref(true);

const handleCopy = () => console.log("Copy clicked");
const handleDownload = () => console.log("Download clicked");

</script>

<template>

  <v-dialog :model-value="true" fullscreen persistent scrim="background" transition="dialog-bottom-transition">

    <div class="tw:bg-background tw:flex tw:flex-col tw:h-full">
      <v-toolbar color="background" height="64" flat class="tw:border-b tw:border-light-gray tw:px-4">
        <div class="tw:flex tw:items-center tw:justify-between tw:w-full">
          <v-btn @click="$emit('back')" variant="text" size="small"
            class="tw:text-white tw:normal-case tw:h-9 tw:px-0.5 tw:rounded-lg tw:gap-2 tw:hover:bg-secondary">
            <v-icon icon="mdi-arrow-left" size="16" class="tw:mr-2" />
            <span class="tw:text-sm">Back</span>
          </v-btn>

          <h2 class="tw:text-base tw:font-medium tw:text-white tw:truncate">
            {{ filename }}
          </h2>

          <v-btn @click="$emit('close')" icon="mdi-close" size="small" variant="text" class="tw:text-white tw:p-0 tw:mr-2 tw:hover:bg-secondary tw:rounded-lg"/>
        </div>
      </v-toolbar>

      <div class="tw:py-3 tw:bg-secondary-300 tw:w-full tw:border-b tw:border-light-gray">
        <div class="tw:flex tw:items-center tw:justify-center tw:gap-2">
          <v-icon icon="mdi-check-circle-outline" size="20" color="primary" />
          <span class="tw:font-medium tw:text-primary">Document processed successfully</span>
          <span class="tw:text-[14px] tw:text-gray-250">• {{ pageCount }} pages</span>
        </div>
      </div>

      <div class="tw:flex tw:items-center tw:py-2 tw:px-4 tw:justify-between tw:bg-background tw:border-b tw:border-light-gray">
        <div class="tw:flex tw:items-center tw:gap-2">
          <v-switch v-model="wrapLines" color="primary" hide-details density="compact" class="tw:ml-2"></v-switch>
          <div class="tw:flex tw:items-center tw:gap-2 tw:ml-1">
            <v-icon icon="mdi-wrap" color="gray-400" size="16" />
            <span class="tw:text-xs tw:font-medium tw:text-gray-250">Wrap lines</span>
          </div>
        </div>

        <div class="tw:flex tw:items-center tw:gap-2 tw:mr-2">
          <v-btn @click="handleCopy" variant="text" size="small" class="tw:text-white tw:normal-case tw:h-9 tw:px-0.5 tw:rounded-lg tw:gap-2 tw:hover:bg-secondary">
            <v-icon icon="mdi-content-copy" size="16" class="tw:mr-1" />
            <span class="tw:text-sm">Copy</span>
          </v-btn>

          <v-btn @click="handleDownload" variant="text" size="small" class="tw:text-white tw:normal-case tw:h-9 tw:px-0.5 tw:rounded-lg tw:gap-2 tw:hover:bg-secondary">
            <v-icon icon="mdi-download" size="16" class="tw:mr-1" />
            <span class="tw:text-sm">Download</span>
          </v-btn>
        </div>
      </div>

      <main class="tw:overflow-auto tw:bg-background tw:p-6">
        <v-card class="tw:bg-secondary tw:mx-auto tw:min-h-full tw:p-8 tw:rounded-lg tw:border tw:border-light-gray" elevation="0">
          <div class="tw:prose tw:prose-invert tw:max-w-none tw:font-mono">
            <h1 class="tw:text-2xl tw:font-bold tw:text-white tw:mb-4">
              Document Analysis Report
            </h1>
            <div class="tw:text-gray-250">
              <p class="tw:mb-4">
                Document:
                <span class="tw:text-white tw:font-medium">{{ filename }}</span>
              </p>
            </div>
          </div>
        </v-card>
      </main>

      <footer class="tw:p-4 tw:bg-background tw:border-t tw:border-light-gray tw:mt-auto">
        <v-btn @click="$emit('done')" color="primary" rounded="lg" block
          class="tw:py-2 tw:font-medium tw:h-10 tw:text-sm tw:normal-case">
          Done
        </v-btn>
      </footer>
    </div>

  </v-dialog>

</template>