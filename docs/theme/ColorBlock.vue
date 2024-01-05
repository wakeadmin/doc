<template>
  <div class="doc-color" :class="[props.size]" :style="{ background: value }" title="点击拷贝" @click="handleCopy">
    {{ value }}
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{ name: string; size?: 'small' | 'default' }>();
  const value = computed(() => `var(--wk-color-${props.name})`);

  const handleCopy = () => {
    navigator.clipboard.writeText(value.value);
  };
</script>

<style lang="scss">
  .doc-color {
    padding: 20px;
    color: white;
    font-size: 20px;
    font-weight: bolder;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    margin: 5px;
    cursor: copy;

    &:hover {
      opacity: 0.8;
    }

    &.small {
      font-size: 16px;
      border-radius: 2px;
      margin: 2px;
      padding: 10px;
    }
  }
</style>
