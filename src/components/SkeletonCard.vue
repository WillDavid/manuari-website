<template>
  <div class="skeleton-card"></div>
</template>

<style scoped>
.skeleton-card {
  width: 100%;
  aspect-ratio: 1 / 1.25;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    #eeeeee 25%,
    #f5f5f5 37%,
    #eeeeee 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}
</style>
