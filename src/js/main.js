import { initNavPanel } from './components/nav-panel.js';
initNavPanel(document.querySelector('[data-nav-panel-root]'), {
  desktopQuery: '(min-width: 64em)',
});

document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide', {
    perPage: 1,
    type: 'loop',
    speed: 500, // 사진 전환 시간(ms)
    easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
    perMove: 1,
    pagination: false,
    arrows: false,
    keyboard: 'focused', // 슬라이더 안에 포커스가 있을 때만 ←/→ 키로 이동
  });
  const items = [
    ...document.querySelectorAll('[class*="c-show__item--slide"]'),
  ];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // 연속 클릭 시 이전 비동기 작업이 최신 설명을 덮어쓰지 않도록 구분한다.
  let transitionId = 0;
  let animations = [];

  // 기존 설명 퇴장 → 내용 교체 → 새 설명 등장 순서로 처리한다.
  async function updateDescription(index, immediate = false) {
    const currentId = ++transitionId;

    animations.forEach((animation) => animation.cancel());
    animations = [];

    // 슬라이드 인덱스를 클래스 접미사 slide01, slide02 등과 연결한다.
    const slideNumber = String(index + 1).padStart(2, '0');
    const next = items.find((item) =>
      item.classList.contains(`c-show__item--slide${slideNumber}`),
    );

    if (!next) return;

    const visible = items.filter(
      (item) => !item.classList.contains('u-hidden'),
    );

    //사용자가 애니메이션을 껏을 경우
    // 초기 표시 또는 동작 줄이기 설정에서는 애니메이션을 생략한다.
    const skipAnimation = immediate || reducedMotion.matches;

    if (!skipAnimation) {
      animations = visible.map((item) =>
        item.animate(
          { opacity: [1, 0] },
          // 120ms 동안 가속하며 사라지고, 내용 교체 전까지 투명도를 유지한다.
          { duration: 120, easing: 'ease-in', fill: 'forwards' },
        ),
      );

      // 취소된 애니메이션도 처리한 뒤 최신 전환인지 확인한다.
      await Promise.allSettled(
        animations.map((animation) => animation.finished),
      );

      if (currentId !== transitionId) return;
    }

    // 퇴장 완료 후 선택된 설명만 표시한다.
    items.forEach((item) => {
      item.classList.toggle('u-hidden', item !== next);
    });

    animations.forEach((animation) => animation.cancel());
    animations = [];

    if (!skipAnimation) {
      animations = [
        next.animate(
          [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          // 아래 8px에서 올라오며 300ms 동안 감속하여 나타난다.
          { duration: 300, easing: 'ease-out' },
        ),
      ];
    }
  }

  // 첫 화면은 애니메이션 없이 설명을 맞춘다.
  splide.on('mounted', () => {
    updateDescription(splide.index, true);
  });

  // 사진 이동이 시작될 때 설명 전환도 시작한다.
  splide.on('move', (newIndex) => {
    updateDescription(newIndex);
  });

  // 초기 이벤트를 놓치지 않도록 이벤트 등록 후 마운트한다.
  splide.mount();

  // 2. 내가 만든 이전 버튼 클릭 시
  document.getElementById('custom-prev').addEventListener('click', function () {
    splide.go('<'); // 이전으로 이동
  });

  // 3. 내가 만든 다음 버튼 클릭 시
  document.getElementById('custom-next').addEventListener('click', function () {
    splide.go('>'); // 다음으로 이동
  });
});


let ticking = false;

window.addEventListener('scroll', function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      const target = document.getElementById('banner-header');
      // 접근성 수정: 열린 메뉴를 헤더와 함께 숨기면 본문 inert만 남아 조작이 막힌다.
      // 메뉴가 열려 있거나 헤더 내부에 포커스가 있으면 스크롤해도 헤더를 유지한다.
      const menuOpen = target?.querySelector('[data-nav-panel]')?.classList.contains('is-open');
      const focusInsideHeader = target?.contains(document.activeElement);
      if (!target) {
        ticking = false;
        return;
      }
      if (window.scrollY > 100 && !menuOpen && !focusInsideHeader) {
        target.classList.add('u-hidden');
      } else {
        target.classList.remove('u-hidden');
      }
      ticking = false;
    });
    ticking = true;
  }
});
