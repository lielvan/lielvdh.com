<template>
  <ChaptersForm :title="'Create'" :request_type="'create'"></ChaptersForm>
</template>

<script>
import ChaptersForm from '@/components/dashboard/ChaptersForm.vue';
export default {
  name: 'chapter-new',
  components: {
    ChaptersForm,
  }
}
</script>