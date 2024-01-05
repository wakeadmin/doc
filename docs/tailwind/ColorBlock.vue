<template>
  <div class="doc-tw-color" :class="[props.size]" title="点击拷贝" @click="handleCopy">
    <span class="doc-tw-color__class"> {{ text }}</span>
    <span class="doc-tw-color__properties"> {{ style }} </span>
    <span class="doc-tw-color__example" :style="style"> Aa </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    name: string;
    size?: 'small' | 'default';
    prefix?: string;
    default?: boolean;
    styleName?: string;
  }>();
  const style = computed(() => `${props.styleName || 'color'}: var(--wk-color-${props.name})`);
  const name = computed(() => {
    if (props.default) {
      return props.name.replace(/-[^-]+$/, '');
    }
    return props.name;
  });
  const text = computed(() => `${props.prefix || ''}${name.value}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(text.value);
  };
</script>

<style lang="scss">
  .doc-tw-color {
    padding: 20px;
    font-size: 20px;
    font-weight: bolder;
    cursor: copy;
    width: 100%;
    display: flex;
    gap: 11.2px;
    align-items: center;

    border-bottom: 1px solid #ccc;
    text-align: left;

    &__class {
      width: 28%;
    }

    &__properties {
      width: 61%;
      flex: 1;
      padding-left: 28px;
    }

    &__example {
      width: 83px;
      margin: 0 11px;
      text-align: center;
      border: 1px solid transparent;
      color: transparent;
    }

    &:hover {
      opacity: 0.8;
    }

    &.small {
      font-size: 16px;
      padding: 10px;
    }
  }
</style>
