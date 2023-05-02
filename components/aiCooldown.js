export default function cooldownsList(amount) {
    if(amount >= 200){
        return 3500;
    }

    return 3000;
}