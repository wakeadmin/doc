<template>
  <div class="doc-tw-header">
    <span class="doc-tw-header__class"> Class </span>
    <span class="doc-tw-header__properties"> Properties </span>
    <span class="doc-tw-header__example"> </span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .doc-tw-header {
    padding: 16px;
    font-size: 18px;
    font-weight: bolder;
    width: 100%;
    display: flex;
    gap: 11.2px;
    position: sticky;
    top: 0;
    background-color: #f3f3f3;
    z-index: 1;
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
      text-align: center;
    }
  }
</style>
