<template>
  <div class="doc-font-size" title="点击拷贝" @click="handleCopy">
    <div class="doc-font-size__content" :style="{ fontSize: sizeValue, lineHeight: lineHeightValue }">
      <slot></slot>
    </div>
    <div class="doc-font-size__name">
      {{ sizeKey }}: {{ realSizeValue }}; {{ lineHeightKey }}: {{ realLineHeightValue }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{ name: string }>();
  const sizeKey = computed(() => `--wk-font-size${props.name && '-' + props.name}`);
  const lineHeightKey = computed(() => `--wk-font-line-height${props.name && '-' + props.name}`);

  const sizeValue = computed(() => `var(${sizeKey.value})`);
  const lineHeightValue = computed(() => `var(${lineHeightKey.value})`);

  const realSizeValue = computed(() => {
    return getComputedStyle(document.body).getPropertyValue(sizeKey.value);
  });

  const realLineHeightValue = computed(() => {
    return getComputedStyle(document.body).getPropertyValue(lineHeightKey.value);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(`font-size: ${sizeValue.value};\nline-height: ${lineHeightValue.value};`);
  };
</script>

<style lang="scss" scoped>
  .doc-font-size {
    padding: 20px;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    margin: 5px;
    border: 1px solid gray;
    cursor: copy;

    &:hover {
      opacity: 0.8;
    }

    &__content {
      text-align: left;
      border: 1px solid #ededed;
      border-radius: 3px;
    }

    &__name {
      text-align: right;
      margin-top: 10px;
      color: gray;
    }
  }
</style>
