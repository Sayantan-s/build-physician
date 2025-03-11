export class Logger {
  private static formatMessage() {
    return `[Build-Physician]::`.yellow;
  }

  static info<T>(keyName: string, value?: T) {
    const keyString = `${Logger.formatMessage()} ${keyName}`.gray;
    if (value) {
      const valueString = `${value}`;
      return console.log(`${keyString}: ${valueString}`);
    }
    return console.log(keyString);
  }
}
