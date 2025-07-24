<script setup lang="ts">
</script>

<template>
  <header>
    <h1 class="text-gradient">SMOLGRAM</h1>
  </header>
  <main>
    <slot/>
  </main>
  <footer>
    <small>Created by</small>
    <a href="https://github.com/MariyaN23" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/138151774?v=4" alt="pfp"/>
      <p>MariyaN23</p>
    </a>
  </footer>
</template>

<style scoped>
header,
main,
footer {
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

main {
  flex: 1;
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 0 3rem;
}

footer a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.5rem 0.3rem 0.3rem;
  background: var(--background-muted);
  border: 1px solid var(--color-link-transparent);
  border-radius: 4rem;
  transition-duration: 200ms;
  text-decoration: none;
}

footer a:hover {
  border-color: var(--color-link);
}

footer a img {
  max-width: 30px;
  aspect-ratio: 1/1;
  border-radius: 100%;
}

</style>