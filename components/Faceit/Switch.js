export default function faceitSwitch(channel) {
    let name;
    switch (channel) {
      case 'adrian1g__':
        name = "1gLOTTA";
        break;
      case 'wodoglowie':
        name = "ForeverPL";
        break;
      default:
        name = "1gLOTTA";
    }
    return name;
}