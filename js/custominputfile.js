/* Copyright (c) 2015 Valentin GOT
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {

	/**
	 * theme : Theme (default: 'cyan')
	 * value : Default input value (default: '')
	 * icon	 : Button icon (default: '')
	 * text  : Button text (default: 'Browse')
	 */
	var defaultOptions = {
		theme: 'cyan',
		value: '',
		icon : '',
		text : 'Browse'
	};

	var availableThemes = [
		'red',
		'pink',
		'purple',
		'deep-purple',
		'indigo',
		'blue',
		'light-blue',
		'cyan',
		'teal',
		'green',
		'light-green',
		'lime',
		'yellow',
		'amber',
		'orange',
		'deep-orange',
		'brown',
		'grey',
		'blue-grey'
	];

	$.fn.custominputfile = function(options) {
		this.each(function() {
			var cif = $(this);
			
			// Settings
			settings = $.extend(defaultOptions, options);
			
			// Use the DOM data attributs (those are used in priority)
			var setting = null;
			for(setting in settings)
				settings[setting] = (cif.data(setting)) ? cif.data(setting) : settings[setting];
			
			// Check theme availability
			if (availableThemes.indexOf(settings.theme) === -1)
				throw new Error('The theme "' + settings.theme + '" is not available.');

			// Create the custom input file
			createCustomInputFile.call(cif, settings);
		});
	};
	
	/**
	 * Create the CustomInputFile HTML
	 */
	var createCustomInputFile = function(settings) {
		var inputFile = this;
		
		/*----------------------------------------------
			HTML
		----------------------------------------------*/
		
		// Wrapper
		var wrapper = $('<div />', {
			class: 'cif-wrapper cif-theme-' + settings.theme
		});
		
		// Input
		var customInput = $('<input />', {
			type: 'text',
			class: 'cif-text',
			readonly: 'readonly',
			value: settings.value
		});

		// Browse button
		var customBrowseBtn = $('<a />', {
			class: 'cif-btn'
		});
		if(settings.icon !== '') {
			customBrowseBtn.append($('<span />', {
				class: settings.icon,
			}));
		}
		customBrowseBtn.append(((settings.icon !== '') ? '&nbsp;&nbsp;' : '') + settings.text);

		/*----------------------------------------------
			Events
		----------------------------------------------*/
	
		// Hide cursor
		customInput.on('focus', function() { this.blur(); });
		
		// Trigger input file
		customInput.on('click', function() { inputFile.trigger('click'); });
		customBrowseBtn.on('click', function() { inputFile.trigger('click'); });
		
		// Change value
		inputFile.on('change', function() {
			customInput.val($(this).val());
		});
		
		/*----------------------------------------------
			Display
		----------------------------------------------*/
	
		inputFile.addClass('hide').wrap(wrapper);
		inputFile.parent().append($('<div />', {
			class: 'cif-group'
		}).append(customInput).append(customBrowseBtn));
	};

}(jQuery));