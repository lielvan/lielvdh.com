<template>
  <Table :title="'Motos'" :items="motos" :metadata="metadata" :new_route="'new-moto'" :edit_route="'edit-moto'" :deleteItem="deleteMoto"></Table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from '@/components/dashboard/Table.vue';

export default {
  name: 'dashboard-motos',
  components: {
    Table
  },
  data() {
    return {
      metadata: [
        {
          title: 'ID',
          identifier: '_id'
        },
        {
          title: 'Text',
          identifier: 'text'
        },
        {
          title: 'Created At',
          identifier: 'createdAt'
        }
      ]
    }
  },
  computed: {
    ...mapState('motos', ['motos']),
  },
  methods: {
    ...mapActions('motos', ['deleteMoto'])
  }
}
</script>