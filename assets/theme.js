(() => {
  const root = document.documentElement;
  try { const saved = localStorage.getItem('textbook-theme'); if (saved === 'dark' || saved === 'light') root.dataset.theme = saved; } catch (_) {}
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.site-header .nav');
    if (!nav) return;
    const button = nav.querySelector('.theme-toggle') || document.createElement('button');
    button.type = 'button'; button.className = 'theme-toggle';
    const update = () => { button.textContent = root.dataset.theme === 'dark' ? '☀ ライト' : '☾ ダーク'; button.setAttribute('aria-label', '表示テーマを切り替える'); };
    button.addEventListener('click', () => {
      const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
      root.dataset.theme = dark ? 'light' : 'dark';
      try { localStorage.setItem('textbook-theme', root.dataset.theme); } catch (_) {}
      update();
    });
    if (!button.isConnected) nav.append(button);
    update();
  });
})();
