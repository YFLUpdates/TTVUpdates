export default function Truncate(input, number) {
    if (input.length > number) {
       return input.substring(0, number) + '...';
    }
    return input;
}