<template>
  <div class="doc-font-size" title="点击拷贝" @click="handleCopy">
    <div class="doc-font-size__content">
      <div :style="{ fontWeight: value as any }">
        加粗字体：没有被谁知道，也没有被谁忘记。活在别人的回忆里，那不是我的目的
      </div>
      <div>常规字体：真实未必在现实里，梦往往是最值得依赖的，他不说谎</div>
    </div>
    <div class="doc-font-size__name">{{ key }}: {{ realValue }}</div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const key = `--wk-font-weight`;
  const value = `var(${key})`;

  const realValue = computed(() => {
    return getComputedStyle(document.body).getPropertyValue(key);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
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
