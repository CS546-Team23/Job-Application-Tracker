(function($) {
    let form = $("#note-form"),
    text_input = $("#note-input"),
    text_label = $("#form-label"),
    form_reset = $("#form-reset"),
    note_list = $("#note-list"),
    note_error = $("#note-error");
    
    function elementFromNote(note) {
        return $(`
            <li class="note" data-id=${note._id}>
                <cite>${note.date} ${note.time}</cite>
                <p class="note-content">${note.text}</p>
                <button onclick="javascript:void(0)" class="editButton">Edit</button>
                <button onclick="javascript:void(0)" class="deleteButton">Delete</button>
            </li>`
        );
    }

    function setError(message) {
        return () => note_error.html(message);
    }

    function resetForm() {
        form.removeAttr("data-id");
        text_label.html('New Note');
        text_input.val("");
        note_error.html("");
    } 

    function rebindDeleteButtons(deleteButtons) {
        deleteButtons.click(function(e) {
            e.preventDefault();

            let parent = $(this).parent();
            const id = parent.attr("data-id");
            
            let requestConfig = {
                method: 'DELETE',
                url: `/api/notes/${id}`,
                error: setError(`Note delete failed`)
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                if (responseMessage.success) { parent.remove(); }
                else { note_error.html(responseMessage.error); }
            });
        });
    }

    function rebindEditButtons(editButtons) {
        editButtons.click(function(e) {
            e.preventDefault();
            
            let parent = $(this).parent();
            const id = parent.attr("data-id");
            const index = $(this).parent().index() + 1;
            
            form.attr("data-id", id);
            text_label.html(`Editing Note #${index}`);
            text_input.val(parent.find(".note-content").html());
        });
    }

    rebindDeleteButtons($(".deleteButton"));
    rebindEditButtons($(".editButton"));

    // go back to new note submission
    form_reset.click(function() {
        resetForm();
    });

    form.submit(function(e) {
        e.preventDefault();

        const id = form.attr("data-id");
        const text_content = text_input.val().trim();

        if (!text_content) return note_error.html("Note contents cannot be empty or just spaces");;

        if (id === undefined) {
            const split_string = window.location.href.split("/");
            const app_id = split_string[split_string.length-1];
            console.log(app_id);
            let requestConfig = {
                method: 'POST',
                url: `/api/applications/notes/${app_id}`,
                data: {text: text_content},
                error: setError(`Note create failed`)
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                const {success, note} = responseMessage;
                if (success) {
                    const element = elementFromNote(note);
                    rebindEditButtons(element.find(".editButton"));
                    rebindDeleteButtons(element.find(".deleteButton"));
                    note_list.append(element);
                }
                else { note_error.html(responseMessage.error); }
            });
        } else {
            const form_id = form.attr("data-id");

            let requestConfig = {
                method: 'PATCH',
                url: `/api/notes/${form_id}`,
                data: { text: text_content },
                error: setError(`Note patch failed`)
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage);
                if (responseMessage.success) {
                    const element = elementFromNote(responseMessage.note);
                    const replace = note_list.find(`[data-id='${responseMessage.note._id}']`);
                    rebindEditButtons(element.find(".editButton"));
                    rebindDeleteButtons(element.find(".deleteButton"));
                    replace.replaceWith(element);
                }
                else { note_error.html(responseMessage.error); }
            });
        }

        resetForm();
    });
})(window.jQuery);