export const DESTINATIONS: Record<string, Record<string, string[]>> = {
  'Gdziekolwiek': { 'Zaskoczy mnie AI!': [] },
  'Europa': {
    'Albania': [], 'Andora': [], 'Austria': [], 'Belgia': [], 'Białoruś': [],
    'Bośnia i Hercegowina': [], 'Bułgaria': [], 'Chorwacja': [], 'Czarnogóra': [],
    'Czechy': [], 'Dania': [], 'Estonia': [], 'Finlandia': [], 'Francja': [],
    'Grecja': [], 'Hiszpania': [], 'Holandia': [], 'Irlandia': [], 'Islandia': [],
    'Kosowo': [], 'Liechtenstein': [], 'Litwa': [], 'Luksemburg': [], 'Łotwa': [],
    'Macedonia Północna': [], 'Malta': [], 'Mołdawia': [], 'Monako': [],
    'Niemcy': [], 'Norwegia': [], 'Polska': [], 'Portugalia': [], 'Rumunia': [],
    'San Marino': [], 'Serbia': [], 'Słowacja': [], 'Słowenia': [], 'Szwajcaria': [],
    'Szwecja': [], 'Turcja': [], 'Ukraina': [], 'Węgry': [], 'Wielka Brytania': [],
    'Włochy': [],
  },
  'Azja': {
    'Afganistan': [], 'Arabia Saudyjska': [], 'Armenia': [], 'Azerbejdżan': [],
    'Bahrajn': [], 'Bangladesz': [], 'Bhutan': [], 'Brunei': [],
    'Chiny': [], 'Filipiny': [], 'Gruzja': [], 'Indie': [], 'Indonezja': [],
    'Irak': [], 'Iran': [], 'Izrael': [], 'Japonia': [], 'Jemen': [],
    'Jordania': [], 'Kambodża': [], 'Katar': [], 'Kazachstan': [], 'Kirgistan': [],
    'Korea Południowa': [], 'Korea Północna': [], 'Kuwejt': [], 'Laos': [],
    'Liban': [], 'Malediwy': [], 'Malezja': [], 'Mongolia': [], 'Myanmar': [],
    'Nepal': [], 'Oman': [], 'Pakistan': [], 'Palestyna': [], 'Singapur': [],
    'Sri Lanka': [], 'Syria': [], 'Tadżykistan': [], 'Tajlandia': [],
    'Tajwan': [], 'Timor Wschodni': [], 'Turkmenistan': [], 'Uzbekistan': [],
    'Wietnam': [], 'Wyspy Maldivskie': [], 'Zjednoczone Emiraty': [],
  },
  'Ameryka Północna': {
    'Antigua i Barbuda': [], 'Bahamy': [], 'Barbados': [], 'Belize': [],
    'Dominikana': [], 'Grenada': [], 'Gwatemala': [], 'Haiti': [], 'Honduras': [],
    'Jamajka': [], 'Kanada': [], 'Kuba': [], 'Meksyk': [], 'Nikaragua': [],
    'Panama': [], 'Saint Kitts i Nevis': [], 'Saint Lucia': [],
    'Saint Vincent i Grenadyny': [], 'Salwador': [], 'Trynidad i Tobago': [],
    'USA': [],
  },
  'Ameryka Środkowa': {
    'Belize': [], 'Gwatemala': [], 'Honduras': [], 'Kostaryka': [],
    'Meksyk': [], 'Nikaragua': [], 'Panama': [], 'Salwador': [],
  },
  'Ameryka Południowa': {
    'Argentyna': [], 'Boliwia': [], 'Brazylia': [], 'Chile': [], 'Ekwador': [],
    'Gujana': [], 'Gujana Francuska': [], 'Kolumbia': [], 'Paragwaj': [],
    'Peru': [], 'Surinam': [], 'Urugwaj': [], 'Wenezuela': [],
    'Wyspy Falklandzkie': [],
  },
  'Afryka': {
    'Algeria': [], 'Angola': [], 'Benin': [], 'Botswana': [],
    'Burkina Faso': [], 'Burundi': [], 'Czad': [], 'Demokratyczna Republika Konga': [],
    'Dżibuti': [], 'Egipt': [], 'Erytrea': [], 'Eswatini': [], 'Etiopia': [],
    'Gabon': [], 'Gambia': [], 'Ghana': [], 'Gwinea': [], 'Gwinea Bissau': [],
    'Gwinea Równikowa': [], 'Kamerun': [], 'Kenia': [], 'Komory': [],
    'Kongo': [], 'Lesotho': [], 'Liberia': [], 'Libia': [], 'Madagaskar': [],
    'Malawi': [], 'Mali': [], 'Maroko': [], 'Mauretania': [], 'Mauritius': [],
    'Mozambik': [], 'Namibia': [], 'Niger': [], 'Nigeria': [], 'RPA': [],
    'Rwanda': [], 'Sahara Zachodnia': [], 'Senegal': [], 'Sierra Leone': [],
    'Somalia': [], 'Sudan': [], 'Sudan Południowy': [], 'Suazi': [],
    'São Tomé i Príncipe': [], 'Tanzania': [], 'Togo': [], 'Tunezja': [],
    'Uganda': [], 'Wyspy Kanaryjskie': [], 'Wyspy Zielonego Przylądka': [],
    'Zambia': [], 'Zimbabwe': [],
  },
  'Australia i Oceania': {
    'Australia': [], 'Fidżi': [], 'Kiribati': [], 'Mikronezja': [],
    'Nauru': [], 'Nowa Zelandia': [], 'Palau': [], 'Papua Nowa Gwinea': [],
    'Polinezja Francuska': [], 'Samoa': [], 'Samoa Amerykańskie': [],
    'Timor Wschodni': [], 'Tonga': [], 'Tuvalu': [], 'Vanuatu': [],
    'Wyspy Cooka': [], 'Wyspy Marshalla': [], 'Wyspy Salomona': [],
  },
};

export const MONTHS_PL = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];

export function getBudgetLabel(value: number): { label: string; sub: string } {
  if (value <= 150) return { label: 'Backpacker / Odkrywca', sub: '50–150 PLN / dzień' };
  if (value <= 400) return { label: 'Komfortowy turysta', sub: '150–400 PLN / dzień' };
  return { label: 'Luksus i relaks', sub: '400–2000+ PLN / dzień' };
}
