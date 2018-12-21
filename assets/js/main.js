function notificationShow(msg, msgClass, delay) {
    if (msgClass === undefined) {
        msgClass = 'info';
    }

    if (delay === undefined) {
        delay = 2000;
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

    var closer = '<svg class="closer-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g></svg>';

    // display and then remove notification after a certain amount of time

    var notification = $('<div class="notification-panel rounded shadow ' + msgClass + '"><div class="notification-text">' + msg + '</div><div class="notification-closer">' + closer + '</div></div>');
    
    notification.appendTo('body');

    setTimeout(function () {
        notification.fadeOut(200, function() {
            $(this).remove();
        });
    }, delay);

    // $('<div class="notification-panel rounded shadow ' + msgClass + '"><div class="notification-text">' + msg + '</div><div class="notification-closer">' + closer + '</div></div>').appendTo('body');
}

function notificationClose(element) {
    console.log('remove ' + element);
    element.closest('.notification-panel').fadeOut(100, function() {
        $(this).remove();
    });
}

function editSave(inputElement) {
    var newTitle = inputElement.val();

    // remove the input and display the new title
    inputElement.parent().prepend('<span class="loading-icon mr-2"><i class="fas fa-circle-notch fa-spin"></i></span>');

    $.ajax({
        url: 'assets/js/ajax.php',
        data: {
            action: 'editRoutineTitle',
            id: $('.routine-detail').data('routine-id'),
            title: newTitle
        },
        type: 'post',
        success: function(output) {
            if (output.error == '') {
                console.log(output);
                $('.loading-icon').remove();
                $('.routine-title-form').remove();

                if (output.routineName != '') {
                    $('.routine-title-value').text(output.routineName).show();
                } else {
                    $('.routine-title-value').show();
                }
                
                $('#edit-routine-title').removeClass('edit-mode');
            } else {
                notificationShow('<span>' + output.error + '</span>', 'error');
            }
        },
        error: function(jqXHR, status, error) {
            console.log('jqXHR: ' + jqXHR);
            console.log('status: ' + status);
            console.log('error: ' + error);
        }
    });
}

function editCancel() {
    $('.routine-title-form').remove();
    $('.routine-title-value').show();
    $('#edit-routine-title').removeClass('edit-mode');
}

$(document).ready(function() {
	/*$('.toggler-checkbox').on('change', function () {
		$(this).parent().addClass('active');
	});*/

    $(document).on('click', '.notification-closer', function() {
        notificationClose($(this));
    });

	// get height of routine-overview
	var overviewHeight = $('.routine-overview').outerHeight();
	var routineDetail = $('.routine-detail');
	// position routine-detail at the top
	routineDetail.css('transform', 'translate(100%, -' + overviewHeight+ 'px)');
	routineDetail.css('display', 'flex');

	// ------------------- show routine detail -------------------
	$(document).on('click', '.edit-routine', function() {
        var routineId = $(this).data('routine-id');

        // move routine-overview out of view
        $('.routine-overview').addClass('routine-overview-hide');

        // move routine-detail into view
        routineDetail.addClass('routine-detail-show');
        routineDetail.css('transform', 'translate(0, -' + overviewHeight+ 'px)');

        // update routine detail
        $('.routine-detail').attr('data-routine-id', routineId);
	});

    // ------------------- show routine overview -------------------
	$('#back-to-routine-overview').on('click', function() {
		// move routine-overview into view
		$('.routine-overview').removeClass('routine-overview-hide');

		// move routine-detail out of view
		routineDetail.removeClass('routine-detail-show');
		routineDetail.css('transform', 'translate(100%, -' + overviewHeight+ 'px)');
	});

    // ------------------- edit routine title -------------------
    $(document).on('click', '#edit-routine-title:not(.edit-mode)', function() {
        $(this).addClass('edit-mode');
        var title = $(this).find('.routine-title-value');

        // hide the title and display it in an input field
        title.hide();
        // $(this).append('<form class="routine-title-form"><button type="button" class="btn btn-secondary"><span class="routine-title-confirm-icon"><i class="fas fa-check"></i></span></button><button type="button" class="btn btn-secondary"><span class="routine-title-abort-icon"><i class="fas fa-times"></i></span></button><input class="routine-title-input" type="text" value="' + title.html() + '"></form>');
        $(this).append('<form class="routine-title-form"><input class="routine-title-input" type="text" value="' + title.html() + '"></form>');
        $(this).find('.routine-title-input').focus();
    });

    // ------------------- apply edited routine title -------------------
    $(document).on('keydown', '.routine-title-input', function(e) {
        // check for enter key
        if (e.keyCode == 13) {
            e.preventDefault();
            editSave($(this));
        }
    });

    // ------------------- apply edited routine title -------------------
    $(document).on('blur', '.routine-title-input', function() {
        editSave($(this));
    });

    // ------------------- abort edited routine title -------------------
    $(document).on('keyup', '.routine-title-input', function(e) {
        // check for escape key
        if (e.keyCode == 27) {
            editCancel($(this));
        }
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
                    // notificationShow('<span>New routine was created</span>', 'info');
                    var lastRoutine = $('.routine-overview-container > div:last-of-type');
                    var newRoutine = lastRoutine.clone();
                    newRoutine.find('.edit-routine').attr('data-routine-id', output.routineId);
                    newRoutine.find('.routine-name').html(output.routineName);
                    newRoutine.find('.routine-last-workout .date-value').html('-');
                    $(newRoutine).insertAfter(lastRoutine).hide().fadeIn(200);
                } else {
                    notificationShow('<span>' + output.error + '</span>', 'error');
                }
            },
            error: function(jqXHR, status, error) {
                console.log('jqXHR: ' + jqXHR);
                console.log('status: ' + status);
                console.log('error: ' + error);
            }
        });
    });

	// ------------------- delete routine -------------------
    $(document).on('click', '.delete-routine', function() {
        var routine = $(this).closest('.routine');
        $.ajax({
        	url: 'assets/js/ajax.php',
            data: {
        		action: 'deleteRoutine',
                id: $(this).data('routine-id')
            },
            type: 'post',
            success: function(output) {
                if (output.error == '') {
                    // remove element after fadeOut
                    routine.fadeOut(200, function() {
                        routine.remove();
                    });
                } else {
                    console.log('show error: ' + output.error);
                    notificationShow('<span>' + output.error + '</span>', 'error');
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
                    // notificationShow('<span>New routine was created</span>', 'info');
                    var lastSet = $('.set-container > div:last-of-type');
                    var newSet = lastSet.clone();
                    newSet.find('.set').attr('data-set-id', output.setId);
                    newSet.find('.set-excercise-value').html('');
                    newSet.find('.set-amount-value').html('0');
                    newSet.find('.set-unit-value').html('');
                    $(newSet).insertAfter(lastSet).hide().fadeIn(200);
                } else {
                    notificationShow('<span>' + output.error + '</span>', 'error');
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
                    set.fadeOut(200, function() {
                        set.remove();
                    });
                } else {
                    notificationShow('<span>' + output.error + '</span>', 'error');
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