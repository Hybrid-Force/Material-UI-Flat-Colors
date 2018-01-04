import * as flatColors from '../src';

const COLOR_PAIRS = [
    ['turquoise', 'greenSea'],
    ['emerald', 'nephritis'],
    ['peterRiver', 'belizeHole'],
    ['amethyst', 'wisteria'],
    ['wetAsphalt', 'midnightBlue'],
    ['sunFlower', 'orange'],
    ['carrot', 'pumpkin'],
    ['alizarin', 'pomegranate'],
    ['clouds', 'silver'],
    ['concrete', 'asbestos']
];
const PALETTE = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A400', 'A700'];
const COLOR_DARK = '#1d1d1d';
const COLOR_LIGHT = '#f0f0f0';

function convertHexToRGB(color) {
    if (color.length === 4) {
        let extendedColor = '#';
        for (let i = 1; i < color.length; i += 1) {
            extendedColor += color.charAt(i) + color.charAt(i);
        }
        color = extendedColor;
    }

    const values = {
        r: parseInt(color.substr(1, 2), 16),
        g: parseInt(color.substr(3, 2), 16),
        b: parseInt(color.substr(5, 2), 16),
    };

    return `rgb(${values.r}, ${values.g}, ${values.b})`;
}

function decomposeColor(color) {
    if (color.charAt(0) === '#') {
        return decomposeColor(convertHexToRGB(color));
    }

    const marker = color.indexOf('(');
    const type = color.substring(0, marker);
    let values = color.substring(marker + 1, color.length - 1).split(',');
    values = values.map(value => parseFloat(value));

    return { type, values };
}

function getLuminance(color) {
    const decomposedColor = decomposeColor(color);

    if (decomposedColor.type.indexOf('rgb') > -1) {
        const rgb = decomposedColor.values.map(val => {
            val /= 255; // normalized
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        // Truncate at 3 digits
        return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
    } else if (decomposedColor.type.indexOf('hsl') > -1) {
        return decomposedColor.values[2] / 100;
    }
}

function getContrastRatio(foreground, background) {
    const lumA = getLuminance(foreground);
    const lumB = getLuminance(background);
    const contrastRatio = (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);

    return Number(contrastRatio.toFixed(2)); // Truncate at two digits
}

function genColorShade(group, shade) {
    let bgColor = group[shade];
    let fgColor = COLOR_DARK;
    if (getContrastRatio(fgColor, bgColor) < 7) {
        fgColor = COLOR_LIGHT;
    }

    return `<div class="color-shade" style="color: ${fgColor}; background-color: ${bgColor}">
                <span class="color-shade-key">${shade}</span>
                <span class="color-shade-value">${bgColor}</span>
            </div>`;
}

function genColorGroup(name) {
    let group = flatColors[name];
    let bgColor = group[500];
    let fgColor = COLOR_DARK;
    if (getContrastRatio(fgColor, bgColor) < 7) {
        fgColor = COLOR_LIGHT;
    }

    let header = `<div style="color: ${fgColor}; background-color: ${bgColor}">
                      <div class="color-shade"><span>${name}</span></div>
                      <div class="color-shade">
                          <span class="color-shade-key">500</span>
                          <span class="color-shade-value">${group[500]}</span>
                      </div>
                  </div>`;

    let content = PALETTE
        .map(genColorShade.bind(null, group))
        .join('');
    return `<div class="color-group">${header}${content}</div>`;
}

function genContent() {
    let content = COLOR_PAIRS
        .map(pair => {
            let pairContent = pair
                .map(genColorGroup)
                .join('');
            return `<div class="color-pair">${pairContent}</div>`;
        })
        .join('');
    let contentEl = document.querySelector('.content');
    contentEl.innerHTML = content;
    console.log('here')
}

genContent();