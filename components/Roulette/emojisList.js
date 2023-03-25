const emojisList = function(data) {
    let color;
    switch (data) {
      case "black":
        color = "⬛";
        break;
      case "red":
        color = "🟥";
        break;
      case "green":
        color = "🟩";
        break;
      case "blue":
        color = "🟦";
        break;
      case "orange":
        color = "🟧";
        break;
      default:
        color = "⬜";
    }
    return color
}
export default emojisList;