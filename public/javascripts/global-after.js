document.querySelectorAll("form").forEach((item) => {
    item.addEventListener("submit", (event) => {
        event.preventDefault()
    })
})

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type = "info") => {
    while(alertPlaceholder.firstChild) {
        alertPlaceholder.removeChild(alertPlaceholder.firstChild)
    }

    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible fade" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)

    const alert = bootstrap.Alert.getOrCreateInstance('#myAlert')
    setTimeout(() => {
        alert.close()
    }, 3000);
}

const adjustMainContentHeight = () => {
    const margin = 20
    const navBarHeight = document.getElementById("navBarContainer").offsetHeight
    const mainContentContainer = document.getElementById("mainContentContainer")
    if (mainContentContainer) {
        mainContentContainer.style.maxHeight = `calc(100vh - ${navBarHeight}px - ${margin * 2}px)`
        mainContentContainer.style.marginTop = `${margin}px`
        mainContentContainer.style.marginBottom = `${margin}px`
    }
}

window.addEventListener("load", adjustMainContentHeight)
window.addEventListener("resize", adjustMainContentHeight)