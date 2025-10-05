<script>
  import { onMount } from 'svelte';
  
  let theme = 'light';
  
  onMount(() => {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        theme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      }
    });
  });
  
  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<div class="header">
  <h1>中文转拼音工具</h1>
  <button class="theme-toggle" on:click={toggleTheme} title="切换主题">
    <span class="theme-emoji">
      {#if theme === 'dark'}
        🌙
      {:else}
        🌞
      {/if}
    </span>
  </button>
</div>

<style>
  .header {
    background: var(--primary);
    color: white;
    padding: 20px;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px var(--shadow);
    transform: translateZ(0);
    will-change: transform;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid var(--border);
  }

  .header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 2px;
    color: #fff;
    position: relative;
    font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  }
  
  .header h1::before,
  .header h1::after {
    content: "「";
    position: absolute;
    left: -20px;
    top: 0;
    opacity: 0.7;
    font-weight: 300;
  }
  
  .header h1::after {
    content: "」";
    left: auto;
    right: -20px;
  }

  .theme-toggle {
    position: absolute;
    right: 20px;
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
  }

  .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(180deg);
  }

  .theme-emoji {
    font-size: 20px;
    line-height: 1;
  }

  @media (min-width: 769px) {
    .header {
      position: static;
      border-radius: 16px 16px 0 0;
    }

    .header h1 {
      font-size: 26px;
    }
  }
</style>
