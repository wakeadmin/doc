<template>
  <img :src="`https://img.shields.io/npm/v/${props.name}.svg?style=flat`" style="display: inline" />
</template>

<script setup lang="ts">
  const props = defineProps<{ name: string }>();
</script>
