import pageHtml from '../pages/index.html?raw';
import shopHtml from '../pages/components/shop.html?raw';
import aboutHtml from '../pages/components/about.html?raw';
import sliderHtml from '../pages/components/splide.html?raw';
import '../js/vendor/splide@4.1.4/splide.min.css';

export { shopHtml, aboutHtml, sliderHtml };
export const headerHtml = pageHtml.match(/<header\b[\s\S]*?<\/header>/)[0].replaceAll('/index.html#', '#');
export const footerHtml = pageHtml.match(/<footer\b[\s\S]*?<\/footer>/)[0];
export const arrowsHtml = pageHtml.match(/<div class="splide__arrows[\s\S]*?<\/div>/)[0];

// Storybook 재렌더·페이지 이동 시 각 예시의 이벤트와 inert 상태를 정리한다.
class ComponentDemo extends HTMLElement {
  connectedCallback() {
    this.cleanup = this.setup?.(this);
  }
  disconnectedCallback() {
    this.cleanup?.();
    this.cleanup = null;
  }
}
if (!customElements.get('room-component-demo')) {
  customElements.define('room-component-demo', ComponentDemo);
}
export function demo(html, setup) {
  const node = document.createElement('room-component-demo');
  node.style.display = 'block';
  node.innerHTML = html;
  node.setup = setup;
  return node;
}
export const isolated = {
  layout: 'fullscreen',
  docs: { story: { inline: false, iframeHeight: 600 } },
};
export function selectProduct(root, index) {
  root.querySelectorAll('.c-show__item').forEach((item, i) => {
    item.classList.toggle('u-hidden', i !== index);
  });
}
