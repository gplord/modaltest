jQuery(document).ready(function () {

    // Temp: Per-page/instance global values
    var cookieName = "aopa_pic";
    var cookieExpiry = 14;          // Days
    var modalID = "#modal-pic";
    var redirectURL = "https://pic.aopa.org/discuss";

    jQuery(".modal").click(function (event) {
        event.stopPropagation();    // Stop clickthrough on modal content
    });

    // Debug: each of these cases could be individually configured to set/not set the cookie, if preferred
    // Case 1: closed by background click
    jQuery(".modal-overlay").click(function () {
        setCookie(cookieName, 1);
        jQuery(this).hide();
    });

    // Case 2: closed by close-button click
    jQuery(".modal .modal-close").click(function () {
        setCookie(cookieName, 1);
        jQuery("#" + jQuery(this).data("modal-id")).hide();
    });

    // Case 3: Closed by CTA button press
    jQuery(".modal .modal-action").click(function () {
        jQuery("#" + jQuery(this).data("modal-id")).hide();

        // Any other button action functionality here
        setCookie(cookieName, 1);
        window.location.href = redirectURL;

    });

    // Show Modal, register Esc key eventlistener
    function showModal(id) {
        jQuery(id).show();
        
        $(document).on('keyup', function (evt) {
            // Esc key event
            if (evt.keyCode == 27) {
                console.log("Closed by pressing escape key");       // Debug
                jQuery(id).hide();
                $(document).off('keyup');
            }
        });
    }

    // Store cookie (string), value (binary), expiry (days)
    function setCookie(cookiename, val) {
        var expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime()+(cookieExpiry*24*60*60*1000));
        expiryDate = expiryDate.toUTCString();
        console.log("Cookie set, expires: " + expiryDate);            // Debug
        document.cookie = cookiename + " = " + val + "; expires = " + expiryDate;
    }

    // Retrieve cookie if set
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Check for existing cookie by name (global)
    function checkCookie(cookiename) {
        var cookie = getCookie(cookiename);
        if (cookie != "") {
            console.log("Cookie: " + cookie);
        } else {
            showModal(modalID);
        }
    }
    
    // Temp: Delete cookie for easier testing
    jQuery("#testDeleteCookie").click(function() {
        console.log("Cookie deleted.");
        document.cookie = "aopa_pic =; Max-Age=-99999999;";
        jQuery("#testDeleteCookie").html("Cookie deleted").addClass("cookieDeleted");
    });

    checkCookie(cookieName);

});