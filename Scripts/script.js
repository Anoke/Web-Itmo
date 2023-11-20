window.onload = function() {
    let loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    document.getElementById("loadTime").innerHTML = " " + loadTime;
}