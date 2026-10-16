document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide', {
    perPage: 1,
    type: 'loop',
    perMove: 1,
    pagination: false,
    arrows: false,
    keyboard: 'focused', // 슬라이더 안에 포커스가 있을 때만 ←/→ 키로 이동
  });
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
