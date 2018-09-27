// conditional-visibility.js 1.3.0
//
// Copyright (C) 2018, Eleven41 Software Inc.
//
// data-visibility-target="..." - ID of the control upon which this controls visibility depends
// data-visibility-action="show|hide" - Whether to show or hide, default is to show
// data-visibility-value="..." - Comma-separated list of values upon which to show (or hide) the control

var ConditionalVisibility = ConditionalVisibility || {};

// Primary initialization function that will find all
// elements that want conditional visibility and 
// set visibility on them.
ConditionalVisibility.init = function () {
    $("[data-visibility-target]").each(function () {
        var self = $(this);
        ConditionalVisibility.setVisibility(self);
    });
};

// Sets visibility on a single element object.
ConditionalVisibility.setVisibility = function (self) {

    var targetId = self.attr('data-visibility-target');
    var target = $('#' + targetId);
    var tagType = target.prop("tagName");

    var action = self.attr('data-visibility-action');
    if (action === '' || action == null) {
        action = 'show';
    }

    if (tagType === 'SELECT') {

        var valueField = self.attr('data-visibility-value');
        if (valueField == null) {
            valueField = '';
        }
        var visibleValues = valueField.split(',');

        // When the target changes
        var callback = function () {
            var value = target.val().toString();
            for (var i = 0; i < visibleValues.length; ++i) {
                var visibleValue = visibleValues[i];
                if (value === visibleValue) {
                    // A valid value was found.
                    if (action === 'show') {
                        self.show();
                    } else if (action === 'hide') {
                        self.hide();
                    }

                    return;
                }
            }

            // IF we get here, then a valid value was not found
            if (action === 'show') {
                self.hide();
            } else if (action === 'hide') {
                self.show();
            }
        };

        target.change(callback);
        callback();
    } else if (tagType === 'INPUT') {
        var inputType = target.attr('type');
        if (inputType === 'checkbox') {

            // When the target changes
            var callback = function () {
                var isChecked = target.is(':checked');
                if (isChecked) {
                    if (action === 'show') {
                        self.show();
                    } else if (action === 'hide') {
                        self.hide();
                    }
                } else {
                    if (action === 'show') {
                        self.hide();
                    } else if (action === 'hide') {
                        self.show();
                    }
                }
            };

            target.click(callback);
            callback();
        }
    }
};

// When the document is ready, initialize the conditional visibility
$(document).ready(function () {
    ConditionalVisibility.init();
});
