type Greetable = string[] | string | null;
type NonNullGreetable = string[] | string;


type Greeter = {
  is: (who: NonNullGreetable) => boolean;
  greet: (who: string & string[]) => string;
};
const greeters: Greeter[] = [
  {
    is: (who: NonNullGreetable) => isEscaped(who),
    greet: (who: string[]) => handleEscaped(who)
  },
  {
    is: (who: NonNullGreetable) => isComposed(who),
    greet: (who: string[]) => handleComposed(who)
  },
  {
    is: (who: NonNullGreetable) => isArray(who),
    greet: (who: string[]) => handleArray(who)
  },
  {
    is: (who: NonNullGreetable) => isShouting(who),
    greet: (who: string) => handleShouting(who)
  },
  {
    is: () => true,
    greet: (who: string) => handleNormal(who)
  }
];

export function greet(who: Greetable): string {
  if (isNull(who)) {
    return handleNull();
  }
  const greeter = greeters.find(h => h.is(who as NonNullGreetable))!;
  return greeter.greet(who as string & string[]);
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

function isShouting(who: NonNullGreetable): boolean {
  if (Array.isArray(who)) {
    return who.some(w => isShouting(w));
  }
  return who === who.toUpperCase();
}

function handleShouting(who: string): string {
  return `HELLO ${who}!`;
}

function handleNormal(who: string): string {
  return `Hello, ${who}.`;
}
function isComposed(who: NonNullGreetable): boolean {
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