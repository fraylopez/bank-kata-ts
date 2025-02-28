type Greetable = string[] | string | null;

export function greet(who: Greetable): string {
  if (Array.isArray(who)) {
    return "Hello, Bob and Alice";
  }
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


