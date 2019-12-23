<template>
  <GeneralForm :title="'Edit'" :request_type="'edit'"></GeneralForm>
</template>

<script>
import GeneralForm from '@/components/dashboard/GeneralForm.vue';
export default {
  name: 'general-edit',
  components: {
    GeneralForm,
  }
}
</script>