<template>
  <ProjectsForm :title="'Create'" :request_type="'create'"></ProjectsForm>
</template>

<script>
import ProjectsForm from '@/components/dashboard/ProjectsForm.vue';
export default {
  name: 'project-new',
  components: {
    ProjectsForm,
  }
}
</script>