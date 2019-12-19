<template>
  <MotosForm :title="'Edit'" :request_type="'edit'"></MotosForm>
</template>

<script>
import MotosForm from '@/components/dashboard/MotosForm.vue';

export default {
  name: 'moto-edit',
  components: {
    MotosForm,
  },
}
</script>
