<template>
  <div class="doc-tw-border-radius" :class="[props.size]" title="点击拷贝" @click="handleCopy">
    <span class="doc-tw-border-radius__class"> {{ text }}</span>
    <span class="doc-tw-border-radius__properties"> {{ style }} </span>
    <span class="doc-tw-border-radius__example" :style="style"> Aa </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    name: string;
    size?: 'small' | 'default';
    default?: boolean;
  }>();

  const style = computed(() => {
    if (props.name.endsWith('none')) {
      return 'border-radius: 0';
    }
    return `border-radius: var(--wk-border-${props.name})`;
  });

  const name = computed(() => {
    if (props.default) {
      return props.name.replace(/-[^-]+$/, '');
    }
    return props.name;
  });

  const text = computed(() => {
    const val = name.value.replace('radius', '');
    if (val) {
      return `rounded${val}`;
    }
    return `rounded`;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(text.value);
  };
</script>

<style lang="scss">
  .doc-tw-border-radius {
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
      width: 89px;
      height: 89px;
      margin-right: 11px;
      text-align: center;
      border: 1px solid rgb(229, 170, 155);
      color: transparent;
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
