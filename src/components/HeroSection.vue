<template>

  <section class="pb-8 pt-12 text-center md:pb-12 md:pt-16">
    
    <h1 class="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
      Convert PDFs and images to Markdown
    </h1>
    <p class="mx-auto mb-6 max-w-2xl text-lg text-muted">
      Upload a PDF, JPEG, or PNG and see the OCR result rendered as Markdown.
    </p>
    <div class="mx-auto flex max-w-3xl items-center justify-center gap-3 rounded-[12px] border border-border px-4 py-3 text-sm text-muted bg-card-opacity">
      <v-icon icon="mdi-arrow-down" size="16" color="muted"/>
      <p class="text-left">
        <span class="font-medium text-white">Async processing:</span> Your file is sent to our backend, which calls the OCR API and returns a task ID. The UI polls until the result is ready.
      </p>
    </div>

  </section>

</template>

