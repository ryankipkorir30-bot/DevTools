/* =========================================
   DEVTOOLS - MAIN APPLICATION
========================================= */

const workspace = document.getElementById("workspace");
const toolTitle = document.getElementById("toolTitle");
const toolContent = document.getElementById("toolContent");


/* =========================================
   OPEN TOOL
========================================= */

function openTool(tool) {

    workspace.classList.add("active");

    switch (tool) {
        case "face":
    showFaceScanner();
    break;

        case "json":
            showJSONFormatter();
            break;

        case "base64":
            showBase64Tool();
            break;

        case "uuid":
            showUUIDTool();
            break;

        case "password":
            showPasswordTool();
            break;

        case "url":
            showURLTool();
            break;
            case "color":
    showColorTool();
    break;

        case "timestamp":
            showTimestampTool();
            break;
          case "qr":
    showQRTool();
    break;  

        default:
            toolTitle.textContent = "Unknown Tool";
            toolContent.innerHTML = `
                <p>Tool not found.</p>
            `;
    }

    workspace.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================
   CLOSE TOOL
========================================= */

function closeTool() {

    workspace.classList.remove("active");

    toolTitle.textContent = "Developer Tool";

    toolContent.innerHTML = "";
}


/* =========================================
   JSON FORMATTER
========================================= */

function showJSONFormatter() {

    toolTitle.textContent = "JSON Formatter";

    toolContent.innerHTML = `

        <p style="margin-bottom:15px;color:#8fa3b5;">
            Format and validate JSON instantly.
        </p>

        <textarea
            id="jsonInput"
            placeholder='Paste JSON here...
Example:
{"name":"Ryan","age":20}'
        ></textarea>

        <button
            class="tool-button"
            onclick="formatJSON()">
            Format JSON
        </button>

        <button
            class="tool-button secondary-button"
            onclick="minifyJSON()">
            Minify
        </button>

        <button
            class="tool-button secondary-button"
            onclick="clearJSON()">
            Clear
        </button>

        <div
            id="jsonOutput"
            class="output">
            Output will appear here.
        </div>
    `;
}


function formatJSON() {

    const input =
        document.getElementById("jsonInput").value;

    const output =
        document.getElementById("jsonOutput");

    try {

        const parsed = JSON.parse(input);

        output.textContent =
            JSON.stringify(parsed, null, 4);

    } catch (error) {

        output.textContent =
            "❌ Invalid JSON\n\n" +
            error.message;
    }
}


function minifyJSON() {

    const input =
        document.getElementById("jsonInput").value;

    const output =
        document.getElementById("jsonOutput");

    try {

        const parsed = JSON.parse(input);

        output.textContent =
            JSON.stringify(parsed);

    } catch (error) {

        output.textContent =
            "❌ Invalid JSON\n\n" +
            error.message;
    }
}


function clearJSON() {

    document.getElementById("jsonInput").value = "";

    document.getElementById("jsonOutput").textContent =
        "Output will appear here.";
}


/* =========================================
   BASE64
========================================= */

function showBase64Tool() {

    toolTitle.textContent = "Base64 Encoder / Decoder";

    toolContent.innerHTML = `

        <p style="margin-bottom:15px;color:#8fa3b5;">
            Encode text into Base64 or decode Base64 back to text.
        </p>

        <textarea
            id="base64Input"
            placeholder="Enter text or Base64..."
        ></textarea>

        <button
            class="tool-button"
            onclick="encodeBase64()">
            Encode
        </button>

        <button
            class="tool-button secondary-button"
            onclick="decodeBase64()">
            Decode
        </button>

        <button
            class="tool-button secondary-button"
            onclick="copyBase64()">
            Copy Result
        </button>

        <div
            id="base64Output"
            class="output">
            Result will appear here.
        </div>
    `;
}


function encodeBase64() {

    const input =
        document.getElementById("base64Input").value;

    const output =
        document.getElementById("base64Output");

    try {

        output.textContent =
            btoa(
                unescape(
                    encodeURIComponent(input)
                )
            );

    } catch (error) {

        output.textContent =
            "Encoding failed.";
    }
}


function decodeBase64() {

    const input =
        document.getElementById("base64Input").value;

    const output =
        document.getElementById("base64Output");

    try {

        output.textContent =
            decodeURIComponent(
                escape(
                    atob(input)
                )
            );

    } catch (error) {

        output.textContent =
            "❌ Invalid Base64.";
    }
}


async function copyBase64() {

    const output =
        document.getElementById("base64Output");

    try {

        await navigator.clipboard.writeText(
            output.textContent
        );

        alert("Copied!");

    } catch {

        alert("Copy failed.");
    }
}


/* =========================================
   UUID GENERATOR
========================================= */

function showUUIDTool() {

    toolTitle.textContent = "UUID Generator";

    toolContent.innerHTML = `

        <p style="margin-bottom:15px;color:#8fa3b5;">
            Generate random UUID version 4 identifiers.
        </p>

        <button
            class="tool-button"
            onclick="generateUUID()">
            Generate UUID
        </button>

        <button
            class="tool-button secondary-button"
            onclick="copyUUID()">
            Copy
        </button>

        <div
            id="uuidOutput"
            class="output">
            Click Generate UUID.
        </div>
    `;
}


function generateUUID() {

    const output =
        document.getElementById("uuidOutput");

    if (crypto.randomUUID) {

        output.textContent =
            crypto.randomUUID();

    } else {

        output.textContent =
            "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
                .replace(/[xy]/g, function(c) {

                    const r =
                        Math.random() * 16 | 0;

                    const v =
                        c === "x"
                            ? r
                            : (r & 0x3 | 0x8);

                    return v.toString(16);
                });
    }
}


async function copyUUID() {

    const value =
        document.getElementById("uuidOutput").textContent;

    try {

        await navigator.clipboard.writeText(value);

        alert("UUID copied!");

    } catch {

        alert("Copy failed.");
    }
}


/* =========================================
   PASSWORD GENERATOR
========================================= */

function showPasswordTool() {

    toolTitle.textContent = "Password Generator";

    toolContent.innerHTML = `

        <p style="margin-bottom:15px;color:#8fa3b5;">
            Generate a random password.
        </p>

        <label>
            Password Length
        </label>

        <input
            type="number"
            id="passwordLength"
            value="16"
            min="4"
            max="128"
        >

        <label>
            Character Options
        </label>

        <div style="margin-bottom:20px;line-height:2;">

            <label>
                <input
                    type="checkbox"
                    id="includeUppercase"
                    checked
                    style="width:auto;">
                Uppercase
            </label>

            <br>

            <label>
                <input
                    type="checkbox"
                    id="includeNumbers"
                    checked
                    style="width:auto;">
                Numbers
            </label>

            <br>

            <label>
                <input
                    type="checkbox"
                    id="includeSymbols"
                    checked
                    style="width:auto;">
                Symbols
            </label>

        </div>

        <button
            class="tool-button"
            onclick="generatePassword()">
            Generate Password
        </button>

        <button
            class="tool-button secondary-button"
            onclick="copyPassword()">
            Copy
        </button>

        <div
            id="passwordOutput"
            class="output">
            Your password will appear here.
        </div>
    `;
}


function generatePassword() {

    const length =
        parseInt(
            document.getElementById("passwordLength").value
        );

    const uppercase =
        document.getElementById("includeUppercase").checked;

    const numbers =
        document.getElementById("includeNumbers").checked;

    const symbols =
        document.getElementById("includeSymbols").checked;

    let characters =
        "abcdefghijklmnopqrstuvwxyz";

    if (uppercase) {

        characters +=
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (numbers) {

        characters +=
            "0123456789";
    }

    if (symbols) {

        characters +=
            "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        password +=
            characters[randomIndex];
    }

    document.getElementById(
        "passwordOutput"
    ).textContent = password;
}


async function copyPassword() {

    const password =
        document.getElementById(
            "passwordOutput"
        ).textContent;

    try {

        await navigator.clipboard.writeText(password);

        alert("Password copied!");

    } catch {

        alert("Copy failed.");
    }
}


/* =========================================
   URL ENCODER / DECODER
========================================= */

function showURLTool() {

    toolTitle.textContent = "URL Encoder / Decoder";

    toolContent.innerHTML = `

        <p style="margin-bottom:15px;color:#8fa3b5;">
            Encode URLs for safe transmission or decode them.
        </p>

        <textarea
            id="urlInput"
            placeholder="https://example.com/search?q=hello world"
        ></textarea>

        <button
            class="tool-button"
            onclick="encodeURL()">
            Encode URL
        </button>

        <button
            class="tool-button secondary-button"
            onclick="decodeURL()">
            Decode URL
        </button>

        <div
            id="urlOutput"
            class="output">
            Result will appear here.
        </div>
    `;
}


function encodeURL() {

    const input =
        document.getElementById("urlInput").value;

    document.getElementById(
        "urlOutput"
    ).textContent =
        encodeURIComponent(input);
}


function decodeURL() {

    const input =
        document.getElementById("urlInput").value;

    try {

        document.getElementById(
            "urlOutput"
        ).textContent =
            decodeURIComponent(input);

    } catch {

        document.getElementById(
            "urlOutput"
        ).textContent =
            "❌ Invalid encoded URL.";
    }
}


/* =========================================
   TIMESTAMP CONVERTER
========================================= */

function showTimestampTool() {

    toolTitle.textContent = "Timestamp Converter";

    toolContent.innerHTML = `

        <p style="margin-bottom:15px;color:#8fa3b5;">
            Convert Unix timestamps into readable dates.
        </p>

        <input
            type="number"
            id="timestampInput"
            placeholder="Example: 1758979200"
        >

        <button
            class="tool-button"
            onclick="timestampToDate()">
            Convert Timestamp
        </button>

        <button
            class="tool-button secondary-button"
            onclick="currentTimestamp()">
            Current Timestamp
        </button>

        <div
            id="timestampOutput"
            class="output">
            Result will appear here.
        </div>
    `;
}


function timestampToDate() {

    const value =
        document.getElementById(
            "timestampInput"
        ).value;

    const timestamp =
        Number(value);

    if (!value || Number.isNaN(timestamp)) {

        document.getElementById(
            "timestampOutput"
        ).textContent =
            "❌ Enter a valid timestamp.";

        return;
    }

    const milliseconds =
        timestamp < 100000000000
            ? timestamp * 1000
            : timestamp;

    const date =
        new Date(milliseconds);

    document.getElementById(
        "timestampOutput"
    ).textContent =
        date.toString();
}


function currentTimestamp() {

    const timestamp =
        Math.floor(
            Date.now() / 1000
        );

    document.getElementById(
        "timestampInput"
    ).value = timestamp;

    document.getElementById(
        "timestampOutput"
    ).textContent =
        new Date().toString();
}


/* =========================================
   THEME
========================================= */

function toggleTheme() {

    document.body.classList.toggle("light");

    const button =
        document.getElementById("themeButton");

    if (
        document.body.classList.contains("light")
    ) {

        button.textContent = "🌙";

    } else {

        button.textContent = "☀️";
    }
}


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const themeButton =
            document.getElementById("themeButton");

        if (themeButton) {

            themeButton.addEventListener(
                "click",
                toggleTheme
            );
        }

    }
);
/* =========================================
   TOOL SEARCH
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("toolSearch");

    const toolCards =
        document.querySelectorAll(".tool-card");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();

        let visibleTools = 0;

        toolCards.forEach(card => {

            const toolName =
                (
                    card.dataset.toolName ||
                    card.textContent
                ).toLowerCase();

            if (toolName.includes(searchTerm)) {

                card.style.display = "";

                visibleTools++;

            } else {

                card.style.display = "none";
            }
        });

        let noResults =
            document.getElementById("noToolResults");

        if (visibleTools === 0) {

            if (!noResults) {

                noResults =
                    document.createElement("div");

                noResults.id =
                    "noToolResults";

                noResults.className =
                    "no-results";

                noResults.textContent =
                    "🔎 No developer tools found.";

                document
                    .querySelector(".tools-grid")
                    .appendChild(noResults);
            }

        } else {

            if (noResults) {
                noResults.remove();
            }
        }
    });
});
/* =========================================
   COMMAND PALETTE
========================================= */

