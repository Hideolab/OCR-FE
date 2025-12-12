<template>

  <header class="sticky top-0 z-50 w-full backdrop-blur shrink-0">
    
    <div class="flex h-14 items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-[12px] bg-light-blue">
          <v-icon icon="mdi-file-document-outline" size="16" color="white" aria-hidden="true" />
        </div>
        <span class="font-semibold text-white">OCR Markdown Playground</span>
      </div>
      <nav class="flex items-center gap-6">
        <a href="#" class="flex items-center gap-1 text-sm text-gray-250 hover:text-white">
          Docs
          <v-icon icon="mdi-open-in-new" size="12" aria-hidden="true" />
        </a>
        <a href="#" class="flex items-center gap-1 text-sm text-gray-250 hover:text-white">
          API Status
          <span class="ml-1 h-2 w-2 rounded-full bg-green-500"></span>
        </a>
      </nav>
    </div>

    <v-divider color="white" class="w-screen relative left-1/2 -ml-[50vw]" />

  </header>

</template>

