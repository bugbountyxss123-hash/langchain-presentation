/* ============================================================
   عرض تقديمي: تعلّم LangChain مع Python
   - كل شريحة هي عنصر <section class="slide">
   - الشريحة النشطة فقط هي التي تظهر (CSS: display:flex)
   - التنقّل بالأسهم أو الأزرار أو النقاط أو السحب باللمس
   ============================================================ */

const slides = Array.from(document.querySelectorAll(".slide"));
const progressBar = document.getElementById("progressBar");
const currentNum = document.getElementById("currentNum");
const totalNum = document.getElementById("totalNum");
const dotsBox = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;

const pad = (n) => String(n).padStart(2, "0");
totalNum.textContent = pad(slides.length);

/* بناء نقاط التنقّل حسب عدد الشرائح */
slides.forEach(function (_, index) {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", "الانتقال إلى الشريحة " + (index + 1));
  dot.addEventListener("click", function () { show(index); });
  dotsBox.appendChild(dot);
});
const dots = Array.from(dotsBox.children);

/* إظهار شريحة واحدة فقط */
function show(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach(function (slide, i) {
    const isActive = i === current;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    if (isActive) slide.scrollTop = 0; // العودة للأعلى عند تغيير الشريحة
  });

  dots.forEach(function (dot, i) {
    dot.classList.toggle("active", i === current);
    dot.setAttribute("aria-current", i === current ? "true" : "false");
  });

  currentNum.textContent = pad(current + 1);
  progressBar.style.width = ((current + 1) / slides.length) * 100 + "%";

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
}

const next = function () { show(current + 1); };
const prev = function () { show(current - 1); };

/* الأزرار */
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

/* لوحة المفاتيح — الاتجاه حسب ترتيب RTL: اليسار = التالي، اليمين = السابق */
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key === "ArrowLeft" || key === "ArrowDown" || key === " " || key === "PageDown") {
    event.preventDefault();
    next();
  } else if (key === "ArrowRight" || key === "ArrowUp" || key === "PageUp") {
    event.preventDefault();
    prev();
  } else if (key === "Home") {
    event.preventDefault();
    show(0);
  } else if (key === "End") {
    event.preventDefault();
    show(slides.length - 1);
  }
});

/* السحب باللمس على الهاتف */
let touchStartX = 0;
document.addEventListener("touchstart", function (event) {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
document.addEventListener("touchend", function (event) {
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 50) {
    if (delta < 0) next(); // سحب لليسار = التالي
    else prev();           // سحب لليمين = السابق
  }
}, { passive: true });

/* التهيئة */
show(0);
