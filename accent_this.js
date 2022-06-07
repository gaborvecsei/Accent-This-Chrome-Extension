function changeTheText() {
    // Define the character mappings
    const CHARS = {
        "'a": "á",
        "'e": "é",
        "'i": "í",
        "'o": "ó",
        "~o": "ö",
        "\"o": "ő",
        "'u": "ú",
        "~u": "ü",
        "\"u": "ű"
    };

    // Add upercase chars as well
    for (var key in CHARS) {
        CHARS[key.toUpperCase()] = CHARS[key].toUpperCase();
    }

    // Function which changes the text
    function transform_text_to_accent_chars(text) {

        // Iterate over text and replace chars based on the mapping
        // TODO: performance measurement - should we use pointers instead of RegExp?
        for (var key in CHARS) {
            text = text.replace(new RegExp(key, "g"), CHARS[key]);
        }

        return text;
    }

    // if active element is an input or a text area then execute the transformation
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
        document.activeElement.value = transform_text_to_accent_chars(document.activeElement.value);
    } else {
        console.error("[ACCENT THIS extension] Extension only works on input and textarea elements - they need to be in focus");
    }
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: changeTheText
        });
    }
});
