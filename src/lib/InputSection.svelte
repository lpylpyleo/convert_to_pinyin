<script>
  import { createEventDispatcher } from 'svelte';
  
  export let value = '';
  export let charCount = 0;
  
  const dispatch = createEventDispatcher();
  
  function handleInput(event) {
    dispatch('input', event);
  }
</script>

<div class="input-section">
  <label for="chinese-input" class="input-label">
    输入中文文本
    <span class="char-count">{charCount} 字符</span>
  </label>
  <textarea 
    id="chinese-input"
    bind:value
    on:input={handleInput}
    placeholder="例如：你好，世界！"
  ></textarea>
  <div class="shortcut-hint">输入即自动转换</div>
</div>

<style>
  .input-section {
    margin-bottom: 24px;
    position: relative;
  }

  .input-label {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
    color: var(--text-primary);
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  .char-count {
    float: right;
    font-size: 14px;
    color: var(--primary);
    font-weight: 500;
  }

  textarea {
    width: 100%;
    height: 140px;
    font-size: 16px;
    padding: 16px;
    border: 1px solid var(--border);
    border-radius: 4px;
    resize: none;
    font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: var(--bg-card);
    color: var(--text-primary);
    transition: all 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
    line-height: 1.8;
  }
  
  :global([data-theme="light"]) textarea {
    background: rgba(255, 255, 255, 0.9);
  }

  textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(124, 110, 93, 0.1);
  }

  .shortcut-hint {
    font-size: 13px;
    color: var(--text-secondary);
    margin-top: 8px;
    font-style: italic;
  }
</style>
