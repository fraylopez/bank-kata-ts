type Greetable = string[] | string | null;

export function greet(who: Greetable): string {
  if (isComposed(who)) {
    return greet(decompose(who as string | string[]));
  }
  if (isArray(who)) {
    return handleArray(who as string[]);
  }
  if (isNull(who)) {
    return handleNull();
  }
  if (isShouting(who as string)) {
    return handleShouting(who as string);
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
  const shouting = who.filter(w => isShouting(w));
  if (shouting.length > 0) {
    const normal = who.filter(w => !isShouting(w));
    if (normal.length > 1 && shouting.length === 1) {
      return `${handleArray(normal)} AND ${handleShouting(shouting[0]!)}`;
    }
    return `${handleNormal(normal[0]!)} AND ${handleShouting(shouting[0]!)}`;
  }
  return `Hello, ${who.slice(0, -1).join(", ")} and ${who.slice(-1)}.`;
}

function isShouting(who: string): boolean {
  return who === who.toUpperCase();
}

function handleShouting(who: string): string {
  return `HELLO ${who}!`;
}

function handleNormal(who: string): string {
  return `Hello, ${who}.`;
}
function isComposed(who: Greetable): boolean {
  return typeof who === 'string' && who.includes(',') ||
    Array.isArray(who) && who.some(w => w.includes(','));
}

function decompose(who: string | string[]): string[] {
  if (typeof who === 'string') {
    return who.split(',').map(w => w.trim());
  }
  return who.reduce((acc: string[], w: string) => {
    if (w.includes(',')) {
      return [...acc, ...w.split(',').map(w => w.trim())];
    }
    return [...acc, w];
  }, []);
}
