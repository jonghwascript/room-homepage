import { demo, shopHtml, footerHtml, selectProduct, isolated } from './component-demos';
export default {
  title: 'Components/InteractionStates',
  tags: ['autodocs'],
  parameters: { ...isolated, docs: { ...isolated.docs, description: {
    component: 'Tab 키로 이동해 공유 focus-visible 표시를 확인합니다. hover는 실제 포인터를 올려 확인하며 CSS 상태를 흉내 내는 클래스는 사용하지 않습니다.',
  } } },
  render: () => {
    const root = demo(`<div style="padding: 2rem;">
      <div style="padding: 1rem; background: #333;">
        <button class="c-nav-panel-toggle" type="button" aria-label="Example menu button" style="color: white;">Menu</button>
      </div>
      ${shopHtml}
      ${footerHtml}
    </div>`);
    selectProduct(root, 0);
    return root;
  },
};
export const Default = {};
export const KeyboardFocus = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('.c-shop__show-now').focus();
  },
};
