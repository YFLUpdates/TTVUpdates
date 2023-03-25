export default function waitforme(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}