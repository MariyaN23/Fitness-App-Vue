<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
}

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = savedTheme ? savedTheme === 'dark' : prefersDark
  applyTheme()
})

watch(isDark, (newVal) => {
  localStorage.setItem('theme', newVal ? 'dark' : 'light')
  applyTheme()
})
</script>

<template>
  <header>
    <div>
      <h1 class="text-gradient">FITGRAM</h1>
      <button @click="toggleTheme()">
        <i class="fa-solid fa-sun" v-show="isDark"></i>
        <i class="fa-solid fa-moon" v-show="!isDark"></i>
      </button>
    </div>
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <small>Created by</small>
    <a href="https://github.com/MariyaN23" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/138151774?v=4" alt="pfp" />
      <p>MariyaN23</p>
      <i class="fa-brands fa-github"></i>
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

header div {
  display: flex;
  justify-content: space-between;
  align-items: center;
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