const commandPalette =
    document.getElementById("commandPalette");

const commandSearch =
    document.getElementById("commandSearch");

const commandResults =
    document.getElementById("commandResults");

const closeCommandPalette =
    document.getElementById("closeCommandPalette");


/* OPEN */

function openCommandPalette() {

    if (!commandPalette) return;

    commandPalette.classList.add("active");

    commandSearch.value = "";

    filterCommandTools();

    setTimeout(() => {
        commandSearch.focus();
    }, 50);
}


/* CLOSE */

function closePalette() {

    if (!commandPalette) return;

    commandPalette.classList.remove("active");
}


/* SEARCH */

function filterCommandTools() {

    const items =
        document.querySelectorAll(
            ".command-item"
        );

    const search =
        commandSearch.value
            .toLowerCase()
            .trim();

    let visible = 0;

    items.forEach(item => {

        const name =
            item.dataset.name
                .toLowerCase();

        if (name.includes(search)) {

            item.style.display = "flex";

            visible++;

        } else {

            item.style.display = "none";
        }
    });

    let empty =
        document.querySelector(
            ".command-empty"
        );

    if (visible === 0) {

        if (!empty) {

            empty =
                document.createElement("div");

            empty.className =
                "command-empty";

            empty.textContent =
                "No tools found.";

            commandResults.appendChild(empty);
        }

    } else {

        if (empty) {
            empty.remove();
        }
    }
}


