export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    getRandomColor,
    formatPrice,
    formatDate,
    groupColorPicker
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function formatPrice(price, currencyCode = 'ILS') {
    const priceFormatted = new Intl.NumberFormat(
        currencyCode, { style: 'currency', currency: currencyCode }).format(price)
    return priceFormatted
}

function formatDate(createdAt) {
    return new Date(createdAt).toLocaleDateString('he-IL') + ' ' +
        new Date(createdAt).toLocaleTimeString('he-IL')
}

function groupColorPicker(colorIdx = getRandomIntInclusive(0, 18)) {
    const colors = ['#037c4a', '#00c875', '#9cd326', '#cab641', '#784bd1', '#a25ddc', '#0086c0', '#579bfc', '#66ccff', '#bb3354', '#e2445c', '#ff158a', '#ff5ac4', '#ff642e', '#fdab3d', '#7f5347', '#c4c4c4', '#808080'];
    return colors[colorIdx];
}

// const grid = 6;
// const getItemStyle = (isDragging, draggableStyle) => {
//     return {
//         // some basic styles to make the items look a bit nicer
//         userSelect: "none",
//         padding: grid * 2,
//         margin: `0 0 ${grid}px 0`,
//         textAlign: "right",

//         // change background colour if dragging
//         background: isDragging ? "lightgreen" : "grey",

//         // styles we need to apply on draggables
//         ...draggableStyle
//     };
// };
