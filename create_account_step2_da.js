<script src="https://cdn.jsdelivr.net/gh/wiredrelations/website-static/signup_da.js" type="text/javascript"></script>
<!--Tooltip Scripts & Settings-->
<script src="https://unpkg.com/popper.js@1"></script>
<script src="https://unpkg.com/tippy.js@4"></script>
<script>
  const passwordhelpcontent = document.getElementById('passwordhelpcontent');
  tippy('.tooltippsw', {
  placement: 'bottom-start',
  allowHTML: true,
  animation: 'fade',
  duration: 200,
  arrow: true,
  delay: [0, 50],
  arrowType: 'sharp',
  theme: 'space',
  maxWidth: 500,
  interactive: true,
  content: passwordhelpcontent.innerHTML
})
</script>
<!--Lottie Scripts & Settings-->
<script src="https://unpkg.com/@lottiefiles/lottie-player@0.4.0/dist/lottie-player.js"></script>