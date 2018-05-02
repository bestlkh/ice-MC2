let Preview = {
    delay: 100, // delay after keystroke before updating
    preview: null, // filled in by Init below
    buffer: null, // filled in by Init below
    timeout: null, // store setTimout id
    mjRunning: false, // true when MathJax is processing
    mjPending: false, // true when a typeset has been queued
    oldText: null, // used to check if an update is needed
    //
    //  Get the preview and buffer DIV's
    //
    Init: function() {
        this.preview = document.getElementById('math-preview');
        this.buffer = document.getElementById('math-buffer');
        this.buffer.style.display = 'none';
    },
    //
    //  Switch the buffer and preview, and display the right one.
    //
    SwapBuffers: function() {
        let buffer = this.preview;
        let preview = this.buffer;
        this.buffer = buffer; this.preview = preview;
        if (buffer) {                
            buffer.style.display = 'none';
            preview.style.display = '';
        }
    },
    //
    //  This gets called when a key is pressed in the textarea.
    //  We check if there is already a pending update and clear it if so.
    //  Then set up an update to occur after a small delay (so if more keys
    //    are pressed, the update won't occur until after there has been
    //    a pause in the typing).
    //  The callback function is set up below, after the Preview object
    //    is set up.
    //
    Update: function() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.callback, this.delay);
    },
    //
    //  Creates the preview and runs MathJax on it.
    //  If MathJax is already trying to render the code, return
    //  If the text hasn't changed, return
    //  Otherwise, indicate that MathJax is running, and start the
    //    typesetting.  After it is done, call PreviewDone.
    //
    CreatePreview: function() {
        Preview.timeout = null;
        if (this.mjPending) return;
        let text = sanitizeHtml(previewEditor.getValue());
        if (text === this.oldtext) return;
        if (this.mjRunning) {
            this.mjPending = true;
            MathJax.Hub.Queue(['CreatePreview', this]);
        } else {
            if (!this.buffer) {
                MathJax.Hub.Queue(
                    ['Typeset', MathJax.Hub, this.buffer],
                    ['PreviewDone', this]
                );
            } else {
                this.buffer.innerHTML = this.oldtext = text;
                this.mjRunning = true;
                MathJax.Hub.Queue(
                    ['Typeset', MathJax.Hub, this.buffer],
                    ['PreviewDone', this]
                );
            }
        }
    },
    //
    //  Indicate that MathJax is no longer running,
    //  and swap the buffers to show the results.
    //
    PreviewDone: function() {
        this.mjRunning = this.mjPending = false;
        this.SwapBuffers();
    },
};
//
//  Cache a callback to the CreatePreview action
//
Preview.callback = MathJax.Callback(['CreatePreview', Preview]);
Preview.callback.autoReset = true; // make sure it can run more than once
