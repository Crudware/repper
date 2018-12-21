function showNotification(msg, msgClass, delay) {
    if (msgClass === undefined) {
        msgClass = 'info';
    }

    if (delay === undefined) {
        delay = 1500;
    }

    // move up existing messages
    var notificationPanels = $('.notification-panel');
    notificationPanels.each(function(index) {
        var offset = $('.notification-panel').height() + 50;
        var oldPos = $(this).css('bottom');
        var newPos = 'calc(' + oldPos + ' + ' + offset + 'px)';

        // reposition the old notification
        $(this).css('bottom', newPos)
    });

    // display and then remove notification after a certain amount of time
    /*$('<div class="notification-panel rounded shadow ' + msgClass + '">' + msg + '</div>').appendTo('.website-wrapper').delay(delay).fadeOut(400, function() {
        $(this).remove();
    });*/
    $('<div class="notification-panel rounded shadow ' + msgClass + '">' + msg + '</div>').appendTo('.website-wrapper').delay(delay);
}

$(document).ready(function() {
	/*$('.toggler-checkbox').on('change', function () {
		$(this).parent().addClass('active');
	});*/

	// get height of routine-overview
	var overviewHeight = $('.routine-overview').outerHeight();
	var routineDetail = $('.routine-detail');
	// position routine-detail at the top
	routineDetail.css('transform', 'translate(100%, -' + overviewHeight+ 'px)');
	routineDetail.css('display', 'flex');

	// ------------------- edit existing routine -------------------
	$(document).on('click', '.edit-routine', function() {
		console.log('edit routine');

		// move routine-overview out of view
		$('.routine-overview').addClass('routine-overview-hide');

		// move routine-detail into view
		routineDetail.addClass('routine-detail-show');
		routineDetail.css('transform', 'translate(0, -' + overviewHeight+ 'px)');
	});

	$('#back-to-routine-overview').on('click', function() {
		// move routine-overview into view
		$('.routine-overview').removeClass('routine-overview-hide');

		// move routine-detail out of view
		routineDetail.removeClass('routine-detail-show');
		routineDetail.css('transform', 'translate(100%, -' + overviewHeight+ 'px)');
	});

	// ------------------- add new routine -------------------
	$('#add-new-routine').on('click', function() {
        $.ajax({
        	url: 'assets/js/ajax.php',
            data: {
        		action: 'addRoutine'
            },
            type: 'post',
            success: function(output) {
                if (output.error == '') {
                	console.log(output);
                    // showNotification('<p>New routine was created</p>', 'info');
                    var lastRoutine = $('.routine-overview-container > div:last-of-type');
                    var newRoutine = lastRoutine.clone();
                    newRoutine.find('.edit-routine').attr('data-routine-id', output.routineId);
                    newRoutine.find('.routine-name').html(output.routineName);
                    newRoutine.find('.routine-last-workout .date-value').html('-');
                    $(newRoutine).insertAfter(lastRoutine).hide().fadeIn();
                } else {
                    showNotification('<p>' + output.error + '</p>', 'error');
                }
            },
            error: function(jqXHR, status, error) {
            	console.log('jqXHR: ' + jqXHR);
            	console.log('status: ' + status);
            	console.log('error: ' + error);
            }
        });
	});

    // ------------------- edit routine title -------------------
    $(document).on('click', '#edit-routine-title:not(.edit-mode)', function() {
        $(this).addClass('edit-mode');
        var title = $(this).find('.routine-title-value');

        // hide the title and display it in an input field
        title.hide();
        // $(this).append('<form class="routine-title-form"><button type="button" class="btn btn-secondary"><span class="routine-title-confirm-icon"><i class="fas fa-check"></i></span></button><button type="button" class="btn btn-secondary"><span class="routine-title-abort-icon"><i class="fas fa-times"></i></span></button><input class="routine-title-input" type="text" value="' + title.html() + '"></form>');
        // $(this).append('<form class="routine-title-form"><input class="routine-title-input" type="text" value="' + title.html() + '"></form>');
        $(this).append('<input class="routine-title-input" type="text" value="' + title.html() + '">');
        $(this).find('.routine-title-input').focus();
    });

    /*
    $(window).keydown(function(event){
        console.log('prevent propagation');
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
    });
    */
    //
    /*
    $(document).on('keydown', '.routine-title-input', function(e) {
        // check for enter key
        if (e.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
    */

    // ------------------- apply edited routine title -------------------
    $(document).on('blur', '.routine-title-input', function() {
        var newTitle = $(this).val();

        // remove the input and display the new title
        // $('.routine-title-form').remove();
        $('.routine-title-input').remove();
        $('.routine-title-value').text(newTitle).show();
        $('#edit-routine-title').removeClass('edit-mode');

        /*
        $.ajax({
            url: 'assets/js/ajax.php',
            data: {
                action: 'editRoutineTitle',
                id: ''
            },
            type: 'post',
            success: function(output) {
                if (output.error == '') {
                    console.log(output);
                    // showNotification('<p>New routine was created</p>', 'info');
                    var lastRoutine = $('.routine-overview-container > div:last-of-type');
                    var newRoutine = lastRoutine.clone();
                    newRoutine.find('.edit-routine').attr('data-routine-id', output.routineId);
                    newRoutine.find('.routine-name').html(output.routineName);
                    newRoutine.find('.routine-last-workout .date-value').html('-');
                    $(newRoutine).insertAfter(lastRoutine).hide().fadeIn();
                } else {
                    showNotification('<p>' + output.error + '</p>', 'error');
                }
            },
            error: function(jqXHR, status, error) {
                console.log('jqXHR: ' + jqXHR);
                console.log('status: ' + status);
                console.log('error: ' + error);
            }
        });
        */
    });

    // ------------------- abort edited routine title -------------------
    $(document).on('keyup', '.routine-title-input', function(e) {
        // check for escape key
        if (e.keyCode == 27) {
            // $('.routine-title-form').remove();
            $('.routine-title-input').remove();
            $('.routine-title-value').show();
            $('#edit-routine-title').removeClass('edit-mode');
        }
    });

	// ------------------- delete routine -------------------
	$('#delete-routine').on('click', function() {
        $.ajax({
        	url: 'assets/js/ajax.php',
            data: {
        		action: 'addRoutine'
            },
            type: 'post',
            success: function(output) {
                if (output.error == '') {
                	console.log(output);
                    // showNotification('<p>New routine was created</p>', 'info');
                    var lastRoutine = $('.routine-overview-container > div:last-of-type');
                    var newRoutine = lastRoutine.clone();
                    newRoutine.find('.edit-routine').attr('data-routine-id', output.routineId);
                    newRoutine.find('.routine-name').html(output.routineName);
                    newRoutine.find('.routine-last-workout .date-value').html('-');
                    $(newRoutine).insertAfter(lastRoutine).hide().fadeIn();
                } else {
                    showNotification('<p>' + output.error + '</p>', 'error');
                }
            },
            error: function(jqXHR, status, error) {
            	console.log('jqXHR: ' + jqXHR);
            	console.log('status: ' + status);
            	console.log('error: ' + error);
            }
        });
	});


	// ------------------- add new set -------------------
	$('#add-new-set').on('click', function() {
        $.ajax({
        	url: 'assets/js/ajax.php',
            data: {
        		action: 'addSet'
            },
            type: 'post',
            success: function(output) {
                if (output.error == '') {
                	console.log(output);
                    // showNotification('<p>New routine was created</p>', 'info');
                    var lastSet = $('.set-container > div:last-of-type');
                    var newSet = lastSet.clone();
                    newSet.find('.set').attr('data-set-id', output.setId);
                    newSet.find('.set-excercise-value').html('');
                    newSet.find('.set-amount-value').html('0');
                    newSet.find('.set-unit-value').html('');
                    $(newSet).insertAfter(lastSet).hide().fadeIn();
                } else {
                    showNotification('<p>' + output.error + '</p>', 'error');
                }
            },
            error: function(jqXHR, status, error) {
            	console.log('jqXHR: ' + jqXHR);
            	console.log('status: ' + status);
            	console.log('error: ' + error);
            }
        });
	});

    // ------------------- delete set -------------------
    $(document).on('click', '.delete-set', function() {
        var set = $(this).closest('.set');
        $.ajax({
            url: 'assets/js/ajax.php',
            data: {
                action: 'deleteSet',
                id: set.data('set-id')
            },
            type: 'post',
            success: function(output) {
                if (output.error == '') {
                    console.log('start fadeout');
                    // remove element after fadeOut
                    set.fadeOut(400, function() {
                        set.remove();
                        console.log('after remove');
                    });
                } else {
                    showNotification('<p>' + output.error + '</p>', 'error');
                }
            },
            error: function(jqXHR, status, error) {
                console.log('jqXHR: ' + jqXHR);
                console.log('status: ' + status);
                console.log('error: ' + error);
            }
        });
    });


	/*
	$('.routine-title').click(function() {
		console.log('routine title focus');
		$(this).css('background-color', 'yellow');
	});

	$('.routine-title').focus(function() {
		console.log('routine title focus');
		$(this).css('background-color', 'yellow');
	});

	$('.routine-title').blur(function() {
		console.log('routine title unfocus');
	 	$(this).css('background-color', 'white');
	});
	*/
});