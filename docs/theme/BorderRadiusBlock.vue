<template>
  <div class="border-radius" :style="{ borderRadius: value }" @click="handleCopy">
    {{ key }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{ name: string }>();
  const key = computed(() => `--wk-border-radius-${props.name}`);
  const value = computed(() => `var(${key.value})`);

  const handleCopy = () => {
    navigator.clipboard.writeText(value.value);
  };
</script>

<style scoped lang="scss">
  .border-radius {
    border: 1px solid gray;
    width: 200px;
    height: 200px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    font-weight: bold;

    cursor: copy;
    line-height: 1;
    text-align: center;
    vertical-align: middle;

    &:hover {
      opacity: 0.7;
    }
  }
</style>
