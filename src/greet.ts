type Greetable = string[] | string | null;

const greeters = [
  {
    is: (who: Greetable) => isEscaped(who),
    greet: (who: Greetable) => handleEscaped(who as string | string[])
  },
  {
    is: (who: Greetable) => isComposed(who),
    greet: (who: Greetable) => handleComposed(who as string | string[])
  },
  {
    is: (who: Greetable) => isNull(who),
    greet: () => handleNull()
  },
  {
    is: (who: Greetable) => isArray(who),
    greet: (who: Greetable) => handleArray(who as string[])
  },
  {
    is: (who: Greetable) => isShouting(who as string),
    greet: (who: Greetable) => handleShouting(who as string)
  },
  {
    is: () => true,
    greet: (who: Greetable) => handleNormal(who as string)
  }
];

export function greet(who: Greetable): string {
  const greeter = greeters.find(h => h.is(who));
  if (!greeter) {
    throw new Error('No handler found');
  }
  return greeter.greet(who);
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

function handleComposed(who: string | string[]): string {
  let decomposed: string[];
  if (typeof who === 'string') {
    decomposed = who.split(',').map(w => w.trim());
  }
  else {
    decomposed = who.reduce((acc: string[], w: string) => {
      if (w.includes(',')) {
        return [...acc, ...w.split(',').map(w => w.trim())];
      }
      return [...acc, w];
    }, []);
  }
  return handleArray(decomposed);
}

function isEscaped(who: Greetable): boolean {
  return typeof who === 'string' && who.startsWith('"') && who.endsWith('"');
}

function handleEscaped(_who: string | string[]): string {
  throw `Not implemented`;
}