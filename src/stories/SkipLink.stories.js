import { demo, isolated } from './component-demos';
export default {
  title: 'Components/SkipLink',
  tags: ['autodocs'],
  parameters: isolated,
  render: () => demo(`
    <a class="c-skip-link" href="#story-main">Skip to main content</a>
    <nav aria-label="Demo navigation" style="padding: 5rem 1rem 1rem;"><a href="#story-main">Navigation link</a></nav>
    <main id="story-main" tabindex="-1" style="padding: 1rem;"><h1>Main content</h1><button type="button">Content action</button></main>
  `),
};
export const Default = {};
export const Focused = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('.c-skip-link').focus();
  },
};
