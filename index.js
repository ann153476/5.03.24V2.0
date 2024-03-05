function onToggle(event) {
  let openedIco = event.target.querySelector(".accordion__ico");
  openedIco.classList.toggle("a_i_close");
  openedIco.classList.toggle("a_i_open");

  if (event.target.open) {
    document.querySelectorAll(".accordion > details[open]").forEach((el) => {
      // Исключаем из перебора елемент который мы только что открыли
      if (el === event.target) {
        return;
      }

      // Закрываем все остальные елементы <details>
      el.open = false;
    });
  }
}

// Вешаем наблюдатель на все елементы <details> внутри акордиона
document
  .querySelectorAll(".accordion > details")
  .forEach((el) => el.addEventListener("toggle", onToggle));
///////////////////////////////////////////////////
function handleAccordionClick(e) {
  e.preventDefault();

  const el = e.currentTarget;
  const summary = el.querySelector("summary");
  const content = el.querySelector(".content");

  const isClosing = el.open || false;

  if (isClosing) {
    shrink(el, summary, content);
  } else {
    expand(el, summary, content);
  }
}

function shrink(el, summary, content) {
  el.style.overflow = "hidden";

  const startHeight = `${el.offsetHeight}px`;
  const endHeight = `${summary.offsetHeight}px`;

  const animation = el.animate(
    {
      height: [startHeight, endHeight],
    },
    {
      duration: 400,
      easing: "ease-out",
    }
  );

  animation.onfinish = () => onAnimationFinish(el, false);
  animation.oncancel = () => (el.style.overflow = "");
}

function expand(el, summary, content) {
  el.style.height = `${el.offsetHeight}px`;
  el.open = true;

  window.requestAnimationFrame(() => {
    const startHeight = `${el.offsetHeight}px`;
    const endHeight = `${summary.offsetHeight + content.offsetHeight}px`;

    const animation = el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 400,
        easing: "ease-out",
      }
    );

    animation.onfinish = () => onAnimationFinish(el, true);
    animation.oncancel = () => (el.open = false);
  });
}

function onAnimationFinish(el, isOpening) {
  el.open = isOpening;
  el.style.height = el.style.overflow = "";
}

document.querySelectorAll("details").forEach((el) => {
  el.addEventListener("click", handleAccordionClick);
});
