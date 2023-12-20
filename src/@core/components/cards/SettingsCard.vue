<template>
  <VCard class="fill-height flex flex-col rounded-lg">
    <div :class="[!split && ' flex-col', 'fill-height pa-5 flex  overflow-auto']">
      <div v-if="title || subtitle" class="w-100 flex flex-col">
        <div class="px-1">
          <div class="text-h6 font-bold" v-html="title" />
          <div class="text-body-2" v-html="subtitle" />
        </div>
      </div>

      <div
        :class="[
          !noGutters && 'pt-5',
          `align-${align}`,
          split && 'justify-end',
          flex && 'flex',
          'fill-height  w-100'
        ]"
      >
        <slot />
      </div>
    </div>

    <!--
      Progress Bar 
    -->

    <VProgressLinear
      v-if="!$slots.progress && loading"
      :model-value="loading"
      bg-color="grey-lighten-3"
      color="link"
      height="1"
      indeterminate
    />

    <slot v-if="$slots.progress" name="progress" />

    <div class="align-center flex-columns w-100 inline-flex items-end justify-center border-t">
      <div class="text-body-2 w-100 h-100">
        <FormActions class="w-100">
          <template v-if="kbd"> <kbd class="kbd kbd-sm">Esc</kbd> to reset </template>
          <slot name="footer" />
        </FormActions>
      </div>
    </div>
  </VCard>
</template>
<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },

  align: {
    type: String,
    default: 'end'
  },

  kbd: {
    type: Boolean,
    default: false
  },

  noGutters: {
    type: Boolean,
    default: false
  },

  flex: {
    type: Boolean,
    default: true
  },

  flat: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  split: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  }
})
</script>
