type Greetable = string[] | string | null;

const greeters = [
  {
    is: (who: Greetable) => isEscaped(who),
    greet: (who: Greetable) => handleEscaped(who as string[])
  },
  {
    is: (who: Greetable) => isComposed(who),
    greet: (who: Greetable) => handleComposed(who as string[])
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
  const normal = who.filter(w => !isShouting(w));

  const greetNormal = handleManyNormal(normal);
  if (shouting.length === 0) {
    return greetNormal;
  }
  const greetShouting = shouting.map(handleShouting).join(' AND ');
  return `${greetNormal} AND ${greetShouting}`;
}

function handleManyNormal(who: string[]): string {
  if (who.length === 1) {
    return handleNormal(who[0]);
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
  return Array.isArray(who) && who.some(w => w.includes(','));
}

function handleComposed(who: string[]): string {
  const decomposed = who.reduce((acc: string[], w: string) => {
    if (w.includes(',')) {
      return [...acc, ...w.split(',').map(w => w.trim())];
    }
    return [...acc, w];
  }, []);
  return handleArray(decomposed);
}

function isEscaped(who: Greetable): boolean {
  return Array.isArray(who) && who.some(w => w.startsWith('"') && w.endsWith('"'));
}

function handleEscaped(who: string[]): string {
  return `Hello, ${(who.map(unescape)).join(', ')}.`;
}

function unescape(who: string): string {
  return who.replace(/^"|"$/g, '').replace(',', ' and');
}