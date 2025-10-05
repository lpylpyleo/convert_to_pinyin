<script>
  export let outputText = '';
  export let hasContent = false;
</script>

<div class="output-section">
  <h3>拼音结果</h3>
  <div id="output" class:has-content={hasContent}>
    {outputText}
  </div>
</div>

<style>
  .output-section {
    margin: 32px 0;
  }

  .output-section h3 {
    margin: 0 0 16px 0;
    color: var(--text-primary);
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
    border-bottom: 1px solid var(--border);
    padding-bottom: 10px;
  }

  .output-section h3::before {
    content: "『";
    color: var(--primary);
  }
  
  .output-section h3::after {
    content: "』";
    color: var(--primary);
  }

  #output {
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 4px;
    min-height: 100px;
    background: var(--bg-input);
    color: var(--text-primary);
    white-space: pre-wrap;
    font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif;
    line-height: 1.8;
    word-break: break-all;
    font-size: 16px;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  #output.has-content {
    border-color: var(--primary);
    box-shadow: 0 2px 10px var(--shadow);
  }
</style>
