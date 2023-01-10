let pendingRequests = {}

const overlaySpinner = (displayMessage) => {
    function generateId() {
        const crypto = window.crypto || window.msCrypto
        const array = new Uint32Array(1)
        crypto.getRandomValues(array)
        return array[0]
    }

    const id = generateId()

    if (!displayMessage) {
        displayMessage = 'Please wait. Loading...'
    }

    if ($('#spinner').children().length === 0) {
        $('#spinner').append(`
        <div id="spinner-container" class="spinner-container">
            <div class="spinner-position">
                <div class="app-logo-outer">
                    <div class="app-logo-inner"></div>
                </div>
                <p class="spinner-message">${displayMessage}</p>
            </div>
        </div>`)
    }
    pendingRequests[id] = id
    return id
}

const disposeSpinner = (spinnerId) => {
    if (spinnerId) {
        delete pendingRequests[spinnerId]
        if (JSON.stringify(pendingRequests) === JSON.stringify({})) {
            $(`#spinner-container`).remove()
        }
    } else {
        pendingRequests = {}
        $(`#spinner-container`).remove()
    }
}

export { overlaySpinner, disposeSpinner }
