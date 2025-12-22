<template>

  <v-container class="tw:pb-8 tw:pt-12 tw:text-center tw:md:pb-12 tw:md:pt-16 tw:max-w-6xl tw:mx-auto" fluid>

    <h1 class="tw:mb-4 tw:text-3xl tw:font-bold tw:tracking-tight tw:text-white tw:md:text-4xl tw:lg:text-[48px]">
      Convert PDFs and images to Markdown
    </h1>

    <p class="tw:mx-auto tw:mb-6 tw:max-w-2xl tw:text-lg tw:text-gray-250">
      Upload a PDF, JPEG, or PNG and see the OCR result rendered as Markdown.
    </p>

    <v-card class="tw:mx-auto tw:flex tw:max-w-3xl tw:items-center tw:gap-3 tw:rounded-[12px] tw:border tw:border-light-gray 
        tw:px-4 tw:py-3 tw:text-sm tw:text-gray-250 tw:bg-primary-175" elevation="0">

      <v-icon icon="mdi-arrow-down" size="16" class="tw:mt-0.5" color="gray-250" />

      <v-card-text class="tw:text-left tw:p-0">
        <span class="tw:font-medium tw:text-white">Async processing:</span>
        Your file is sent to our backend, which calls the OCR API and returns a task ID.
        The UI polls until the result is ready.
      </v-card-text>
    </v-card>

  </v-container>
</template>
