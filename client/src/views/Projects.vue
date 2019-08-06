<template>
  <section id="projects" class="hero is-medium">
    <h2 class="title is-size-2-desktop hidden-fade-in-left section-title" v-fadein="'showElement'">Selected Projects <br> I Enjoyed Crafting</h2>
    <div class="hero-body projects-wrapper">
      <div class="container">

        <div class="columns project-wrapper hidden-fade-in-top" 
          v-for="(project, index) in projects" 
          v-bind:item="project" v-bind:index="index" v-bind:key="project._id" 
          :class="[index % 2 !== 0 ? 'project-reverse hidden-fade-in-top': 'hidden-fade-in-bottom']"
          v-fadein="'showElement'"
        >
          <div class="column is-full-mobile is-two-thirds-tablet is-one-third-desktop project-text is-flex">
            <p class="is-size-6-touch"><span class="project-title is-size-4">{{ project.title }}</span> {{ project.text }}</p>
            <div class="project-footer is-flex">
              <p><span>Language:</span> &nbsp; <span class="is-italic is-capitalized has-text-weight-bold">{{ project.language }}</span></p>
              <a :href="project.github_link"><span class="icon fas fa-lg"><font-awesome-icon :icon="['fab', 'github-alt']"></font-awesome-icon></span> GitHub Repository</a>
            </div>
          </div>
          <div class="column is-full-touch is-two-thirds-desktop project-images is-flex">
            <img class="project-code right-side" :src="project.code_image" alt="Project Image Unavailable">
            <div class="gif-wrapper">
              <img class="project-gif" :src="project.gif_image" alt="Project Image Unavailable">
            </div>
          </div>
        </div>

      </div>
    </div>
    
  </section>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      projects: [],
      error: ''
    }
  },
  created() {
    this.$store.dispatch('projects/getProjects')
      .then((projects) => {
        this.projects = projects;
      })
      .catch(err => {
        this.error = err.message;
      })
  },
}
</script>

<style>
#projects .projects-wrapper {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
#projects .columns {
  margin: 0;
}
#projects .project-wrapper {
  margin-top: 3rem;
  margin-bottom: 16rem;
}
.project-reverse {
  flex-direction: row-reverse;
}
#projects .project-text {
  line-height: 1.85rem;
  flex-direction: column;
  text-align: start;
}
.project-text span.project-title {
  display: inline-block;
  background-color: #00d1b2;
  color: white;
  padding: 0 4px;
  transform: skew(10deg, 0deg);
}
.project-text .project-footer {
  flex: auto;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 10px 5px;
}
.project-text .project-footer a {
  display: flex;
  position: relative;
  align-items: center;
  width: max-content;
  height: fit-content;
  font-weight: 600;
  color: #00d1b2;
  transition: all 0.5s ease;
}
.project-text .project-footer a::after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  height: 0;
  width: 0;
  transition: all 0.5s ease;
}
.project-text .project-footer a:hover::after {
  left: 0;
  height: 2px;
  width: 100%;
  background-color:#009982;
  transform: scale(1);
}
.project-text .project-footer a:hover {
  color: #009982;
}
.project-text .project-footer a span {
  margin-right: 5px;
}
.project-footer p span:first-child {
  display: inline-block;
  background-color: #00d1b2;
  color: white;
  padding: 0 5px;
  transform: skew(10deg, 0deg);
}
.project-reverse .project-images .gif-wrapper {
  left: -50px;
}
.gif-wrapper {
  position: relative;
  height: 270px;
  width: 450px;
}
.project-images {
  justify-content: flex-end;
  position: relative;
}
#projects img {
  border-radius: 5px;
  box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.75);
}
.project-code {
  position: absolute;
  height: 320px;
  width: 450px;
  top: -1rem;
}
.project-code.right-side {
  left: 4rem;
}
.project-code.left-side {
  left: 1rem;
}
.project-gif {
  height: inherit;
  width: inherit;
}

/**********************/
/* Responsive Styling */
/**********************/
@media only screen and (max-width: 1023px) {
  #projects .project-wrapper {
    margin-top: 8rem;
    margin-bottom: 12rem;
  }
  #projects .project-text {
    align-self: center;
    text-align: center;
  }
  .project-text .project-footer {
    align-items: center;
    padding-top: 24px;
  }
  .gif-wrapper {
    height: 225px;
    width: 411px;
  }
  .project-code {
    height: 250px;
    width: 305px;
    top: -3rem;
  }
  .project-wrapper {
    display: flex;
    flex-direction: column-reverse;
  }
  .project-images {
    justify-content: center;
  }
}
@media only screen and (max-width: 768px) {
  #projects .project-wrapper { 
    margin-top: 0;
    margin-bottom: 6rem;
  }
  .gif-wrapper {
    height: 200px;
    width: 80%;
  }
  .project-reverse .project-images .gif-wrapper {
    left: 0;
  }
  .project-code {
    display: none;
  }
}
@media only screen and (max-width: 425px) {
  #projects .project-wrapper { 
    margin-top: 0;
    margin-bottom: 8rem;
  }
  #projects .project-text {
    line-height: 1.5rem;
  }
  .gif-wrapper {
    height: 200px;
    width: 100%;
  }
}
</style>