import { demo, footerHtml, isolated } from './component-demos';
export default {
  title: 'Components/Attribution',
  tags: ['autodocs'],
  parameters: isolated,
  render: () => demo(`<div style="padding: 2rem;">${footerHtml}</div>`),
};
export const Default = {};
