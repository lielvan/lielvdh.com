<template>
  <Table :title="'Projects'" :items="projects" :metadata="metadata" :new_route="'new-project'" :edit_route="'edit-project'" :deleteItem="deleteProject"></Table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from '@/components/dashboard/Table.vue';

export default {
  name: 'dashboard-projects',
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
          title: 'Language',
          identifier: 'language'
        },
        {
          title: 'Text',
          identifier: 'text'
        },
      ]
    }
  },
  computed: {
    ...mapState('projects', ['projects']),
  },
  methods: {
    ...mapActions('projects', ['deleteProject'])
  }
}
</script>
