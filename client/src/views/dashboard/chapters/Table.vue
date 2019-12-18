<template>
  <Table :title="'Chapters'" :items="chapters" :metadata="metadata" :new_route="'new-chapter'" :edit_route="'edit-chapter'" :deleteItem="deleteChapter"></Table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from '@/components/dashboard/Table.vue';

export default {
  name: 'dashboard-chapters',
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
          title: 'Subtitle',
          identifier: 'subtitle'
        },
        {
          title: 'Text',
          identifier: 'text'
        },
        {
          title: 'Location',
          identifier: 'location'
        },
        {
          title: 'Time Frame',
          identifier: 'time_frame'
        }
      ]
    }
  },
  computed: {
    ...mapState('chapters', ['chapters']),
  },
  methods: {
    ...mapActions('chapters', ['deleteChapter'])
  }
}
</script>