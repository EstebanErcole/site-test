
      const lenis = new Lenis({
        lerp: 0.1, // Adjust for desired smoothness (lower value = smoother)
        wheelMultiplier: 0.7,
        gestureOrientation: "vertical",
        normalizeWheel: false,
        smoothTouch: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
 
 
 document.addEventListener('DOMContentLoaded', () => {

  // Splits text into words and characters
  const text = new SplitType("#heading", { types: "chars" });

  gsap.set("#heading", { autoAlpha: 1 }); // prevents flash of unstyled content
  gsap.set(text.chars, { yPercent: 100 }); // set initial state
  
  const wordElements = document.querySelectorAll('[anim="words-slide-up"]');
  
  wordElements.forEach(el => {
      // Dividir en palabras
      const split = new SplitType(el, { types: 'words' });

      // Agregar clase "word" a cada palabra
      split.words.forEach(word => {
        word.classList.add('word');
      });
    });

  // Page Load Animation
  const initialAnimation = gsap.to(text.chars, {
    yPercent: 0,
    ease: "sine.out",
    stagger: { from: "start", amount: 0.5, ease: "power1.out" },
    onComplete: activateScrollTrigger // Activate ScrollTrigger after initial animation
  });

  // User Scroll Animation for H1
  function activateScrollTrigger() {
    gsap.to(text.chars, {
      yPercent: -100,
      stagger: { from: "end", amount: 1 },
      scrollTrigger: {
        trigger: "#heading",
        start: "top top",
        end: () => `+=${document.querySelector("#heading").offsetHeight * 1.25}`,
        scrub: 1
      }
    });
  }
  
  
  function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });

    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 80%",
      onEnter: () => timeline.play(),
    });
  }
  
  const wordsSlideUpElements = document.querySelectorAll('[anim="words-slide-up"]');
  wordsSlideUpElements.forEach((element) => {
    const tl = gsap.timeline({ paused: true });
    const words = element.querySelectorAll(".word");
    tl.from(words, {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: { amount: 0.5 },
    });
    createScrollTrigger(element, tl);
  });
})

// Animate the card rotate animation
gsap.set('.character_card', {rotationY:0});

var rotate = gsap.timeline({
  scrollTrigger:{
    trigger: ".section_characters",
    pin: true,
    scrub:0.2,
    start: "top top",
    end: "bottom 100px",
  }
})
.to('.rotationY', {
  rotation:180,
  duration:1, ease:'none',
})

// Animate the Card wrapper sticky position
var cardAnimation = gsap.set('.character_card_perspective', {position:'sticky',  paused:true});
//var cardAnimationInd = gsap.set('.character_card', {rotationY: 0,  paused:true});  
ScrollTrigger.create({
  trigger: ".section_characters",
  start: "top top",
  end: "bottom 100px",
  onEnter: () => cardAnimation.play(),
  onLeave: () => cardAnimation.reverse(),
  onLeaveBack: () => cardAnimation.reverse(),
  onEnterBack: () => cardAnimation.reverse(),
});


/* TEXT ANIMATION */

let tricksCursor = document.querySelector('.cursor');
window.addEventListener('mousemove', cursor);

function cursor(e) {
  tricksCursor.style.top = e.clientY + 'px';
  tricksCursor.style.left = e.clientX + 'px';
}

$( "a" ).mouseenter(function() {
  window.removeEventListener("mousemove", cursor);
  var tricksWidth = $(this).outerWidth() / 2;
  var tricksHeight = $(this).outerHeight() / 2;
  //var tricksTop = $(this).offset().top;
	var tricksTop = $(this).offset().top - $(document).scrollTop();
  var tricksLeft = $(this).offset().left;
	tricksCursor.style.top = (tricksTop + tricksHeight) + 'px';
  tricksCursor.style.left = (tricksLeft + tricksWidth) + 'px';
});

$( "a" ).mouseleave(function() {
  window.addEventListener("mousemove", cursor);
});


// Add class on hover
$( "a" ).mouseenter(function() {
  $('.cursor').addClass('cursor-hover');
});

$( "a" ).mouseleave(function() {
  $('.cursor').removeClass('cursor-hover');
});


// Add class on hover of logo
$( ".logo" ).mouseenter(function() {
  $('.cursor').addClass('logo-hover');
});

$( ".logo" ).mouseleave(function() {
  $('.cursor').removeClass('logo-hover');
});


// Add class on hover of logo
$( ".heading_h1" ).mouseenter(function() {
  $('.cursor').addClass('arrow-hover');
  $('body').addClass('no-cursor');
  $('.cursor').css("opacity", 1);
});

$( ".heading_h1" ).mouseleave(function() {
  $('.cursor').removeClass('arrow-hover');
  $('body').removeClass('no-cursor');
  $('.cursor').css("opacity", 0);
});


// Add class on hover of nav link
$( ".nav_link" ).mouseenter(function() {
  $('.cursor').addClass('link-hover');
});

$( ".nav_link" ).mouseleave(function() {
  $('.cursor').removeClass('link-hover');
});


// Add class on mouse down
$( "body" ).mousedown(function() {
  $('.cursor').addClass('cursor-pressed');
});

$( "body" ).mouseup(function() {
  $('.cursor').removeClass('cursor-pressed');
});

