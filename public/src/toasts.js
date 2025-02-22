
const toast = Toastify({
    text: window.toast,
    close: true,
    // gravity: "bottom",
    position:"center",
    style: {
        background: "linear-gradient(to right, #ff0000, #ff4a4a, #ff7f7f)"
    },
    duration: 3000  
    })

document.addEventListener("DOMContentLoaded", function() {
    if (window.toast) {
        console.log("Toast widoczny")
        toast.showToast();
    }
});
