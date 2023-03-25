export default function SubscriptionReward(name) {
    let points;
    switch (name) {
      case 'Prime':
        points = 1;
        break;
      case '1000':
        points = 1;
        break;
      case '2000':
        points = 2;
        break;
      case '3000':
        points = 3;
        break;
      default:
        points = 1;
    }
    return points;
}