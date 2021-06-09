document.addEventListener("DOMContentLoaded", () => {
  // nav와 selection을 별도의 변수로 만들기
  const nav = document.querySelector("nav#main_nav");
  const dot = document.querySelector("nav#dot_nav");

  // 이벤트 핸들러 함수 선언
  const navClick = (e) => {
    // alert(e.target.tagName); // 확인용
    let tagName = e.target.tagName;
    /*
    class="art1" 인 li tag를 클릭하면
    클래스 이름의 문자열 art1과 #을 결합하여
    #art1 문자열을 만들고

    querySelector()로 art1 id 가 설정된 
    article box를 selector하고 

    article box의 크기, 좌표 정보를 getter하고
    그 정보에서 top의 좌표만 추출

    window.scrollBy() 함수에 
        top은 article box의 top으로 설정하고
        left 화면 왼족 끝인 0으로 설정
        smooth 속성을 부여하여
        자연스럽게 화면이 스크롤 되도록 설정
    */
    if (tagName === "LI") {
      let className = e.target.className;
      // 클래스명 가져옴 ex) art1, art2...

      // className art1이면 -> #art1 을 찾아서 선택!
      let art = document.querySelector("#" + className);

      // art 객체(Dom 객체)의 현재 위치, 모양값을
      // getter 해달라
      let bound = art.getBoundingClientRect(); // 여러정보가 들어있는 값 추출
      // art 객체(box)의 화면의 위에서부터의 좌표값
      let artTop = bound.top; // 그 값들 중에서 top이라는 변수 추출

      // scrollBy 가 아직 최신 버전에서만 지원한대.... . _.
      window.scrollBy({
        top: artTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  // nav에 click event 설정
  nav.addEventListener("click", navClick);
  dot.addEventListener("click", navClick);
  /*
  scroll event는 화면이 스크롤 되는 동안에
  엄청나게 많은 event를 발생한다
  이 event 핸들러에서 화면에 무언가 그리는 코드를 작성하게 되면
  Brower, System에 막대한 자원을 소모한다.
  이러한 불편함을 없애기 위해
  임의의 flag 변수를 하나 만들고
  이벤트가 시작되어 화면에 그리는 코드가
  시행될때 flag를 세팅하여 다시 코드가
  중복 실행되는 것을 방지
  */
  let ticking = false;
  const scrollTop_nav_tick = (e) => {
    if (!ticking) {
      ticking = true;

      // 화면에 fix된 nav box의 하단 라인 좌표를 조회
      let nav_bound = nav.getBoundingClientRect();
      let nav_bottom = nav_bound.bottom; /* 네비 하단 좌표 가져옴*/

      // 실제로 article 의 element를 추출

      // nav box의 제일 하단 라인(해당 포인터)에 걸려있는
      // box tag가 누구인지 getter 하여 art에 담기
      let art = document.elementFromPoint(0, nav_bottom);

      // 현재 선택된 tag(art에 담겨 있는 tag)에서 id값을 추출하여
      // li 중에 클래스가 id값과 같은 tag를 선택
      // li.art1 와 같은 selector 이름을 만들기
      let li = nav.querySelector("ul li." + art.id);
      // 그리고 선택된 tag active 클래스를 추가하라

      // 혹시 active 클래스가 설정된 li tag가 있으면
      // active 클래스를 제거하고
      let actives = nav.querySelectorAll("ul li.active");
      for (let i = 0; i < actives.length; i++) {
        actives[i].classList.remove("active");
      }
      // 현재 보고 있는 article과 같은 nav li에
      // active 클래스를 지정
      li.classList.add("active");

      let dot_active = dot.querySelectorAll("ul li.active");
      for (let i = 0; i < dot_active.length; i++) {
        dot_active[i].classList.remove("active");
      }

      let dot_li = dot.querySelector("ul li." + art.id);
      dot_li.classList.add("active");

      ticking = false;
    }
  };

  // 현재 보고 있는 화면이 스크롤되면
  document.addEventListener("scroll", scrollTop_nav_tick);

  document
    .querySelector("nav#main_nav .fa-bars")
    .addEventListener("click", (e) => {
      document.querySelector("nav#main_nav ul").classList.toggle("drop");
    }); // drop 이라는 클래스를 붙였다 떼었다 하라
});
