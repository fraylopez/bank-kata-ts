type Greetable = string[] | string | null;

export function greet(who: Greetable): string {
  if (isArray(who)) {
    return handleArray(who as string[]);
  }
  if (who === null) {
    return "Hello, my friend.";
  }
  if (isShouting(who as string)) {
    return `HELLO, ${who}!`;
  }

  return `Hello, ${who}.`;
}

function isArray(who: Greetable): boolean {
  return Array.isArray(who);
}

function handleArray(who: string[]): string {
  return `Hello, ${who.slice(0, -1).join(", ")} and ${who.slice(-1)}`;
}

function isShouting(who: string): boolean {
  return who === who.toUpperCase();
}