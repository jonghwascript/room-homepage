import { demo, sliderHtml, arrowsHtml, shopHtml, selectProduct, isolated } from './component-demos';
export default {
  title: 'Components/Splide',
  tags: ['autodocs'],
  parameters: { ...isolated, docs: { ...isolated.docs, description: {
    component: '실제 사진·버튼 마크업과 Splide를 사용합니다. 설명 연동 예시는 선택 상태만 동기화하며 홈페이지의 설명 페이드 애니메이션은 실행하지 않습니다.',
  } } },
  args: { start: 1, speed: 500, withDescription: false },
  argTypes: {
    start: { control: { type: 'select' }, options: [1, 2, 3] },
    speed: { control: { type: 'range', min: 0, max: 1500, step: 100 } },
    withDescription: { control: 'boolean' },
  },
  render: ({ start, speed, withDescription }) => demo(
    `<main class="c-main">${sliderHtml}${arrowsHtml}${withDescription ? shopHtml : ''}</main>`,
    (root) => {
      const slider = new window.Splide(root.querySelector('.splide'), {
        type: 'loop', perPage: 1, perMove: 1, start: start - 1, speed,
        easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
        pagination: false, arrows: false, keyboard: 'focused',
      });
      slider.on('mounted', () => selectProduct(root, slider.index));
      slider.on('move', (index) => selectProduct(root, index));
      slider.mount();
      const previous = () => slider.go('<');
      const next = () => slider.go('>');
      const previousButton = root.querySelector('#custom-prev');
      const nextButton = root.querySelector('#custom-next');
      previousButton.addEventListener('click', previous);
      nextButton.addEventListener('click', next);
      return () => {
        previousButton.removeEventListener('click', previous);
        nextButton.removeEventListener('click', next);
        slider.destroy();
      };
    },
  ),
};
export const Default = {};
export const WithDescription = { args: { withDescription: true } };
export const ThirdSlide = { args: { start: 3 } };
export const InstantTransition = { args: { speed: 0 } };
