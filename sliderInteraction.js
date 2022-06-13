d3.select('#theta').on('input', () => {
    let value = d3.select('#theta').property('value');
});
d3.select('#phi').on('input', () => {
    let value = d3.select('#phi').property('value');
});
d3.select('#L').on('input', () => {
    let value = d3.select('#L').property('value');
});
d3.select('#R').on('input', () => {
    let value = d3.select('#R').property('value');
    gyroscope.changeRadius(value);
});
d3.select('#omega').on('input', () => {
    let value = d3.select('#omega').property('value');
    gyroscope.changeOmega(value);
});