/* TOOL CLICK */

document
    .querySelectorAll(".command-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const tool =
                    item.dataset.tool;

                closePalette();

                openTool(tool);
            }
        );

    });


/* SEARCH EVENT */

if (commandSearch) {

    commandSearch.addEventListener(
        "input",
        filterCommandTools
    );
}


/* CLOSE BUTTON */

if (closeCommandPalette) {

    closeCommandPalette.addEventListener(
        "click",
        closePalette
    );
}


/* CLICK OUTSIDE */

if (commandPalette) {

    commandPalette.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                commandPalette
            ) {

                closePalette();
            }
        }
    );
}


/* KEYBOARD SHORTCUTS */

document.addEventListener(
    "keydown",
    event => {

        /* CTRL + K */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommandPalette();
        }


        /* ESC */

        if (event.key === "Escape") {

            closePalette();
        }

    }
);
function showQRTool() {

    toolTitle.textContent = "QR Code Generator";

    toolContent.innerHTML = `
        <p style="margin-bottom:15px;color:#8fa3b5;">
            Generate a QR code from text, URLs or other information.
        </p>

        <textarea
            id="qrInput"
            placeholder="Enter text or URL..."
        ></textarea>

        <button
            class="tool-button"
            onclick="generateQRCode()"
        >
            Generate QR Code
        </button>

        <button
            class="tool-button secondary-button"
            onclick="clearQRCode()"
        >
            Clear
        </button>

        <div
            id="qrOutput"
            class="output"
            style="
                min-height:220px;
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
                gap:15px;
            "
        >
            QR code will appear here.
        </div>
    `;
}


