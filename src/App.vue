<script setup lang="ts">
import { Button, InputText } from 'primevue'
import { ref } from 'vue'
const text = ref('')
</script>

<template>
  <div>
    <InputText v-model="text" placeholder="Type something..." />
    <Button label="Save" />
    {{ text }}
  </div>
</template>
