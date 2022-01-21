<template>
  <transition
    appear
    enter-active-class="animated flipInX"
    leave-active-class="animated flipOutX"
  >
    <slot />
  </transition>
</template>
<style scoped>
.flipInX,
.flipOutX {
  animation-duration: 0.5s; /* don't forget to set a duration! */
}
</style>
