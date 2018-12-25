(function (window, document, $, cb) {
  
  var options = {
    LAUNCH_BUTTON   : '#nauticalCompass',
    OFF_CANVAS      : true,
    MENU_TITLE      : 'The Design System',
    EVENT1HANDLER   : function handle1ClickEvent() {},
    CONFIG          : function Config() {}
  }
  
  // factory method for operating the navigator
  class LaunchNavigator {
    constructor(options) {
      this.Config           = options.CONFIG
      this.launch_button_el = $(options.LAUNCH_BUTTON)
      var $this             = this.launch_button_el
      this.off_canvas_el    = $('[data-toggle="offcanvas"]')
      var $that             = this.off_canvas_el
      this.isClosed         = false || 'undefined'
      this.menu_title       = options.MENU_TITLE || 'Design System'
    } 
  }
  
  // define skeleton factory
  function NavigatorLauncher() {}
  
  var NavLaunch = NavigatorLauncher
  NavLaunch.prototype.NavLauncherClass = Config
  NavLaunch.prototype.compileOptions = function (options) {
    class Config {
      constructor(options) {
        this.ConfigOps = {
          launchButton: NavLaunch.$this,
          isClosed: NavLaunch.this.isClosed,
          sideBar: NavLaunch.$that
        }
      }
    }
  }
  
  var launcher = new LaunchNavigator()
  var Go = launcher.liftOff({
    nautica_spin()
  })
  //hammy toggle icon
  $(document).ready(function () {
    launcher.$this.click(() => {
      launcher.$this.addClass(launcher.$this)
    })
  
    var trigger = launcher.$this,
      isClosed = false

    trigger.click(function () {
      nautica_spin()
    })

    function nautica_spin() {

      if (isClosed == true) {
        trigger.removeClass('is-open')
        trigger.toggleClass('nautics-compass-rotate-cw')
        trigger.addClass('is-closed')
        isClosed = false
      } else {
        //overlay.show();
        trigger.removeClass('is-closed')
        trigger.toggleClass('nautics-compass-rotate--cc')
        trigger.addClass('is-open')
        isClosed = true
      }
    }
  })
  $('[data-toggle="offcanvas"]').click(function () {
    $('.slide-in-col-left ').toggleClass('toggled')
  })
})($, cb)
