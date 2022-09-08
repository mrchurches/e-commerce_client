
export function getCookie(cname) {
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(cname + "=");
        if (start != -1) {
            start = start + cname.length + 1;
            let end = document.cookie.indexOf(";", start);
            if (end == -1)
                end = document.cookie.length;
            return document.cookie.substring(start, end);
        }
    }
    return "";
}