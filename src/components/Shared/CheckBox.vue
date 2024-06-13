<template>
  <input
      type="checkbox"
      class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      :checked="modelValue"
      @input="handleInput"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};
</script>