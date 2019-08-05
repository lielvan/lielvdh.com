<template>
  <section id="projects" class="hero is-medium">
    <h2 class="title is-size-2-desktop hidden-fade-in-left section-title" v-fadein="'showElement'">Projects Title</h2>
    <div class="hero-body projects-wrapper">
      <div class="container">

        <div class="columns project-wrapper">
          <div class="column is-full-touch is-one-third-desktop project-text">
            <p class="is-size-6-touch">Rat-Maze project was the final project for my Java class. The purpose of it was to create a server side (Maze) and a client side (Rat) and be able to connect the two through a TCP/IP protocol. The github repository includes the Java classes used in the project, as well as the Java executables.</p>
          </div>
          <div class="column is-full-touch is-two-thirds-desktop project-images is-flex">
            <img class="project-code right-side" src="/images/projects/Rat-Maze_Code.jpg" alt="Project Image Unavailable">
            <div class="gif-wrapper">
              <img class="project-gif" src="/images/projects/Rat-Maze.gif" alt="Project Image Unavailable">
            </div>
          </div>
        </div>
        <div class="columns project-wrapper project-reverse">
          <div class="column is-full-touch is-one-third-desktop project-text">
            <p class="is-size-6-touch">Sudoku Solver project was a part of my Artificial Intelligence class. The program reads lines of ints, each representing a different sudoku, it also assigns an ID to each sudoku in the .txt file. Then it uses the backtracking algorithm to solve the sudoku and print it to the console. This project was a fun challenge that taught me a lot about the backtracking algorithm and its uses.</p>
          </div>
          <div class="column is-full-touch is-two-thirds-desktop project-images is-flex">
            <img class="project-code left-side" src="/images/projects/Sudoku-Solver_Code.jpg" alt="Project Image Unavailable">
            <div class="gif-wrapper">
              <img class="project-gif" src="/images/projects/Sudoku-Solver.gif" alt="Project Image Unavailable">
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
  display: flex;
  align-items: center;
  line-height: 2.1;
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
@media only screen and (max-width: 1023px) {
  #projects .project-wrapper {
    margin-top: 8rem;
    margin-bottom: 12rem;
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
@media only screen and (min-width: 425px) and (max-width: 1023px) {

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
    line-height: 1.5;
  }
  .gif-wrapper {
    height: 200px;
    width: 100%;
  }
}
</style>