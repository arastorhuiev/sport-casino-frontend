<script setup lang="ts">
import { Button, Dialog, InputText } from 'primevue'
import { ref, reactive } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import { Form, FormField } from '@primevue/forms'
import Message from 'primevue/message'

const text = ref('')
const visible = ref(false)

const toast = useToast()

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required.' }),
  }),
)

const onFormSubmit = ({ valid }: any) => {
  console.log('Form submitted:', valid)
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
  }
}
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
      <Form :resolver @submit="onFormSubmit" class="flex flex-col gap-2 w-full">
        <FormField v-slot="$field" name="username" class="w-full flex flex-wrap gap-1">
          <label for="username" class="font-semibold">Username</label>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
          <InputText id="username" class="w-full" />
        </FormField>
        <FormField v-slot="$field" name="email" class="w-full flex flex-wrap gap-1">
          <label for="email" class="font-semibold">Email</label>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
          <InputText id="email" class="w-full" />
        </FormField>
        <FormField v-slot="$field" name="password" class="w-full flex flex-wrap gap-1">
          <label for="password" class="font-semibold">Password</label>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
          <InputText id="password" class="w-full" />
        </FormField>
        <FormField v-slot="$field" name="confirmPassword" class="w-full flex flex-wrap gap-1">
          <label for="confirm-password" class="font-semibold">Confirm Password</label>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
          <InputText id="confirm-password" class="w-full" />
        </FormField>
        <div class="flex justify-end mt-2">
          <Button type="submit" label="Register"></Button>
        </div>
      </Form>
    </Dialog>
  </div>
</template>
