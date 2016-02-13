/* CHART CONFIGURATION */

var LINE_WIDTH = 3;
var CHART_ID = 'toneline';
var CHART;

var TIMELINES = []

var CONFIG = {
    grid: {
        strokeStyle: 'rgb(120, 119, 130)',
        fillStyle: 'rgb(151, 149, 163)',
        lineWidth: 1,
        millisPerLine: 500,
        verticalSections: 6,
    },
    labels: {
        fillStyle: 'rgb(60, 0, 0)'
    }
}

/* SENTIMENT CONIGURATION */

var sentiments = [{
    sentiment: 'anger',
    strokeStyle: 'rgb(221, 65, 49)',
    fillStyle: 'rgba(221, 65, 49, 0.0)',
    lineWidth: LINE_WIDTH
}, {
    sentiment: 'disgust',
    strokeStyle: 'rgb(1, 79, 131)',
    fillStyle: 'rgba(1, 79, 131, 0.0)',
    lineWidth: LINE_WIDTH
}, {
    sentiment: 'fear',
    strokeStyle: 'rgb(123, 194, 83)',
    fillStyle: 'rgba(123, 194, 83, 0.0)',
    lineWidth: LINE_WIDTH
}, {
    sentiment: 'joy',
    strokeStyle: 'rgb(249, 223, 60)',
    fillStyle: 'rgba(249, 223, 60, 0.0)',
    lineWidth: LINE_WIDTH
}, {
    sentiment: 'sadness',
    strokeStyle: 'rgb(144, 167, 207)',
    fillStyle: 'rgba(144, 167, 207, 0.0)',
    lineWidth: LINE_WIDTH
}]

function plotTone(tone) {
    var date = new Date().getTime()
    TIMELINES['anger'].append(date, tone.anger * 100);
    TIMELINES['disgust'].append(date, tone.disgust * 100);
    TIMELINES['fear'].append(date, tone.fear * 100);
    TIMELINES['joy'].append(date, tone.joy * 100);
    TIMELINES['sadness'].append(date, tone.sadness * 100);
}

/* JUST FOR TESTING */

function simulate() {

    var max = 100;
    var min = 0;

    setInterval(function () {

        var anger = Math.floor(Math.random() * (max - min + 1) + min) / 100;
        var joy = Math.floor(Math.random() * (max - anger - min + 1) + min) / 100;
        var disgust = Math.floor(Math.random() * (max - joy - anger - min + 1) + min) / 100;
        var fear = Math.floor(Math.random() * (max - joy - anger - disgust - min + 1) + min) / 100;
        var sadness = Math.floor(Math.random() * (max - joy - anger - fear - min + 1) + min) / 100;

        var tone = {
            anger: anger,
            disgust: disgust,
            fear: fear,
            joy: joy,
            sadness: sadness
        }

        plotTone(tone)

    }, 2000);
}

/* ADDS THE CANVAS AREA */

function addCanvas() {
    var container = document.getElementById('container');
    var anchor = document.getElementById('timeline');
    CHART = document.createElement('canvas')
    CHART.width = anchor.parentElement.offsetWidth;
    CHART.height = 200;
    CHART.id = CHART_ID
    anchor.appendChild(CHART);
}

/* ADD TIMELINE CHART */

function addLines(chart) {
    sentiments.forEach(function (item) {
        TIMELINES[item.sentiment] = new TimeSeries();
        chart.addTimeSeries(TIMELINES[item.sentiment], item);
    })
}

function startTimeLine() {
    addCanvas();
    var chart = new SmoothieChart(CONFIG);
    chart.streamTo(CHART);
    addLines(chart);
    simulate();
}

window.onload = function () {
    startTimeLine()
}