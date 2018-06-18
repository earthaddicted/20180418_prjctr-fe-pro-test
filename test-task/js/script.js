
/* ==== GSAP ==== */
$(document).ready(function() {

  $(".content-block__item").hover(over, out);
  TweenMax.set( $('.content-text span') , {y:20} );

  function over(){
    $items = $(this).find('.content-text span');
    TweenMax.staggerTo($items, 0.4, {
                y: 0,
                autoAlpha: 1,
                ease: Power4.easeInOut
            }, 0.2);
  }

  function out(){
      $items = $(this).find('.content-text span');
      TweenMax.staggerTo($items, 0.4, {
        y: 20,
        autoAlpha: 0,
        ease: Power4.easeInOut
      }, 0.1);
  }
});
/* ==== GSAP END ==== */


/* ==== tabs ==== */

$('label.filter-selector input[value="all"]').attr("checked", true); // reset onload
$("label.filter-selector input").on("click", function() {
	var value = $(this).val();
	var cat = $(this).data("category");

	$(".content-block__item").each(function(i, obj) {
		$(this).addClass("hidden");
		if ($(this).data("category") == cat) {
			$(this).removeClass("hidden");
		}
	});

	if (value == "all") {
		$(".content-block__item").removeClass("hidden");
	}

	// active state
	var parent = $(this).parent();
	$("label.filter-selector").each(function(i, obj) {
		$(this).removeClass("selected-filter");
		if ($(this).is(parent)) {
			$(this).addClass("selected-filter");
		}
	});
});

/* ==== tabs END ==== */