<template>
  <GeneralForm :title="'Create'" :request_type="'create'"></GeneralForm>
</template>

<script>
import GeneralForm from '@/components/dashboard/GeneralForm.vue';
export default {
  name: 'general-new',
  components: {
    GeneralForm,
  }
}
</script>