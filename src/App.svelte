<script>
  import { onMount } from 'svelte';
  import { pinyin } from 'pinyin-pro';
  import Header from './lib/Header.svelte';
  import InputSection from './lib/InputSection.svelte';
  import Options from './lib/Options.svelte';
  import Controls from './lib/Controls.svelte';
  import OutputSection from './lib/OutputSection.svelte';
  import FavoritesSection from './lib/FavoritesSection.svelte';
  import Toast from './lib/Toast.svelte';

  // 状态管理
  let inputText = '';
  let outputText = '请在上方输入中文文本';
  let hasContent = false;
  let charCount = 0;
  let toastMessage = '';
  let showToast = false;
  let favorites = [];
  let debounceTimer;

  // 选项状态
  let toneType = 'mark';
  let keepPunc = true;
  let firstLetter = false;

  // 获取URL参数中的用户ID
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');

  onMount(() => {
    if (!userId) {
      showToastMessage('提示：添加 ?id=密钥 以启用收藏功能');
    }
    getFavorites();
  });

  // 防抖转换拼音
  function handleInput() {
    charCount = inputText.length;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(convertPinyin, 300);
  }

  // 转换拼音
  function convertPinyin() {
    const text = inputText.trim();
    if (!text) {
      outputText = '请在上方输入中文文本';
      hasContent = false;
      return;
    }

    try {
      // @ts-ignore
      outputText = pinyin(text, {
        toneType: toneType === 'mark' ? 'symbol' : toneType === 'num' ? 'num' : 'none',
        nonZh: keepPunc ? 'consecutive' : 'removed',
        pattern: firstLetter ? 'first' : 'pinyin'
      });
      hasContent = true;
    } catch (error) {
      outputText = '转换出错，请检查输入';
      console.error(error);
    }
  }

  // 复制结果
  function copyResult() {
    if (!hasContent) {
      showToastMessage('没有可复制的内容');
      return;
    }

    navigator.clipboard.writeText(outputText).then(() => {
      showToastMessage('已复制到剪贴板');
    }).catch(() => {
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = outputText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToastMessage('已复制');
      } catch (err) {
        showToastMessage('复制失败');
      }
      document.body.removeChild(textarea);
    });
  }

  // 清空内容
  function clearAll() {
    inputText = '';
    convertPinyin();
    charCount = 0;
    showToastMessage('已清空');
  }

  // 获取收藏列表
  async function getFavorites() {
    if (!userId) return;
    try {
      const res = await fetch(`/api/favorites?id=${userId}`);
      if (!res.ok) {
        if (res.status === 404) {
          favorites = [];
        }
        return;
      }
      favorites = await res.json();
    } catch (error) {
      console.error('Error fetching favorites:', error);
      favorites = [];
    }
  }

  // 添加到收藏
  async function addToFavorites() {
    const text = inputText.trim();
    if (!text) {
      showToastMessage('请先输入文本');
      return;
    }
    if (!userId) {
      showToastMessage('需要设置 id 参数才能收藏');
      return;
    }

    // 检查是否已存在
    if (favorites.includes(text)) {
      showToastMessage('已经收藏过了');
      return;
    }

    try {
      const res = await fetch(`/api/favorites?id=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!res.ok) {
        showToastMessage('收藏失败，请稍后再试');
        return;
      }

      favorites = await res.json();
      showToastMessage('已收藏');
    } catch (error) {
      console.error('Error adding favorite:', error);
      showToastMessage('收藏失败');
    }
  }

  // 删除收藏
  async function removeFavorite(text) {
    if (!userId) return;

    try {
      const res = await fetch(`/api/favorites?id=${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!res.ok) {
        showToastMessage('删除失败');
        return;
      }

      favorites = await res.json();
      showToastMessage('已删除');
    } catch (error) {
      console.error('Error removing favorite:', error);
      showToastMessage('删除失败');
    }
  }

  // 加载收藏
  function loadFavorite(text) {
    inputText = text;
    convertPinyin();
    charCount = text.length;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToastMessage('已加载');
  }

  // 显示Toast消息
  function showToastMessage(message) {
    toastMessage = message;
    showToast = true;
  }

  // 监听选项变化
  $: if (toneType || keepPunc || firstLetter) {
    convertPinyin();
  }
</script>

<div class="container">
  <Header />
  
  <div class="content">
    <InputSection 
      bind:value={inputText}
      {charCount}
      on:input={handleInput}
    />

    <Options
      bind:toneType
      bind:keepPunc
      bind:firstLetter
    />

    <Controls
      on:copy={copyResult}
      on:clear={clearAll}
      on:addFavorite={addToFavorites}
    />

    <OutputSection
      {outputText}
      {hasContent}
    />

    <FavoritesSection
      {favorites}
      on:load={e => loadFavorite(e.detail)}
      on:remove={e => removeFavorite(e.detail)}
    />
  </div>
</div>

<Toast bind:show={showToast} message={toastMessage} />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    background: var(--bg-card);
    min-height: 100vh;
    transform: translateZ(0);
    backface-visibility: hidden;
    position: relative;
    z-index: 1;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    background-image: 
      linear-gradient(to bottom, transparent 0%, rgba(124, 110, 93, 0.02) 50%, transparent 100%),
      radial-gradient(circle at 50% 50%, transparent 0%, rgba(124, 110, 93, 0.03) 100%);
  }

  .content {
    padding: 24px;
  }

  @media (min-width: 769px) {
    .container {
      margin: 20px auto;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      min-height: auto;
      border: 1px solid var(--border);
    }

    .content {
      padding: 32px;
    }
  }
</style>
