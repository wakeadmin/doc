<template>
  <div class="doc-font" :style="{ fontFamily: value }" title="点击拷贝" @click="handleCopy">
    <div class="doc-font__desc">
      <slot></slot>
    </div>
    <div class="doc-font__name">{{ key }}: {{ realValue }}</div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{ name: string }>();
  const key = computed(() => `--wk-font-family${props.name ? `-${props.name}` : ''}`);
  const value = computed(() => `var(${key.value})`);
  const realValue = computed(() => {
    return getComputedStyle(document.body).getPropertyValue(key.value);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(value.value);
  };
</script>

<style lang="scss" scoped>
  .doc-font {
    padding: 20px;
    font-size: 14px;
    font-weight: bolder;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    margin: 5px;
    border: 1px solid gray;
    cursor: copy;

    &:hover {
      opacity: 0.8;
    }

    &__name {
      text-align: right;
      margin-top: 10px;
    }

    &__desc {
      font-size: 16px;
      color: gray;
      text-align: left;
    }
  }
</style>
