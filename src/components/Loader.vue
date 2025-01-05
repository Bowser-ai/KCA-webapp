<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  border: 4px solid #f3f3f3; /* Light gray background */
  border-top: 4px solid #3498db; /* Blue color for the spinning part */
  border-radius: 50%; /* Make it circular */
  width: 40px; /* Set the width of the spinner */
  height: 40px; /* Set the height of the spinner */
  animation: spin 1s linear infinite; /* Animation to make it spin */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  } /* Start at 0 degrees */
  100% {
    transform: rotate(360deg);
  } /* End at 360 degrees */
}
</style>
