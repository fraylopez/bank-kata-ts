export class Greeter {

  greet(who: string | null): string {
    if (who === null) {
      return "Hello, my friend.";
    }
    if (this.isShouting(who)) {
      return `HELLO, ${who}!`;
    }

    return `Hello, ${who}.`;
  }

  private isShouting(who: string): boolean {
    return who === who.toUpperCase();
  }
}