export default function cooldownsList(amount) {
    if(amount > 200){
        return 2000;
    }

    return 1000;
}