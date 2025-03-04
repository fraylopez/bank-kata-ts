type Greetable = string[] | string | null;

export function greet(who: Greetable): string {
  if (isArray(who)) {
    return handleArray(who as string[]);
  }
  if (isNull(who)) {
    return handleNull();
  }
  if (isShouting(who as string)) {
    return `HELLO, ${who}!`;
  }

  return `Hello, ${who}.`;
}

function isNull(who: Greetable): boolean {
  return who === null;
}

function handleNull(): string {
  return "Hello, my friend.";
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