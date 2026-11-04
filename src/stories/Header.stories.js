import { initNavPanel } from '../js/components/nav-panel.js';
import { demo, headerHtml, isolated } from './component-demos';

export default {
  title: 'Components/Header',
  tags: ['autodocs'],
  parameters: { ...isolated, docs: { ...isolated.docs, description: {
    component: '실제 헤더와 메뉴 스크립트. 1024px 미만에서 패널·오버레이, 이상에서 펼쳐진 메뉴를 확인합니다. Contact는 placeholder입니다.',
  } } },
  args: { open: false },
  argTypes: { open: { control: 'boolean' } },
  render: ({ open }) => demo(
    `<div id="home" style="min-height: 900px; background: #555 url('/images/desktop-image-hero-1.jpg') center / cover;">
      ${headerHtml}
      <main id="main" style="padding-top: 250px; color: white;">
        <section id="shop"><h1>Header preview</h1><a href="#about">Background link</a></section>
        <section id="about" style="margin-top: 250px;"><h2>About destination</h2></section>
      </main>
    </div>`,
    (root) => {
      const nav = initNavPanel(root.querySelector('[data-nav-panel-root]'));
      if (open && !matchMedia('(min-width: 64em)').matches) nav?.open();
      return () => nav?.destroy();
    },
  ),
};
export const Default = {};
export const Open = { args: { open: true } };
