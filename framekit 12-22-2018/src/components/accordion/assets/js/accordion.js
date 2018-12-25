$(function () {
	var Accordion = function (el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false

		// private vars
		var links = this.el.find('.js-acc-control')
		
 		// Events
		links.on('click', {
			el: this.el,
			multiple: this.multiple
		}, this.dropdown)
	}

	Accordion.prototype.dropdown = function (e) {
		var $el = e.data.el
		$this = $(this),
			$next = $this.next()

		$next.slideToggle()
		$this.parent().toggleClass('fk-open')

		if (!e.data.multiple) {
			$el.find('.js-ddpanel').not($next).slideUp().parent().removeClass('fk-open')
		}
	}

	var accordion = new Accordion($('#accordion'), false)
})