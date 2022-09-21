<template>
  <v-app>
    <BaseLayout />
  </v-app>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  name: "App",
  components: {
    BaseLayout,
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
