const Prices = function (name) {
    let price;
    switch (name) {
      case "coffe":
        price = 2500;
        break;
      case "diamonds":
        price = 20000;
        break;
      case "dice":
        price = 50000;
        break;
      case "kiss":
        price = 7500;
        break;
      case "koniczynka":
        price = 5000;
        break;
      case "rose":
        price = 1000;
        break;
      case "szampan":
        price = 10000;
        break;
      case "lean":
        price = 100000;
        break;
      case "ziolo":
        price = 110000;
        break;
      case "duck":
        price = 30000;
        break;
      default:
        price = 10000000000;
    }
    return price;
  };
  export default Prices;