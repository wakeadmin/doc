<template>
  <div class="spacing" @click="handleCopy">
    <div class="spacing__name">{{ key }}: {{ realValue }}</div>
    <div class="spacing__content">
      <div v-for="i of 3" :key="i" class="spacing__box" :style="{ margin: value }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{ name: string }>();
  const key = computed(() => `--wk-spacing-${props.name}`);
  const value = computed(() => `var(${key.value})`);
  const realValue = computed(() => {
    return getComputedStyle(document.body).getPropertyValue(key.value);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(value.value);
  };
</script>

<style scoped lang="scss">
  .spacing {
    border: 1px solid gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    padding: 10px;
    border-radius: 5px;

    cursor: copy;

    &__content {
      border: 1px solid #ededed;
    }

    &__box {
      display: inline-block;
      width: 120px;
      height: 50px;
      background-color: gray;
    }

    &__name {
      font-weight: bold;
    }

    &:hover {
      opacity: 0.7;
    }
  }
</style>
