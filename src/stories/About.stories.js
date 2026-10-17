import { demo, aboutHtml, isolated } from './component-demos';
export default {
  title: 'Components/About',
  tags: ['autodocs'],
  parameters: isolated,
  args: { desktopRow: false },
  argTypes: { desktopRow: { control: 'boolean', description: '데스크톱 행 배치는 실제 페이지의 c-main Grid 문맥을 사용합니다.' } },
  render: ({ desktopRow }) => demo(desktopRow
    ? `<main class="c-main" style="grid-template-areas: 'about'; grid-template-columns: minmax(0, 1fr); grid-template-rows: auto;">${aboutHtml}</main>`
    : aboutHtml),
};
export const Stacked = {};
export const PageLayout = { args: { desktopRow: true } };
