<template>
  <ChaptersForm :title="'Edit'" :request_type="'edit'"></ChaptersForm>
</template>

<script>
import ChaptersForm from '@/components/dashboard/ChaptersForm.vue';
export default {
  name: 'chapter-edit',
  components: {
    ChaptersForm,
  }
}
</script>