<template>
  <VContainer>
    <SettingsCard
      subtitle="Works with ref and reactive, and nested data"
      title="Detect data changes"
    >
      <VTextField v-model="user.name" />

      <template #footer>
        <div class="d-flex pa-4">
          <VSpacer />
          <SettingsButton v-show="hasNewValues" title="Reset" @click="reset()" />
          <SettingsButton
            :disabled="!hasNewValues"
            :loading="isSavingLoading"
            submit
            title="Save"
            @click="save()"
          />
        </div>
      </template>
    </SettingsCard>
  </VContainer>
</template>

<script setup>
const user = ref({ name: 'tyrion', lastName: 'lannister' })

// Use the useResetRef composable to manage the state of the profile form
const { reset, hasNewValues, syncInitialValues } = useResetRef(user)

function save() {
  // THe new default values will be the new saved values.

  syncInitialValues()
}
</script>
