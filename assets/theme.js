(() => {
  const root = document.documentElement;
  try { const saved = localStorage.getItem('textbook-theme'); if (saved === 'dark' || saved === 'light') root.dataset.theme = saved; } catch (_) {}
  document.addEventListener('DOMContentLoaded', () => {

    // Single source of truth for chapter navigation; do not hand-maintain per-page lists.
    const sidebar = document.querySelector('.toc-side');
    if (sidebar) {
      const chapters = [
        ['01-comparison-model.html','1. 比較モデルと S(n)'],
        ['02-ford-johnson.html','2. Ford–Johnson と既知結果'],
        ['03-posets.html','3. 半順序とイデアル'],
        ['03a-ideal-dp.html','3A. 動的計画法と線形拡張'],
        ['03b-symmetry.html','3B. 双対と同型'],
        ['04-search-pruning.html','4. 探索と枝刈り'],
        ['05-implementations.html','5. 実装の相違'],
        ['06-experiments.html','6. 再現実験'],
        ['07-open-problems.html','7. 仮説と次の課題'],
        ['08-prior-work.html','8. 先行研究'],
        ['09-progress.html','9. 研究進捗']
      ];
      const onChapter = location.pathname.includes('/chapters/');
      const current = location.pathname.split('/').pop();
      const list = document.createElement('ol');
      for (const [file, label] of chapters) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = (onChapter ? '' : 'chapters/') + file;
        link.textContent = label;
        if (current === file) link.setAttribute('aria-current', 'page');
        li.append(link); list.append(li);
      }
      const title = document.createElement('strong'); title.textContent = '章';
      const tocNav = document.createElement('nav'); tocNav.setAttribute('aria-label','教科書の章'); tocNav.append(list);
      sidebar.replaceChildren(title, tocNav);
    }
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