function generateQRCode() {

    const input =
        document.getElementById("qrInput").value.trim();

    const output =
        document.getElementById("qrOutput");

    if (!input) {

        output.textContent =
            "❌ Enter text or a URL first.";

        return;
    }


    const qrURL =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
        encodeURIComponent(input);


    output.innerHTML = `
        <img
            src="${qrURL}"
            alt="Generated QR Code"
            width="250"
            height="250"
            style="
                max-width:100%;
                border-radius:10px;
                background:white;
                padding:10px;
            "
        >

        <button
            class="tool-button"
            onclick="downloadQRCode()"
        >
            Download QR Code
        </button>
    `;
}


function downloadQRCode() {

    const input =
        document.getElementById("qrInput").value.trim();

    if (!input) return;


    const qrURL =
        "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" +
        encodeURIComponent(input);


    const link =
        document.createElement("a");

    link.href = qrURL;
    link.download = "devtools-qrcode.png";

    document.body.appendChild(link);

    link.click();

    link.remove();
}


function clearQRCode() {

    const input =
        document.getElementById("qrInput");

    const output =
        document.getElementById("qrOutput");

    if (input) {
        input.value = "";
    }

    if (output) {
        output.textContent =
            "QR code will appear here.";
    }
}
function showColorTool() {

    toolTitle.textContent = "Color Converter";

    toolContent.innerHTML = `
        <p style="margin-bottom:15px;color:#8fa3b5;">
            Convert colors between HEX, RGB and HSL formats.
        </p>

        <div
            style="
                display:flex;
                gap:15px;
                align-items:center;
                margin-bottom:20px;
                flex-wrap:wrap;
            "
        >

            <input
                type="color"
                id="colorPicker"
                value="#00e5ff"
                style="
                    width:70px;
                    height:55px;
                    padding:4px;
                    cursor:pointer;
                "
            >

            <div>
                <strong>Pick a color</strong>
                <p
                    id="colorPreviewText"
                    style="
                        margin-top:5px;
                        color:#8fa3b5;
                    "
                >
                    #00e5ff
                </p>
            </div>

        </div>

        <label>HEX</label>

        <input
            type="text"
            id="hexColor"
            value="#00e5ff"
            placeholder="#00e5ff"
        >

        <label>RGB</label>

        <input
            type="text"
            id="rgbColor"
            value="rgb(0, 229, 255)"
            placeholder="rgb(0, 229, 255)"
        >

        <label>HSL</label>

        <input
            type="text"
            id="hslColor"
            value="hsl(186, 100%, 50%)"
            placeholder="hsl(186, 100%, 50%)"
        >

        <button
            class="tool-button"
            onclick="convertColor()"
        >
            Convert Color
        </button>

        <button
            class="tool-button secondary-button"
            onclick="copyColorValues()"
        >
            Copy Values
        </button>

        <div
            id="colorPreview"
            style="
                height:120px;
                margin-top:20px;
                border-radius:12px;
                background:#00e5ff;
                border:1px solid rgba(255,255,255,0.15);
                display:flex;
                align-items:center;
                justify-content:center;
                color:#001014;
                font-weight:bold;
            "
        >
            #00e5ff
        </div>

        <div
            id="colorMessage"
            class="output"
            style="margin-top:15px;"
        >
            Enter a color and click Convert Color.
        </div>
    `;

    const picker =
        document.getElementById("colorPicker");

    picker.addEventListener("input", () => {

        const hex = picker.value;

        document.getElementById("hexColor").value = hex;

        updateColorPreview(hex);

        convertColor();

    });
}


