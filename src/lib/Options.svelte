<script>
  export let toneType = 'mark';
  export let keepPunc = true;
  export let firstLetter = false;
</script>

<div class="options">
  <div class="options-row">
    <div class="option-group">
      <span class="option-label">音调格式：</span>
      <label>
        <input type="radio" bind:group={toneType} value="mark"> 符号
      </label>
      <label>
        <input type="radio" bind:group={toneType} value="num"> 数字
      </label>
      <label>
        <input type="radio" bind:group={toneType} value="none"> 无
      </label>
    </div>
    <div class="option-group">
      <label>
        <input type="checkbox" bind:checked={keepPunc}>
        保留标点
      </label>
      <label>
        <input type="checkbox" bind:checked={firstLetter}>
        首字母
      </label>
    </div>
  </div>
</div>

<style>
  .options {
    margin: 20px 0;
    padding: 20px;
    background: var(--bg-card);
    border-radius: 4px;
    border: 1px solid var(--border);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  }
  
  :global([data-theme="light"]) .options {
    background: rgba(255, 255, 255, 0.9);
  }
  
  .options::before {
    content: "⟨ 选项 ⟩";
    display: block;
    margin-bottom: 15px;
    font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
    color: var(--primary);
    font-size: 14px;
    letter-spacing: 1px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 10px;
  }

  .options-row {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .option-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
  }

  .option-label {
    font-weight: 600;
    color: var(--primary);
    font-size: 15px;
  }

  .option-group label {
    font-size: 15px;
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
  }

  .option-group label:hover {
    color: var(--primary);
  }

  input[type="checkbox"],
  input[type="radio"] {
    margin: 0;
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: relative;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--bg-input);
    border: 2px solid var(--border);
    transition: all 0.3s;
  }

  :global([data-theme="light"]) input[type="checkbox"],
  :global([data-theme="light"]) input[type="radio"] {
    background: #fff;
    border-color: #d4c8bc;
  }

  input[type="radio"] {
    border-radius: 50%;
  }

  input[type="checkbox"] {
    border-radius: 4px;
  }

  input[type="checkbox"]:checked,
  input[type="radio"]:checked {
    background: var(--primary);
    border-color: var(--primary);
  }

  input[type="checkbox"]:checked::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
    font-weight: bold;
  }

  input[type="radio"]:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
  }

  input[type="checkbox"]:hover,
  input[type="radio"]:hover {
    border-color: var(--primary);
  }

  @media (min-width: 769px) {
    .options-row {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }
  }
</style>
