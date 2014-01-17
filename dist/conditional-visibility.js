// conditional-visibility.js 1.0.0
//
// Copyright (C) 2014, Eleven41 Software Inc.
//
// data-visibility-target="..." - ID of the control upon which this controls visibility depends
// data-visibility-action="show|hide" - Whether to show or hide, default is to show
// data-visibility-value="..." - Value upon which to show (or hide) the control

var ConditionalVisibility = ConditionalVisibility || {}

ConditionalVisibility.init = function() {
	$("[data-visibility-target]").each(function () {
		var self = $(this);
		var targetId = self.attr('data-visibility-target');
		var target = $('#' + targetId);
		var tagType = target.prop("tagName");

		var action = self.attr('data-visibility-action');
		if (action == '' || action == null) {
			action = 'show';
		}

		if (tagType == 'SELECT') {

			var visibleValue = self.attr('data-visibility-value');
			if (visibleValue == null) {
				visibleValue = '';
			}

			// When the target changes
			var callback = function () {
				var value = target.val().toString();
				if (value == visibleValue) {
					if (action == 'show') {
						self.show();
					} else if (action == 'hide') {
						self.hide();
					}
				} else {
					if (action == 'show') {
						self.hide();
					} else if (action == 'hide') {
						self.show();
					}
				}
			};

			target.change(callback);
			callback();
		} else if (tagType == 'INPUT') {
			var inputType = target.attr('type');
			if (inputType == 'checkbox') {

				var visibleValue = self.attr('data-visibility-value');
				if (visibleValue == null) {
					visibleValue = 'checked';
				}

				// When the target changes
				var callback = function () {
					var value = target.attr('checked');
					if (value == visibleValue) {
						if (action == 'show') {
							self.show();
						} else if (action == 'hide') {
							self.hide();
						}
					} else {
						if (action == 'show') {
							self.hide();
						} else if (action == 'hide') {
							self.show();
						}
					}
				};

				target.click(callback);
				callback();
			}
		}
	});
}

// When the document is ready, initialize the conditional visibility
$(document).ready(function () {
	ConditionalVisibility.init();
});
