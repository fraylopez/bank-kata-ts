export function greet(who: string | null): string {
  if (who === null) {
    return "Hello, my friend.";
  }
  if (isShouting(who)) {
    return `HELLO, ${who}!`;
  }

  return `Hello, ${who}.`;
}

function isShouting(who: string): boolean {
  return who === who.toUpperCase();
}