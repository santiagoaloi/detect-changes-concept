<template>
  <div :class="{ 'cursor-not-allowed': disabled }">
    <VBtn
      v-bind="$attrs"
      :border="border"
      :class="[{ 'pointer-events-none': disabled }, 'rounded-lg']"
      :color="color"
      :size="size"
      :type="!disabled && submit ? 'submit' : 'button'"
      elevation="0"
    >
      <VIcon v-if="removeIcon" start>$mdiTrashCanOutline</VIcon>
      {{ title }}
      <slot />
    </VBtn>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'default'
  },

  color: {
    type: String,
    default: 'black-button'
  },

  border: {
    type: Boolean,
    default: true
  },

  removeIcon: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  submit: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})
</script>
