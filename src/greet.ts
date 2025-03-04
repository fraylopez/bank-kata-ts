type Greetable = string[] | string | null;

export function greet(who: Greetable): string {
  if (Array.isArray(who)) {
    return handleArray(who);
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


function handleArray(who: string[]): string {
  return `Hello, ${who.slice(0, -1).join(", ")} and ${who.slice(-1)}`;
}

