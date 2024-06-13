<template>
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
      <strong class="font-bold text-xs">Увага! </strong>
      <span class="text-xs block sm:inline">{{ text }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
            @click="closeMessage()"
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
              fill-rule="evenodd"
              d="M14.95 5.05a.75.75 0 0 1 1.06 1.06L11.06 10l4.95 4.95a.75.75 0 1 1-1.06 1.06L10 11.06l-4.95 4.95a.75.75 0 0 1-1.06-1.06L8.94 10 4.05 5.05a.75.75 0 0 1 1.06-1.06L10 8.94l4.95-4.95z"
          />
        </svg>
      </span>
    </div>
</template>


<script setup lang="ts">
defineProps({
  closeMessage: {
    required: true,
    type: Function,
  },
  text: {
    required: false,
    type: String,
    default: "Заповніть всі поля",
  }
})
</script>