function hexToRgb(hex) {

    hex = hex.replace("#", "");

    if (hex.length === 3) {

        hex =
            hex[0] + hex[0] +
            hex[1] + hex[1] +
            hex[2] + hex[2];
    }

    if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
        return null;
    }

    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}


function rgbToHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h;
    let s;

    const l = (max + min) / 2;

    if (max === min) {

        h = 0;
        s = 0;

    } else {

        const difference = max - min;

        s =
            l > 0.5
                ? difference / (2 - max - min)
                : difference / (max + min);

        switch (max) {

            case r:
                h =
                    (g - b) /
                    difference +
                    (g < b ? 6 : 0);
                break;

            case g:
                h =
                    (b - r) /
                    difference +
                    2;
                break;

            case b:
                h =
                    (r - g) /
                    difference +
                    4;
                break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}


function convertColor() {

    const hexInput =
        document.getElementById("hexColor");

    const rgbOutput =
        document.getElementById("rgbColor");

    const hslOutput =
        document.getElementById("hslColor");

    const message =
        document.getElementById("colorMessage");

    const hex =
        hexInput.value.trim();

    const rgb =
        hexToRgb(hex);

    if (!rgb) {

        message.textContent =
            "❌ Invalid HEX color. Example: #00e5ff";

        return;
    }

    const hsl =
        rgbToHsl(
            rgb.r,
            rgb.g,
            rgb.b
        );

    const normalizedHex =
        "#" + hex.replace("#", "").toLowerCase();

    rgbOutput.value =
        `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    hslOutput.value =
        `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    hexInput.value =
        normalizedHex;

    updateColorPreview(normalizedHex);

    message.textContent =
        "✓ Color converted successfully.";
}


function updateColorPreview(hex) {

    const preview =
        document.getElementById("colorPreview");

    const text =
        document.getElementById("colorPreviewText");

    if (preview) {

        preview.style.background =
            hex;

        preview.textContent =
            hex;
    }

    if (text) {
        text.textContent =
            hex;
    }
}


async function copyColorValues() {

    const hex =
        document.getElementById("hexColor").value;

    const rgb =
        document.getElementById("rgbColor").value;

    const hsl =
        document.getElementById("hslColor").value;

    const values =
        `HEX: ${hex}\nRGB: ${rgb}\nHSL: ${hsl}`;

    try {

        await navigator.clipboard.writeText(values);

        document.getElementById("colorMessage").textContent =
            "✓ Color values copied to clipboard.";

    } catch {

        document.getElementById("colorMessage").textContent =
            "❌ Unable to copy color values.";

    }
}
let faceVideo = null;
let faceCanvas = null;
let faceStream = null;
let faceAnimation = null;

function showFaceScanner() {

    toolTitle.textContent = "Real-Time Face Scanner";

    toolContent.innerHTML = `
        <div class="face-scanner">

            <p style="
                margin-bottom:20px;
                color:#8fa3b5;
            ">
                Real-time face detection using your camera.
            </p>


            <div class="face-camera-container">

                <video
                    id="faceVideo"
                    autoplay
                    muted
                    playsinline
                ></video>

                <canvas
                    id="faceCanvas"
                ></canvas>


                <div class="face-grid"></div>

                <div class="face-scan-line"></div>


                <div class="face-corner top-left"></div>
                <div class="face-corner top-right"></div>
                <div class="face-corner bottom-left"></div>
                <div class="face-corner bottom-right"></div>


                <div class="face-live">

                    <span class="face-live-dot"></span>

                    LIVE FACE SCANNER

                </div>

            </div>


            <div class="face-stats">

                <div class="face-stat">

                    <span class="face-stat-label">
                        Faces
                    </span>

                    <span
                        id="faceCount"
                        class="face-stat-value"
                    >
                        0
                    </span>

                </div>


                <div class="face-stat">

                    <span class="face-stat-label">
                        Status
                    </span>

                    <span
                        id="faceDetectionStatus"
                        class="face-stat-value"
                    >
                        OFF
                    </span>

                </div>


                <div class="face-stat">

                    <span class="face-stat-label">
                        FPS
                    </span>

                    <span
                        id="faceFPS"
                        class="face-stat-value"
                    >
                        0
                    </span>

                </div>

            </div>


            <div
                id="faceStatus"
                class="output"
                style="margin-top:20px;"
            >
                Loading face detection model...
            </div>


            <button
                class="tool-button"
                id="startFaceButton"
                onclick="startFaceScanner()"
            >
                Start Camera
            </button>


            <button
                class="tool-button secondary-button"
                onclick="stopFaceScanner()"
            >
                Stop Camera
            </button>

        </div>
    `;

    loadFaceModels();
}



async function loadFaceModels() {

    const status =
        document.getElementById("faceStatus");

    if (!status) return;

    status.textContent =
        "Loading face detection model...";

    try {

        const MODEL_URL =
            "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";

        await faceapi.nets.tinyFaceDetector.loadFromUri(
            MODEL_URL
        );

        status.textContent =
            "✓ Face detection model ready. Click Start Camera.";

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Could not load the face detection model.";
    }
}


async function startFaceScanner() {

    const status =
        document.getElementById("faceStatus");

    faceVideo =
        document.getElementById("faceVideo");

    faceCanvas =
        document.getElementById("faceCanvas");

    if (!faceVideo || !faceCanvas) return;

    try {

        if (!navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia) {

            status.textContent =
                "❌ Your browser does not support camera access.";

            return;
        }

        faceStream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user",
                    width: {
                        ideal: 1280
                    },
                    height: {
                        ideal: 720
                    }
                },
                audio: false
            });

        faceVideo.srcObject =
            faceStream;

        await faceVideo.play();

        faceCanvas.width =
            faceVideo.videoWidth;

        faceCanvas.height =
            faceVideo.videoHeight;

        status.textContent =
            "🟢 Camera active — scanning for faces...";

        scanFaces();

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Camera access denied or unavailable.";

    }
}


