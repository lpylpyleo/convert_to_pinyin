<script>
  import { createEventDispatcher } from 'svelte';
  
  export let favorites = [];
  
  const dispatch = createEventDispatcher();
  
  function loadItem(text) {
    dispatch('load', text);
  }
  
  function removeItem(text) {
    dispatch('remove', text);
  }
</script>

<div class="favorites-section">
  <div class="favorites-header">
    <h3>收藏列表</h3>
    <span class="favorites-count">{favorites.length} 条</span>
  </div>
  <div id="favoritesList">
    {#if favorites.length === 0}
      <div class="empty-favorites">暂无收藏内容</div>
    {:else}
      {#each favorites.slice(0, 50) as text}
        <div class="favorite-item" on:click={() => loadItem(text)}>
          <div class="favorite-text">{text}</div>
          <button 
            class="delete-btn" 
            on:click|stopPropagation={() => removeItem(text)}
          >
            删除
          </button>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .favorites-section {
    margin-top: 40px;
    padding-top: 32px;
    border-top: 2px solid var(--border);
  }

  .favorites-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .favorites-header h3 {
    margin: 0;
    color: var(--text-primary);
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .favorites-header h3::before {
    content: "";
    width: 4px;
    height: 20px;
    background: var(--secondary);
    border-radius: 2px;
  }

  .favorites-count {
    font-size: 14px;
    color: white;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    padding: 6px 16px;
    border-radius: 20px;
    font-weight: 600;
    box-shadow: 0 2px 10px var(--shadow);
  }

  .favorite-item {
    padding: 18px;
    border: 2px solid var(--border);
    border-radius: 12px;
    margin-bottom: 12px;
    background: var(--bg-input);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    transition: all 0.3s;
    cursor: pointer;
  }

  .favorite-item:hover {
    border-color: var(--primary);
    transform: translateX(4px);
    box-shadow: 0 4px 20px var(--shadow);
  }

  .favorite-text {
    flex: 1;
    font-size: 15px;
    line-height: 1.6;
    color: var(--text-primary);
    word-break: break-all;
  }

  .delete-btn {
    padding: 8px 16px;
    font-size: 14px;
    background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.3s;
    font-weight: 600;
  }

  .delete-btn:hover {
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
  }

  .delete-btn:active {
    transform: scale(0.95);
  }

  .empty-favorites {
    padding: 60px 20px;
    text-align: center;
    color: var(--text-secondary);
    font-size: 15px;
    background: var(--bg-input);
    border-radius: 12px;
    margin: 20px 0;
    border: 2px dashed var(--border);
  }
</style>
