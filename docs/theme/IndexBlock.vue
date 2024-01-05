<template>
  <div class="index" :style="{ top: offset, left: offset, zIndex: value as any }" @click="handleCopy">
    {{ key }}: {{ realValue }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{ name: string; index: number }>();
  const key = computed(() => `--wk-z-index-${props.name}`);
  const offset = computed(() => `${props.index * 50}px`);
  const value = computed(() => `var(${key.value})`);
  const realValue = computed(() => {
    return getComputedStyle(document.body).getPropertyValue(key.value);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(value.value);
  };
</script>

<style scoped lang="scss">
  .index {
    position: absolute;
    border: 1px solid gray;
    background-color: white;
    width: 250px;
    height: 200px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    color: black;

    cursor: copy;

    &:hover {
      background-color: #ededed;
      z-index: 9999 !important;
      box-shadow: 11px 9px 18px 0px #dfdfdf;
    }
  }
</style>
