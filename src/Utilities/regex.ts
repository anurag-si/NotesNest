export function ValidateEmail(userId: string) {
    console.log(userId,"userid")
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(userId);
}
