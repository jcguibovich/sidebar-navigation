const SidebarNavigate = (($) => {

  const NAME = 'sidebar-nav'
  const VERSION = '1.0.0'
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  const DATA_KEY = 'sidebar_nav'
  const EVENT_KEY = `.${DATA_KEY}`

  const Event = {
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`
  }

  var options = {
    MENU_TITLE: 'The Design System',
    MENU_TOGGLER: '.js-tgl',
    SUBMENU_OPEN: 'is-active',
    SUBMENU_ALL: '.js-tgl, .fk-sidebar-nav-submenu',
    TARGET_ATTR: 'data-target',
    LAUNCH_BUTTON: '#nauticalCompass',
    OFF_CANVAS: true,
    SIDEBAR_VISIBLE: '.is-active'
  }
  class SidebarNavigate {
    constructor(element, config) {
      this._element = element
      this._config = this._getConfig(options)
      this._menu = this._getMenuElement()

      this._addEventListeners()
    }

    static get VERSION() {
      return VERSION
    }

    _toggle() {
      if (this._element.disabled || $(this._element).hasClass(options.SUBMENU_OPEN)) {
        return
      }
    }

    _addEventListeners() {
      $(this._element).on(Event.CLICK, (event) => {
        event.preventDefault()
        event.stopPropagation()
      })
    }

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)
        const _config = typeof config === 'object' ? config : null

        if (!data) {
          data = new SidebarNavigate(this, _config)
          $(this).data(DATA_KEY, data)
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`)
          }
          data[config]()
        }
      })
    }
  }


  $(options.SUBMENU_ALL).removeClass(options.SUBMENU_OPEN)

  $(options.MENU_TOGGLER).click(function (cb) {
    let $this = $(this)
    let target_el = $this.attr(options.TARGET_ATTR)
    if ($this.hasClass(options.SUBMENU_OPEN)) {
      $this.removeClass(options.SUBMENU_OPEN)
      $(target_el).removeClass(options.SUBMENU_OPEN)
    } else {
      $this.addClass(options.SUBMENU_OPEN)
      $(target_el).addClass(options.SUBMENU_OPEN), (cb)
    }
  })
  $.fn[NAME] = SidebarNavigate._jQueryInterface
  $.fn[NAME].Constructor = SidebarNavigate
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return SidebarNavigate._jQueryInterface
  }

})($)
