<template>
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 511.38"
  >
    <defs>
      <radialGradient
        id="radial-gradient"
        cx="263.33"
        cy="220.61"
        r="249.06"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#fff" />
        <stop offset="1" stop-color="#e6e6e6" />
      </radialGradient>
      <radialGradient
        id="radial-gradient-4"
        cx="253.61"
        cy="254.63"
        r="432.23"
        xlink:href="#radial-gradient"
      />
    </defs>
    <g>
      <polygon
        class="cls-1"
        points="148.5 296.39 186.39 372.16 320.47 104 244.7 104 148.5 296.39"
      />
      <polygon
        class="cls-1"
        points="52.31 104 121.46 242.3 190.61 104 52.31 104"
      />
      <polygon
        class="cls-1"
        points="256 511.38 459.69 104 374.56 104 213.43 426.25 256 511.38"
      />
      <path
        class="cls-2"
        d="M256,28.55A225.89,225.89,0,0,1,377.71,64H425.3A255.93,255.93,0,0,0,86.7,64h47.58A225.94,225.94,0,0,1,256,28.55Z"
      />
      <path
        class="cls-2"
        d="M468.66,175.52A225.88,225.88,0,0,1,483.45,256c0,103.49-69.5,191-164.27,218.46l-16.65,33.3C421.7,485.88,512,381.49,512,256a255,255,0,0,0-26.66-113.84Z"
      />
      <path
        class="cls-2"
        d="M28.55,256a225.88,225.88,0,0,1,14.79-80.48L26.66,142.16A255,255,0,0,0,0,256C0,381.49,90.3,485.88,209.47,507.76l-16.65-33.3C98.05,447,28.55,359.49,28.55,256Z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "MainLogo",
  props: {
    fill: {
      type: String,
      default: "black",
    },
  },
};
</script>

<style scoped>
.cls-1 {
  fill: url(#radial-gradient);
}

.cls-2 {
  fill: url(#radial-gradient-4);
}
</style>
