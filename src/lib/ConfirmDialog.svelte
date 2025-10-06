<script>
  import { createEventDispatcher } from 'svelte';
  
  export let show = false;
  export let title = '确认删除';
  export let message = '确定要删除这条收藏吗？';
  export let confirmText = '确定';
  export let cancelText = '取消';
  
  const dispatch = createEventDispatcher();
  
  function handleConfirm() {
    dispatch('confirm');
    close();
  }
  
  function handleCancel() {
    dispatch('cancel');
    close();
  }
  
  function close() {
    show = false;
  }
  
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      handleCancel();
    }
  }
  
  function handleKeydown(event) {
    if (!show) return;
    
    if (event.key === 'Escape') {
      handleCancel();
    } else if (event.key === 'Enter') {
      handleConfirm();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if show}
  <div 
    class="dialog-backdrop" 
    on:click={handleBackdropClick}
    on:keydown={() => {}}
    role="presentation"
  >
    <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <h3 id="dialog-title" class="dialog-title">{title}</h3>
      <p class="dialog-message">{message}</p>
      <div class="dialog-actions">
        <button class="btn-cancel" on:click={handleCancel}>
          {cancelText}
        </button>
        <button class="btn-confirm" on:click={handleConfirm}>
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.2s ease-out;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
  
  .dialog {
    background: var(--bg-card);
    border-radius: 16px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
    border: 1px solid var(--border);
  }
  
  .dialog-title {
    margin: 0 0 12px 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .dialog-message {
    margin: 0 0 24px 0;
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.5;
  }
  
  .dialog-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
  
  .btn-cancel,
  .btn-confirm {
    padding: 10px 20px;
    font-size: 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    min-width: 80px;
  }
  
  .btn-cancel {
    background: var(--bg-input);
    color: var(--text-primary);
    border: 2px solid var(--border);
  }
  
  .btn-cancel:hover {
    background: var(--border);
    transform: translateY(-1px);
  }
  
  .btn-cancel:active {
    transform: translateY(0);
  }
  
  .btn-confirm {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
    color: white;
    border: 2px solid transparent;
  }
  
  .btn-confirm:hover {
    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4);
    transform: translateY(-1px);
  }
  
  .btn-confirm:active {
    transform: translateY(0);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideIn {
    from {
      transform: scale(0.9) translateY(-20px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    .dialog {
      padding: 20px;
      margin: 0 16px;
    }
    
    .dialog-title {
      font-size: 18px;
    }
    
    .dialog-message {
      font-size: 15px;
    }
  }
</style>
