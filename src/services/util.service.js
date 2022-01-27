import { boardService } from "./board.service";

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    getRandomColor,
    formatPrice,
    formatDate,
    groupColorPicker,
    getGroupColors,
    createStory,
    createEmptyGroup,
    createEmptyBoard,
    createFirstBoard

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

function groupColorPicker(colorIdx = getRandomIntInclusive(0, 17)) {
    const colors = ['#037c4a', '#00c875', '#9cd326', '#cab641', '#784bd1', '#a25ddc', '#0086c0', '#579bfc', '#66ccff', '#bb3354', '#e2445c', '#ff158a', '#ff5ac4', '#ff642e', '#fdab3d', '#7f5347', '#c4c4c4', '#808080'];
    return colors[colorIdx];
}

function getGroupColors() {
    return ['#037c4a', '#00c875', '#9cd326', '#cab641', '#784bd1', '#a25ddc', '#0086c0', '#579bfc', '#66ccff', '#bb3354', '#e2445c', '#ff158a', '#ff5ac4', '#ff642e', '#fdab3d', '#7f5347', '#c4c4c4', '#808080'];
}


function createStory(title = 'New Story') {
    const story = {
        id: makeId(),
        title,
        createdAt: Date.now(),
        createdBy: { // need to change this to loggedinUser function
            _id: "u101",
            fullname: "Tal Tarablus",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Stoned_Fox.jpg/1200px-Stoned_Fox.jpg"
        },
        comments: [],
        storyData: {
            members: [],
            priority: {
                id: "p104",
                title: "",
                color: "#c4c4c4"
            },
            status: {
                id: "s105",
                title: "To do",
                color: "#c4c4c4"
            },
            timeline: [null, null],
            link: { name: null, url: null },
            dueDate: null,
            file: null
        }
    }

    return story;
}

function createEmptyGroup(title = 'New Group') {
    const group = {
        id: makeId(),
        title,
        style: { backgroundColor: groupColorPicker() },
        stories: [],
    };

    return group;
}

function createEmptyBoard(title = 'New Board') {
    const board = {
        title,
        createdAt: 1589983468418,
        sortBy: { name: null, order: -1 },
        filterBy: {},
        createdBy: {
            _id: "u101",
            fullname: "Abi Abambi",
            imgUrl: "http://some-img"
        },
        style: {},
        statuses: [
            {
                id: "s101",
                title: "Done",
                color: "#00c875"
            },
            {
                id: "s102",
                title: "Ready for review",
                color: "#a25ddc"
            },
            {
                id: "s103",
                title: "Working on it",
                color: "#fdab3d"
            },
            {
                id: "s104",
                title: "Stuck",
                color: "#e2445c"
            },
            {
                id: "s105",
                title: "To do",
                color: "#c4c4c4"
            },
        ],
        priorities: [
            {
                id: "p101",
                title: "High",
                color: "#bb3354"
            },
            {
                id: "p102",
                title: "Medium",
                color: "#cab641"
            },
            {
                id: "p103",
                title: "Low",
                color: "#66ccff"
            },
            {
                id: "p104",
                title: "",
                color: "#c4c4c4"
            },

        ],
        members: [],
        groups: [
            createEmptyGroup(),
            createEmptyGroup()
        ],
        activities: [],
        cmpsOrder: [
            "status-picker",
            "member-picker",
            "priority-picker",
            'timeline-picker',
            'number-picker',
            'link-picker'
        ]
    }
    return board
}


function createFirstBoard() {
    let newBoard = createEmptyBoard()
    newBoard = {
        ...newBoard, members: [
            {
                _id: "u102",
                fullname: "Tal Tarablus",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Stoned_Fox.jpg/1200px-Stoned_Fox.jpg"
            },
            {
                _id: "u103",
                fullname: "Amitai Schapiro",
                imgUrl: "https://ca.slack-edge.com/T02BJ4W8H45-U02FR69PJG2-b5be0246d951-72"
            },
            {
                _id: "u104",
                fullname: "Omri Steinberg",
                imgUrl: "https://ca.slack-edge.com/T02BJ4W8H45-U02G1DTRWS3-d194bd058b90-512"
            },
            {
                _id: "u105",
                fullname: "Yarden Levy",
                imgUrl: "https://ca.slack-edge.com/T02BJ4W8H45-U02LCCZFQ8G-b2dbb5f8311a-512"
            },
        ]
    }
    boardService.addBoard(newBoard)
}

