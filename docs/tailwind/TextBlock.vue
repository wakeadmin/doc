<template>
  <div
    class="doc-tw-text"
    :class="[props.size]"
    :title="props.allowCopy ? '点击拷贝' : ''"
    :style="{
      cursor: props.allowCopy ? 'copy' : 'default',
    }"
    @click="handleCopy"
  >
    <span class="doc-tw-text__class"> {{ text }}</span>
    <span class="doc-tw-text__properties"> {{ style }} </span>
    <span class="doc-tw-text__example"> {{ val }} </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    name: string;
    size?: 'small' | 'default';
    default?: boolean;
    val: string;
    properties?: string;
    allowCopy: boolean;
  }>();

  const style = computed(() => {
    if (props.properties) {
      return props.properties;
    }
    return `var(--wk-color-${props.name})`;
  });

  const name = computed(() => {
    if (props.default) {
      return props.name.replace(/-[^-]+$/, '');
    }
    return props.name;
  });

  const text = computed(() => {
    return name.value;
  });

  const handleCopy = () => {
    if (props.allowCopy) {
      navigator.clipboard.writeText(text.value);
    }
  };
</script>

<style lang="scss">
  .doc-tw-text {
    padding: 20px;
    font-size: 20px;
    font-weight: bolder;
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
      white-space: pre-line;
    }

    &__example {
      width: 89px;
      margin-right: 11px;
      text-align: center;
    }

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
