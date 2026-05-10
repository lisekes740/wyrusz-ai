import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Brak klucza OPENAI_API_KEY' }, { status: 500 });
  }

  const fd = await req.json();

  // Build a rich prompt from the FormData
  const destination = fd.country?.length
    ? fd.country.join(', ')
    : fd.continent || 'Dowolne miejsce na świecie';

  const cityInfo = fd.city ? ` (ze szczególnym uwzględnieniem: ${fd.city})` : '';

  const dateInfo = fd.dateType === 'dates'
    ? (fd.startDate && fd.endDate ? `od ${fd.startDate} do ${fd.endDate}` : 'daty do ustalenia')
    : `elastycznie w miesiącach: ${fd.flexMonthFrom || '?'} – ${fd.flexMonthTo || '?'}${fd.flexAnyDays ? ', dowolna liczba dni' : fd.flexDays ? `, ok. ${fd.flexDays} dni` : ''}`;

  const transportInfo = fd.transport?.length
    ? fd.transport.join(', ') + (fd.rentCar ? ' + wynajem pojazdu na miejscu' : '')
    : 'transport nieokreślony';

  const flightPref = fd.transport?.includes('Samolot')
    ? (fd.layover === 'bezposrednie' ? ', tylko loty bezpośrednie' : ', akceptuje przesiadki')
    : '';

  const budgetTotal = (fd.budgetNocleg || 0) + (fd.budgetJedzenie || 0) + (fd.budgetAtrakcje || 0);
  const budgetInfo = `${fd.budgetNocleg} PLN/dzień nocleg, ${fd.budgetJedzenie} PLN/dzień jedzenie, ${fd.budgetAtrakcje} PLN/dzień atrakcje (łącznie: ~${budgetTotal} PLN/dzień/osoba)`;

  const tripTypesInfo = fd.tripTypes?.length ? fd.tripTypes.join(', ') : 'nie sprecyzowany';

  const systemPrompt = `Jesteś eksperckim planistą podróży o imieniu wyruszAI. Piszesz wyłącznie po polsku. Twoje plany są konkretne, inspirujące i praktyczne. Używasz formatowania Markdown: nagłówki (##, ###), listy punktowane i pogrubienia. Odpowiedź powinna być bogata i wyczerpująca – przynajmniej 600 słów.`;

  const userPrompt = `Stwórz szczegółowy plan podróży na podstawie poniższych preferencji:

**KIERUNEK:** ${destination}${cityInfo}
**TERMIN:** ${dateInfo}
**UCZESTNICY:** ${fd.participants || 1} ${fd.participants === 1 ? 'osoba' : 'osoby/osób'}
**TRANSPORT:** ${transportInfo}${flightPref}
**BUDŻET:** ${budgetInfo}
**TYP WYJAZDU:** ${tripTypesInfo}
**DODATKOWE ŻYCZENIA UŻYTKOWNIKA:** ${fd.aiInterview || 'brak'}

Proszę o:
1. **Krótkie wprowadzenie** – dlaczego ten kierunek to świetny wybór.
2. **Plan dzienny** – rozpisz aktywności dzień po dniu (lub proponowane bloki dni jeśli daty są elastyczne). Uwzględnij konkretne miejsca, restauracje, atrakcje z ich nazwami.
3. **Praktyczne wskazówki** – transport lokalny, najlepszy czas na atrakcje, na co uważać.
4. **Propozycje noclegów** – dopasowane do budżetu (kategorie hoteli / hostelów / campingów).
5. **Szacunkowy kosztorys** całej podróży.

Pisz żywo i inspirująco – tak, żeby czytający natychmiast chciał się pakować!`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI error:', errText);
      return NextResponse.json({ error: `OpenAI error: ${response.status}` }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ plan: content });
  } catch (err) {
    console.error('Fetch error:', err);
    return NextResponse.json({ error: 'Błąd połączenia z OpenAI' }, { status: 500 });
  }
}
