<template>
  <q-form ref="form" class="q-gutter-md" greedy @submit="onSubmit">
    <p v-if="props.formBody.title" class="text-h5">
      {{ (props.formBody.title) }}
    </p>

    <template v-for="input in props.formBody.inputs" :key="input.key">
      <q-input v-model="bodyForm[input.key]" :label="(input.label)" :rules="input.required ? requiredRules((input.requiredMessage || '')) : []
        " :type="input.type || 'text'" filled dense />
    </template>

    <slot name="aux-buttons"></slot>

    <div class="flex justify-between">
      <template v-if="props.formBody.secondaryText">
        <q-btn :label="(props.formBody.secondaryText || '')" class="secondary-button text-primary"
          @click="$emit('secondary-button')" />
      </template>
      <q-btn :label="(props.formBody.submitText)" color="primary" type="submit" class="primary-button" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import type { QForm, ValidationRule } from 'quasar';
import type { BodyForm, FormContainerBody } from 'src/models/form.models';
import type { Reactive, Ref } from 'vue';
import { reactive, ref } from 'vue';


const props = defineProps<{ formBody: FormContainerBody }>();

const emit = defineEmits<{
  submit: [body: BodyForm];
  'secondary-button': [void];
}>()

const bodyForm: Reactive<BodyForm> = reactive({} as BodyForm);
const form: Ref<QForm> = ref({} as QForm);

async function onSubmit() {
  const isValid = await form.value.validate();
  if (isValid) {
    emit('submit', bodyForm);
  }
};

function requiredRules(message: string): ValidationRule[] {
  return [(val: ValidationRule) => !!val || message];
}
</script>

<style lang="scss" scoped>
.primary-button {
  flex: 1;
  margin-left: 0.4em;
}

.secondary-button {
  flex: 1;
}
</style>
