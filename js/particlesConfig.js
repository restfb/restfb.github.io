$(document).ready(function() {
	Particles.init({
		selector: '.background',
		color: '#337ab7',
		connectParticles: true,
		maxParticles: 150,
		responsive: [{
			breakpoint: 768,
			options: {
				maxParticles: 0
			}
		}]
	});
	$(".background").height($("header").height())
});