async function scanFaces() {

    if (!faceVideo ||
        faceVideo.readyState < 2) {

        faceAnimation =
            requestAnimationFrame(scanFaces);

        return;
    }

    try {

        const detections =
            await faceapi.detectAllFaces(
                faceVideo,
                new faceapi.TinyFaceDetectorOptions({
                    inputSize: 320,
                    scoreThreshold: 0.5
                })
            );

        const displaySize = {
            width: faceVideo.videoWidth,
            height: faceVideo.videoHeight
        };

        faceapi.matchDimensions(
            faceCanvas,
            displaySize
        );

        const resized =
            faceapi.resizeResults(
                detections,
                displaySize
            );

        const context =
            faceCanvas.getContext("2d");

        context.clearRect(
            0,
            0,
            faceCanvas.width,
            faceCanvas.height
        );

        resized.forEach(detection => {

            const box =
                detection.box;

            context.strokeStyle =
                "#00e5ff";

            context.lineWidth =
                3;

            context.strokeRect(
                box.x,
                box.y,
                box.width,
                box.height
            );

            context.fillStyle =
                "#00e5ff";

            context.font =
                "16px Arial";

            context.fillText(
                "FACE DETECTED",
                box.x,
                Math.max(20, box.y - 8)
            );

        });

        const count =
            detections.length;
           faceFrameCount++;

const now = performance.now();

if (now - faceLastFPSUpdate >= 1000) {

    faceFPS = faceFrameCount;

    faceFrameCount = 0;

    faceLastFPSUpdate = now;

    const fpsElement =
        document.getElementById("faceFPS");

    if (fpsElement) {
        fpsElement.textContent =
            faceFPS;
    }
} 

        const status =
            document.getElementById("faceStatus");

        if (status) {

            status.textContent =
                count === 0
                    ? "🔎 Scanning... No face detected."
                    : `🟢 ${count} face${count === 1 ? "" : "s"} detected.`;
        }

    } catch (error) {

        console.error(
            "Face detection error:",
            error
        );
    }

    faceAnimation =
        requestAnimationFrame(scanFaces);
}


function stopFaceScanner() {

    if (faceAnimation) {

        cancelAnimationFrame(
            faceAnimation
        );

        faceAnimation = null;
    }

    if (faceStream) {

        faceStream
            .getTracks()
            .forEach(track => track.stop());

        faceStream = null;
    }

    if (faceVideo) {

        faceVideo.srcObject =
            null;
    }

    if (faceCanvas) {

        const context =
            faceCanvas.getContext("2d");

        context.clearRect(
            0,
            0,
            faceCanvas.width,
            faceCanvas.height
        );
    }

    const status =
        document.getElementById("faceStatus");

    if (status) {

        status.textContent =
            "Camera stopped.";
    }
}