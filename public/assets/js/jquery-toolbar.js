/*!
 * jquery-toolbar - 1.0.4 (https://github.com/lucduong/jquery-toolbar#readme)
 * Copyright 2016 Luc Duong (luc@e4u.vn)
 * Licensed under the MIT
 */
/*!
 * jquery-toolbar - 1.0.4 (https://github.com/lucduong/jquery-toolbar#readme)
 * Copyright 2016 Luc Duong (luc@e4u.vn)
 * Licensed under the MIT
 */
;(function ($, window, document, undefined) {

  /*global jQuery, console*/

  'use strict';

  var pluginName = 'toolbar';

  var _default = {};

  _default.settings = {
    enableLinks: false,

    // Event Handlers
    onDropDownSelected: undefined,
    onButtonToggled: undefined,
    onButtonClick: undefined,
    onItemSelected: undefined
  };

  _default.options = {};

  var Toolbar = function (element, options) {
    this.$element = $(element);
    this.elementId = element.id;

    this.init(options);

    return {

      // Options (public access)
      options: this.options,

      // Initialize / destroy methods
      init: $.proxy(this.init, this),
      getState: $.proxy(this.getItemState, this),
      getSelectedItem: $.proxy(this.getSelectedItem, this),
      getItemValue: $.proxy(this.getItemValue, this),
      hideItemById: $.proxy(this.hideItemById, this),
      hideGroupById: $.proxy(this.hideGroupById, this),
      hideGroupByItemId: $.proxy(this.hideGroupByItemId, this),
      toggleButton: $.proxy(this.toggleButton, this)
    };
  };

  Toolbar.prototype.init = function (options) {
    this.data = [];
    this.groups = [];
    this.childs = [];

    if (options.data) {
      if (typeof options.data === 'string') {
        options.data = $.parseJSON(options.data);
      }
      this.data = $.extend(true, [], options.data);
      $.each(this.data, $.proxy(function (index, item) {
        var group = {
          id: item.id || index,
          name: item.name || ("group" + index)
        };
        this.groups.push(group);
        for (var i = 0; i < item.childs.length; i++) {
          var child = item.childs[i];
          child['groupId'] = group.id;
          child = this.initState(child);
          this.childs[child.id || ("child" + (i + 1))] = child;
        }
      }, this));
      delete options.data;
    }

    this.options = $.extend({}, _default.settings, options);

    this.destroy();
    this.render();
    this.subscribeEvents();
  };

  Toolbar.prototype.initState = function (item) {
    if (!item) return;

    // if not provided set selectable default value
    if (!item.hasOwnProperty('selectable')) {
      item.selectable = true;
    }

    // where provided we should preserve states
    item.state = item.state || {};

    // set checked state; unless set always false
    if (!item.state.hasOwnProperty('checked')) {
      item.state.checked = false;
    }

    // set enabled state; unless set always false
    if (!item.state.hasOwnProperty('disabled')) {
      item.state.disabled = false;
    }

    // set selected state; unless set always false
    if (!item.state.hasOwnProperty('selected')) {
      item.state.selected = false;
    }

    // set toggled state; unless set always false
    if (!item.state.hasOwnProperty('toggled')) {
      item.state.toggled = false;
    }
    return item;
  };

  Toolbar.prototype.render = function () {

    if (!this.initialized) {

      // Setup first time only components
      this.$element.addClass(pluginName);
      this.$wrapper = $(this.template.list);


      this.initialized = true;
    }

    this.$element.empty().append(this.$wrapper.empty());
    console.log('RENDER: ', this.$element);
    this.$element.ready($.proxy(function () {
      $(this).find('[data-toggle="tooltip"]').tooltip();
    }, this.$element));

    this.build();
  };

  Toolbar.prototype.build = function () {
    $.each(this.data, $.proxy(function (index, group) {
      var groupItem = $(this.template.item);

      if (group.childs) {
        var _this = this;
        var itemWrapper = $(_this.template.list);
        itemWrapper.attr('id', group.id);
        $.each(group.childs, function (index, child) {
          var item = $(_this.template.item);
          item.append(_this.buildItem(child));

          itemWrapper.append(item);
          if (child.type == "groupRadioButton") {
            itemWrapper.attr('data-toggle', 'buttons');
          }
        });
        groupItem.append(itemWrapper);
        this.$wrapper.append(groupItem);
      }
    }, this));
  };

  Toolbar.prototype.buildItem = function (item) {
    var _this = this;
    var type = item.type;
    var $item = $(this.template.type[type]).attr('id', item.id || '')
      .attr('name', item.name || '')
      .addClass('item')
      .attr('style', item.inlineStyle || '')
      .addClass(item.styleName || '');

    if (item.state.disabled) {
      $item.addClass('disabled');
    }

    switch (type) {
      case "combo":
        var dropDownId = 'dropDown' + (item.id || '');
        var $ul = $(this.template.type.dropDownUL);
        var $dropDownBtn = $(this.template.type.dropDownButton).attr('id', dropDownId);

        $item = $(this.template.type.dropDown).attr('id', item.id || '')
          .attr('name', item.name || '')
          .addClass('item')
          .append($dropDownBtn)
          .append($ul);

        if (item.options && item.options.length > 0) {
          $dropDownBtn.prepend($(_this.template.type.text).text(item.options[item.selectedIndex || 0].text).attr('class', 'dropdown-btn-text'));
          $.each(item.options, function (index, option) {
            var $opt = $(_this.template.type.dropDownItem);
            $opt.data('value', option.value);
            if (index == item.selectedIndex) {
              $opt.addClass('selected');
            }
            $opt.children('a').append(option.text);
            $ul.append($opt);
          });
        }
        break;
      case "text":
        break;
      case "inputText":
        $item.val(item.value);
        break;
      case "button":
      case "toggleButton":
        if (item.useIcon) {
          $item.append($(_this.template.icon).attr('class', item.useIcon));
        } else if (item.useImage) {
          $item.append($(_this.template.image).attr('src', item.useImage).attr('style', item.imageStyle || ''));
        } else {
          $item.append(item.text);
        }
        if (item.state.toggled) {
          $item.addClass('active').attr('aria-pressed', true);
        }
        break;
      case "checkbox":
        break;
      case "groupRadioButton":
        $item = $(this.template.label).addClass(item.styleName || 'btn btn-default btn-sm');
        var $radio = $(this.template.type.radio).attr('id', item.id)
          .attr('name', item.name)
          .attr('value', item.value);
        item.state.toggled = item.state.selected;
        if (item.state.selected || item.state.checked) {
          $item.addClass('active');
          $radio.attr('checked', true);
        }
        $item.append($radio).append(item.text);
        break;
      case "radio":
        var $radioItem = $(this.template.type.radio).attr('id', item.id || '')
          .attr('name', item.name || 'radioName')
          .attr('value', item.value || '');
        if (item.state.selected || item.state.checked) {
          $radioItem.attr('checked', true);
        }
        var $label = $(this.template.label).attr('for', item.id || '');

        $item = $(this.template.radioWrapper)
          .attr('id', item.id || '')
          .addClass('item')
          .append($radioItem)
          .append($label);

        if (item.useIcon) {
          $label.append($(_this.template.icon).attr('class', item.useIcon));
        } else if (item.useHtml) {
          $label.append($(item.useHtml));
        } else {
          $label.append(item.text);
        }

        break;
      case "datePicker":
        break;
    }

    if (item.tooltip) {
      $item.attr('data-toggle', 'tooltip')
        .attr('data-placement', item.tooltip.placement || 'top')
        .attr('title', item.tooltip.text);
    }

    return $item;
  };

  Toolbar.prototype.template = {
    list: '<ul class="list-group"></ul>',
    item: '<li class="list-group-item"></li>',
    indent: '<span class="indent"></span>',
    icon: '<i class="fa fa-dashboard"></i>',
    image: '<img class="img" />',
    link: '<a href="#" style="color:inherit;"></a>',
    badge: '<span class="badge"></span>',
    option: '<option></option>',
    radioWrapper: '<div class="radio-custom radio-primary"></div>',
    label: '<label></label>',
    type: {
      combo: '<select class="form-control"></select>',
      dropDown: '<div class="dropdown"></div>',
      dropDownButton: '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><span class="caret"></span></button>',
      dropDownUL: '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">',
      dropDownItem: '<li><a href="#"></a></li>',
      text: '<span class="text-center"></span>',
      inputText: '<input type="text" class="form-control" />',
      button: '<button type="button"></button>',
      toggleButton: '<button type="button" data-toggle="button"></button>',
      checkbox: '<input type="checkbox" />',
      radio: '<input type="radio" />',
      datePicker: ''
    }
  };

  Toolbar.prototype.destroy = function () {

    if (!this.initialized) return;

    this.$wrapper.remove();
    this.$wrapper = null;

    // Switch off events
    this.unsubscribeEvents();

    // Reset this.initialized flag
    this.initialized = false;
  };

  Toolbar.prototype.unsubscribeEvents = function () {

    this.$element.off('click');
    $('.item ul.dropdown-menu li').off('click');
  };

  Toolbar.prototype.subscribeEvents = function () {
    this.unsubscribeEvents();

    this.$element.on('click', $.proxy(this.clickHandler, this));
    $('.item ul.dropdown-menu li').on('click', $.proxy(this.onDropDownClick, this));

    if (typeof (this.options.onDropDownSelected) === 'function') {
      this.$element.on('onDropDownSelected', this.options.onDropDownSelected);
    }

    if (typeof (this.options.onButtonToggled) === 'function') {
      this.$element.on('onButtonToggled', this.options.onButtonToggled);
    }

    if (typeof (this.options.onItemSelected) === 'function') {
      this.$element.on('onItemSelected', this.options.onItemSelected);
    }

    if (typeof (this.options.onButtonClick) === 'function') {
      this.$element.on('onButtonClick', this.options.onButtonClick);
    }
  };

  Toolbar.prototype.findItem = function (target) {
    if (target.prop('tagName') === "LABEL") {
      var target = target.children('input');
      var itemId = target.attr('id');
      if (!itemId) return;
      var item = this.childs[itemId];
      if (item) return item;
    }
    var itemId = target.closest('.item').attr('id');
    if (!itemId)
      return;
    var item = this.childs[itemId];

    if (!item) {
      console.log('Error: item does not exist');
    }
    return item;
  };

  Toolbar.prototype.findItemById = function (id) {
    if (!id)
      return;
    var item = this.childs[id];
    return item;
  };

  /**
   * Toggle Button by button Id
   *
   * @param id
   * @param flag
   */
  Toolbar.prototype.toggleButton = function (id, flag) {
    var item = this.childs[id];
    if (!item) {
      console.log('Error: item does not exist');
    } else {
      this.childs[id].state.toggled = flag;
      if (flag) {
        $('#' + id).addClass('active').attr('aria-pressed', true);
      } else {
        $('#' + id).removeClass('active').attr('aria-pressed', false);
      }
    }
  };

  /**
   * Hide Item by Item Id
   *
   * @param id
   * @param flag (true|false)
   */
  Toolbar.prototype.hideItemById = function (id, flag) {
    if (flag === undefined)
      flag = true;
    if (flag) {
      $('#' + id).closest('li.list-group-item').hide();
    } else {
      $('#' + id).closest('li.list-group-item').show();
    }
  };

  /**
   * Hide group by group Id
   *
   * @param id
   * @param flag
   */
  Toolbar.prototype.hideGroupById = function (id, flag) {
    if (flag === undefined)
      flag = true;
    if (flag) {
      $('#' + id).closest('li.list-group-item').hide();
    } else {
      $('#' + id).closest('li.list-group-item').show();
    }
  };

  /**
   * Hide group by Item ID (Find the group which contains the item and hide it)
   *
   * @param id
   * @param flag
   */
  Toolbar.prototype.hideGroupByItemId = function (id, flag) {
    if (flag === undefined)
      flag = true;
    var $group = $('#' + id).closest('ul.list-group');
    if (flag) {
      $group.hide();
    } else {
      $group.show();
    }
  };

  /**
   * Remove item out of toolbar
   *
   * @param id
   */
  Toolbar.prototype.removeItem = function (id) {
    // TODO: Not working perfectly.
    for (var i = 0; i < this.childs.length; i++) {
      if (this.childs[i].id === id) {
        this.splice(i, 1);
        $('#' + this.childs[i].id).remove();
        break;
      }
    }
  };

  Toolbar.prototype.clickHandler = function (event) {
    var target = $(event.target);
    // if (target.prop)
    var item = this.findItem(target);
    if (!item || item.state.disabled) return;

    if (item.type != "radio" && item.type != "checkbox") {
      if (!this.options.enableLinks) event.preventDefault();
    }

    switch (item.type) {
      case "toggleButton":
        item.state.toggled = !item.state.toggled;
        this.$element.trigger('onButtonToggled', $.extend(true, {}, item));
        break;
      case "groupRadioButton":
        var preItem = this.getSelectedItem(item.name);
        preItem.state.toggled = preItem.state.selected = false;
        item.state.selected = !item.state.selected;
        item.state.toggled = !item.state.toggled;
        this.$element.trigger('onButtonToggled', $.extend(true, {}, item));
        this.$element.trigger('onItemSelected', $.extend(true, {}, item));

        $('input[name="' + item.name + '"]').removeAttr('checked');
        $('#' + item.id).attr('checked', true);
        break;
      case "radio":
      case "checkbox":
        item.state.selected = !item.state.selected;
        this.$element.trigger('onItemSelected', $.extend(true, {}, item));
        break;
      case "button":
        this.$element.trigger('onButtonClick', $.extend(true, {}, item));
        break;
    }
    // console.log("clickHandler", item);
  };

  Toolbar.prototype.onDropDownClick = function (event) {
    $('.dropdown-menu li.selected').removeClass('selected');
    $(event.currentTarget).addClass('selected');
    var $parent = $(event.currentTarget).parent();
    var text = $(event.currentTarget).children('a').text();
    $parent.prev().children('.dropdown-btn-text').html(text);
    var item = this.findItem($(event.currentTarget));
    for (var i = 0; i < item.options.length; i++) {
      if (item.options[i].text == text) {
        item.selectedIndex = i;
        item.selectedItem = item.options[item.selectedIndex];
        break;
      }
    }

    this.$element.trigger('onDropDownSelected', $.extend(true, {}, item));
  };

  Toolbar.prototype.getItemState = function (id) {
    var item = this.findItemById(id);
    return item.state;
  };

  Toolbar.prototype.getSelectedItem = function (id) {
    var item = this.findItemById(id);
    if (!item) {
      var $item = $("input[name='" + id + "'][checked='checked']");
      item = this.findItemById($item.attr('id'));
    }

    if (item.type == 'combo') {
      return item.options[item.selectedIndex];
    } else if (item.type == "groupRadioButton") {
      return item;
    } else {
      console.log("Error: Cannot get selectedItem of item which has type: [" + item.type + "]");
      return undefined;
    }
  };

  Toolbar.prototype.getItemValue = function (id) {
    var item = this.findItemById(id);
    if (item.type == "inputText") {
      return $('#' + item.id).val();
    }
    return '';
  };

  var logError = function (message) {
    if (window.console) {
      window.console.error(message);
    }
  };

  // Prevent against multiple instantiations,
  // handle updates and method calls
  $.fn[pluginName] = function (options, args) {

    var result;

    this.each(function () {
      var _this = $.data(this, pluginName);
      if (typeof options === 'string') {
        if (!_this) {
          logError('Not initialized, can not call method : ' + options);
        }
        else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
          logError('No such method : ' + options);
        }
        else {
          if (!(args instanceof Array)) {
            args = [args];
          }
          result = _this[options].apply(_this, args);
        }
      }
      else if (typeof options === 'boolean') {
        result = _this;
      }
      else {
        $.data(this, pluginName, new Toolbar(this, $.extend(true, {}, options)));
      }
    });

    return result || this;
  };
})(jQuery, window, document);