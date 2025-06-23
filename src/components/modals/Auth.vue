<script setup lang="ts">
import { Button, Dialog, InputText } from 'primevue'
import { ref, reactive } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import { Form, FormField } from '@primevue/forms'
import Message from 'primevue/message'

const toast = useToast()

const showAuthModel = defineModel({ default: false })
const closeAuthModal = (): void => {
  showAuthModel.value = false
}

const authInitialValue = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const authSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Email address is required.' }),
    password: z
      .string()
      .min(8, { message: 'New password must be at least 8 characters long' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          'New password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 digit',
      }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
const authResolver = zodResolver(authSchema)

const text = ref('')
const visible = ref(false)

const onFormSubmit = ({ valid }: any) => {
  console.log('Form submitted:', valid)
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
  }
}
</script>

<template>
  <Dialog
    v-model:visible="showAuthModel"
    modal
    header="Register"
    :style="{ width: '25rem' }"
    :draggable="false"
    @hide="closeAuthModal"
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
</template>
