export default function cooldownsList(name) {
    let seconds;
    switch (name) {
      case 'classic':
        seconds = 3000;
        break;
      case 'longer':
        seconds = 7000;
        break;
      case 'special':
        seconds = 15000;
        break;
      default:
        seconds = 4000;
    }
    return seconds;
}