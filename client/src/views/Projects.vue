<template>
  <section id="projects" class="hero is-medium">
    <h2 class="title is-size-2-desktop hidden-fade-in-left section-title" v-fadein="'showElement'">Projects Title</h2>
    <div class="hero-body">
      <div class="container">

        <div class="columns project-wrapper">
          <div class="column is-third project-text">
            <h4>Rat-Maze project was the final project for my Java class. The purpose of it was to create a server side (Maze) and a client side (Rat) and be able to connect the two through a TCP/IP protocol. The github repository includes the Java classes used in the project, as well as the Java executables.</h4>
          </div>
          <div class="column is-two-thirds project-images is-flex">
            <img class="project-code right-side" src="/images/projects/Rat-Maze_Code.jpg" alt="Project Image Unavailable">
            <div class="gif-wrapper">
              <img class="project-gif" src="/images/projects/Rat-Maze.gif" alt="Project Image Unavailable">
            </div>
          </div>
        </div>

        <div class="columns project-wrapper project-reverse">
          <div class="column is-third project-text">
            <h4>Sudoku Solver project was a part of my Artificial Intelligence class. The program reads lines of ints, each representing a different sudoku, it also assigns an ID to each sudoku in the .txt file. Then it uses the backtracking algorithm to solve the sudoku and print it to the console. This project was a fun challenge that taught me a lot about the backtracking algorithm and its uses.</h4>
          </div>
          <div class="column is-two-thirds project-images is-flex">
            <img class="project-code left-side" src="/images/projects/Sudoku-Solver_Code.jpg" alt="Project Image Unavailable">
            <div class="gif-wrapper">
              <img class="project-gif" src="/images/projects/Sudoku-Solver.gif" alt="Project Image Unavailable">
            </div>
          </div>
        </div>

        <div class="columns project-wrapper">
          <div class="column is-third project-text">
            <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet ipsam, dignissimos beatae atque delectus facilis dicta sint est temporibus repudiandae quas quibusdam officiis quae! Maiores autem commodi voluptatum harum? Iusto alias non, odio nulla quia iste cumque officiis. Doloribus facere quos blanditiis quam at magni harum perspiciatis? Laudantium nostrum eos doloremque distinctio aliquam et, culpa quos illum in at quas reiciendis possimus recusandae maiores natus, pariatur nulla quaerat labore impedit voluptate adipisci ex, magnam incidunt.</h4>
          </div>
          <div class="column project-images is-flex">
            <img class="project-code right-side" src="/images/projects/Rat-Maze_Code.jpg" alt="Project Image Unavailable">
            <img class="project-gif" src="/images/projects/Rat-Maze.gif" alt="Project Image Unavailable">
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
#projects .project-wrapper {
  margin-bottom: 15rem;
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
  right: 24rem;
}
.project-code.left-side {
  left: 1rem;
}
.project-gif {
  height: inherit;
  width: inherit;
}
</style>