<template>
  <MotosForm :title="'Create'" :request_type="'create'"></MotosForm>
</template>

<script>
import MotosForm from '@/components/dashboard/MotosForm.vue';

export default {
  name: 'moto-new',
  components: {
    MotosForm,
  },
}
</script>
