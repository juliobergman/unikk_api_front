<template>
  <transition
    appear
    enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOutDown"
  >
    <slot />
  </transition>
</template>

<style scoped>
.fadeInUp,
.fadeOutDown {
  animation-duration: 0.3s;
}
</style>
