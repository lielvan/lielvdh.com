<template>
  <Table :title="'General'" :items="generals" :metadata="metadata" :new_route="'new-general'" :edit_route="'edit-general'" :deleteItem="deleteGeneral"></Table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from '@/components/dashboard/Table.vue';

export default {
  name: 'dashboard-general',
  components: {
    Table
  },
  data() {
    return {
      metadata: [
        {
          title: 'Label',
          identifier: 'label'
        },
        {
          title: 'Text',
          identifier: 'text'
        },
        {
          title: 'Is File?',
          identifier: 'is_file'
        },
        {
          title: 'Created At',
          identifier: 'createdAt'
        }
      ]
    }
  },
  computed: {
    ...mapState('general', ['generals']),
  },
  methods: {
    ...mapActions('general', ['deleteGeneral'])
  }
}
</script>