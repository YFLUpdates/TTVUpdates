const Names = function (name) {
    let source;
    switch (name) {
      case "coffe":
        source = "Kawki";
        break;
      case "diamonds":
        source = "Diamenciki";
        break;
      case "dice":
        source = "Kosteczki";
        break;
      case "kiss":
        source = "Całusy";
        break;
      case "koniczynka":
        source = "Koniczynki";
        break;
      case "rose":
        source = "Różyczki";
        break;
      case "szampan":
        source = "Szampany";
        break;
      case "lean":
        source = "Lean";
        break;
      case "ziolo":
        source = "Ziółko";
        break;
      case "duck":
        source = "Kaczuszki";
        break;
      default:
        source = "nieznany";
    }
    return source;
  };
  export default Names;