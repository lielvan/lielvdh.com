<template>
  <BooksForm :title="'Edit'" :request_type="'edit'"></BooksForm>
</template>

<script>
import BooksForm from '@/components/dashboard/BooksForm.vue';

export default {
  name: 'book-edit',
  components: {
    BooksForm
  }
}
</script>