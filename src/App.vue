<script setup lang="ts">
import { Button, Dialog, InputText } from 'primevue'
import { ref } from 'vue'
const text = ref('')
const visible = ref(false)
</script>

<template>
  <div class="card flex justify-center">
    <Button label="Show" @click="visible = true" />
    <Dialog
      v-model:visible="visible"
      modal
      header="Register"
      :style="{ width: '25rem' }"
      :draggable="false"
    >
      <div class="flex flex-col gap-2 w-full">
        <div class="flex flex-col gap-1">
          <label for="username" class="font-semibold">Username</label>
          <InputText id="username" class="flex-auto" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="email" class="font-semibold">Email</label>
          <InputText id="email" class="flex-auto" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="font-semibold">Password</label>
          <InputText id="password" class="flex-auto" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="confirm-password" class="font-semibold">Confirm Password</label>
          <InputText id="confirm-password" class="flex-auto" />
        </div>
        <div class="flex justify-end mt-2">
          <Button type="button" label="Register" @click="visible = false"></Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
