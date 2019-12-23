<template>
  <ProjectsForm :title="'Edit'" :request_type="'edit'"></ProjectsForm>
</template>

<script>
import ProjectsForm from '@/components/dashboard/ProjectsForm.vue';
export default {
  name: 'project-edit',
  components: {
    ProjectsForm,
  }
}
</script>