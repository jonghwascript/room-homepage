import { initNavPanel } from './components/nav-panel.js';
initNavPanel(document.querySelector('[data-nav-panel-root]'), {
  desktopQuery: '(min-width: 64em)',
});
