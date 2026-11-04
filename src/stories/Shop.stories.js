import { demo, shopHtml, selectProduct, isolated } from './component-demos';
export default {
  title: 'Components/Shop',
  tags: ['autodocs'],
  parameters: { ...isolated, docs: { ...isolated.docs, description: {
    component: '실제 상품 설명 마크업. Controls에서 상품을 선택합니다. Shop now는 의도적인 placeholder입니다.',
  } } },
  args: { product: 1 },
  argTypes: { product: { control: { type: 'select' }, options: [1, 2, 3] } },
  render: ({ product }) => {
    const root = demo(`<div style="max-width: 720px; margin-inline: auto;">${shopHtml}</div>`);
    selectProduct(root, product - 1);
    return root;
  },
};
export const FirstProduct = {};
export const SecondProduct = { args: { product: 2 } };
export const ThirdProduct = { args: { product: 3 } };
