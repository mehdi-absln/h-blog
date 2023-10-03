<template>
  <div class="position-fixed start-0 top-0 w-100 d-flex justify-content-center align-items-center h-100 spinner-container">
    <div class="spinner">
      <span class="spinner-inner-1"></span>
      <span class="spinner-inner-2"></span>
      <span class="spinner-inner-3"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComp"
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variable";
$spinner: $dark;
$background: rgba(0, 0, 0, 0.7);
$size: 60px;

.spinner-container {
  background-color: $background;
  z-index: 5;
}

.spinner {
  top: calc(50% - #{$size / 2});
  left: calc(50% - #{$size / 2});
  width: $size;
  height: $size;
  animation: spinner 0.75s linear infinite;
  z-index: 6;

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .spinner-inner-1 {
    background: linear-gradient(to right, rgba($spinner, 0) 0%, rgba($spinner, 0) 50%, $spinner 51%);
  }

  .spinner-inner-2 {
    background: linear-gradient(to top, rgba($background, 0) 0%, $background 100%);
  }

  .spinner-inner-3 {
    $offset: $size * 0.1;
    top: $offset;
    left: $offset;
    width: $size - ($offset * 2);
    height: $size - ($offset * 2);
    background: $background;
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
