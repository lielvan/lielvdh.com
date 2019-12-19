<template>
  <BooksForm :title="'Create'" :request_type="'create'"></BooksForm>
</template>

<script>
import BooksForm from '@/components/dashboard/BooksForm.vue';

export default {
  name: 'book-new',
  components: {
    BooksForm
  }
}
</script>