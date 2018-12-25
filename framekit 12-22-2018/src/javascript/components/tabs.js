/*!
 * fk-tabs.js v1.0.0 - Adds functionality to your tab components in your web app.
 * https://bitbucket:8443/scm/flk/cxd-ds-framekit.git
 * Copyright (c) 2018 Fannie Mae, Inc.
 * @license MIT
 */

$(document).ready(function () {
  $('[id^=tab]').click(function () {
    var target = $(this).attr('data-target')
    if ($(this).hasClass('is-active')) {
      return
    } else {
      $('.fk-tabs__label,.fk-tabs__content').removeClass('is-active')
      $(this).addClass('is-active')
      $(`#${target}`).addClass('is-active')
    }
  })
})