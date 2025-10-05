<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
</script>

<div class="controls">
  <button class="btn-primary" on:click={() => dispatch('copy')}>复制结果</button>
  <button on:click={() => dispatch('clear')}>清空</button>
  <button class="btn-favorite" on:click={() => dispatch('addFavorite')}>收藏</button>
</div>

<style>
  .controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 24px 0;
  }

  button {
    padding: 12px 20px;
    font-size: 15px;
    cursor: pointer;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--bg-input);
    color: var(--text-primary);
    font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    touch-action: manipulation;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
  }

  button:active::before {
    width: 300px;
    height: 300px;
  }

  button:active {
    transform: scale(0.98);
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  .btn-primary {
    background: var(--primary);
    color: white;
    border: 1px solid var(--primary-dark);
    grid-column: span 2;
    box-shadow: 0 2px 8px var(--shadow);
  }

  .btn-primary:hover {
    background: var(--primary-dark);
    box-shadow: 0 4px 12px var(--shadow);
  }

  .btn-favorite {
    background: #a18f7e;
    color: white;
    border: 1px solid #7c6e5d;
  }

  .btn-favorite:hover {
    background: #7c6e5d;
    box-shadow: 0 0 10px rgba(124, 110, 93, 0.3);
  }

  @media (min-width: 769px) {
    .controls {
      display: flex;
      grid-template-columns: none;
    }

    .btn-primary {
      grid-column: auto;
    }
  }
</style>
