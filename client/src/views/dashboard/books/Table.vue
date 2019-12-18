<template>
  <Table :title="'Books'" :items="books" :metadata="metadata" :new_route="'new-book'" :edit_route="'edit-book'" :deleteItem="deleteBook"></Table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from '@/components/dashboard/Table.vue';

export default {
  name: 'dashboard-books',
  components: {
    Table
  },
  data() {
    return {
      metadata: [
        {
          title: 'Title',
          identifier: 'title'
        },
        {
          title: 'Author',
          identifier: 'author'
        },
        {
          title: 'Description',
          identifier: 'description'
        },
        {
          title: 'Image',
          identifier: 'image'
        },
        {
          title: 'ISBN',
          identifier: 'isbn'
        }
      ]
    }
  },
  computed: {
    ...mapState('books', ['books']),
  },
  methods: {
    ...mapActions('books', ['deleteBook'])
  }
}
</script>