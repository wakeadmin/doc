# 其他

<script setup>
  import BorderRadiusBlock from './BorderRadiusBlock.vue'
  import SpacingBlock from './SpacingBlock.vue'
  import IndexBlock from './IndexBlock.vue'
</script>

<ClientOnly>
<div>

## 圆角

<BorderRadiusBlock name="sm"></BorderRadiusBlock>
<BorderRadiusBlock name="base"></BorderRadiusBlock>
<BorderRadiusBlock name="md"></BorderRadiusBlock>
<BorderRadiusBlock name="lg"></BorderRadiusBlock>
<BorderRadiusBlock name="full"></BorderRadiusBlock>

<br>
<br>
<br>
<br>

## 间隔

<SpacingBlock name="xs" />
<SpacingBlock name="sm" />
<SpacingBlock name="base" />
<SpacingBlock name="md" />
<SpacingBlock name="lg" />
<SpacingBlock name="xl" />

<br>
<br>
<br>
<br>

## 叠层

<div class="index-block-container">
  <IndexBlock v-for="(name, index) of ['normal', 'dropdown', 'sticky', 'fixed', 'modal', 'tooltip']" :key="name" :name="name" :index="index" />
</div>

</div>
</ClientOnly>

<style lang="scss">
  @import "@wakeadmin/theme/theme.css";
  .index-block-container {
    width: 500px;
    height: 500px;
    position: relative;
  }
</style>
