class Utils {
  static validateEmail(userId: string) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(userId);
  }
}

export default Utils;
