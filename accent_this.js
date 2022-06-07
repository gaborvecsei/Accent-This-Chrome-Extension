function changeTheText() {
    // Define the character mappings
    const CHARS = {
        "a'": "á",
        "e'": "é",
        "i'": "í",
        "o'": "ó",
        "o~": "ö",
        'o"': "ő",
        "u'": "ú",
        "u~": "ü",
        'u"': "ű",
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

    var textElement = document.activeElement;

    // if active element is an input or a text area then execute the transformation
    if (textElement.tagName === "INPUT" || textElement.tagName === "TEXTAREA") {
        textElement.value = transform_text_to_accent_chars(textElement.value);
    }
    // if active element is a div and has value (e.g.: Youtube comments, Gmail body)
    else if (textElement.tagName == "DIV" && textElement.textContent != null) {
        textElement.textContent = transform_text_to_accent_chars(
            textElement.textContent
        );
    } else {
        console.error(
            "[ACCENT THIS extension] Extension only works on input and textarea elements - they need to be in focus. Instead we found this:",
            textElement
        );
    }
}

chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: changeTheText,
        });
    }
});
