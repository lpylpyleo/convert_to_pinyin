<script>
  export let show = false;
  export let message = '';
  
  let hideTimer;
  
  $: if (show) {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      show = false;
    }, 2000);
  }
</script>

{#if show}
  <div id="toast" class="show">
    {message}
  </div>
{/if}

<style>
  #toast {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary);
    color: #fff;
    padding: 14px 28px;
    border-radius: 28px;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    font-size: 15px;
    font-weight: 600;
    z-index: 1000;
    white-space: nowrap;
    box-shadow: 0 4px 20px var(--shadow);
    backdrop-filter: blur(10px);
  }

  #toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(-10px);
  }
</style>
