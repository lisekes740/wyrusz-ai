// Polish country name → English name as used in Natural Earth / world-atlas GeoJSON
export const POLISH_TO_EN: Record<string, string> = {
  // Europa
  'Albania': 'Albania', 'Andora': 'Andorra', 'Austria': 'Austria',
  'Belgia': 'Belgium', 'Białoruś': 'Belarus',
  'Bośnia i Hercegowina': 'Bosnia and Herz.', 'Bułgaria': 'Bulgaria',
  'Chorwacja': 'Croatia', 'Czarnogóra': 'Montenegro', 'Czechy': 'Czech Rep.',
  'Dania': 'Denmark', 'Estonia': 'Estonia', 'Finlandia': 'Finland',
  'Francja': 'France', 'Grecja': 'Greece', 'Hiszpania': 'Spain',
  'Holandia': 'Netherlands', 'Irlandia': 'Ireland', 'Islandia': 'Iceland',
  'Kosowo': 'Kosovo', 'Liechtenstein': 'Liechtenstein', 'Litwa': 'Lithuania',
  'Luksemburg': 'Luxembourg', 'Łotwa': 'Latvia',
  'Macedonia Północna': 'North Macedonia', 'Malta': 'Malta',
  'Mołdawia': 'Moldova', 'Monako': 'Monaco', 'Niemcy': 'Germany',
  'Norwegia': 'Norway', 'Polska': 'Poland', 'Portugalia': 'Portugal',
  'Rumunia': 'Romania', 'San Marino': 'San Marino', 'Serbia': 'Serbia',
  'Słowacja': 'Slovakia', 'Słowenia': 'Slovenia', 'Szwajcaria': 'Switzerland',
  'Szwecja': 'Sweden', 'Turcja': 'Turkey', 'Ukraina': 'Ukraine',
  'Węgry': 'Hungary', 'Wielka Brytania': 'United Kingdom', 'Włochy': 'Italy',
  // Azja
  'Afganistan': 'Afghanistan', 'Arabia Saudyjska': 'Saudi Arabia',
  'Armenia': 'Armenia', 'Azerbejdżan': 'Azerbaijan', 'Bahrajn': 'Bahrain',
  'Bangladesz': 'Bangladesh', 'Bhutan': 'Bhutan', 'Brunei': 'Brunei',
  'Chiny': 'China', 'Filipiny': 'Philippines', 'Gruzja': 'Georgia',
  'Indie': 'India', 'Indonezja': 'Indonesia', 'Irak': 'Iraq',
  'Iran': 'Iran', 'Izrael': 'Israel', 'Japonia': 'Japan', 'Jemen': 'Yemen',
  'Jordania': 'Jordan', 'Kambodża': 'Cambodia', 'Katar': 'Qatar',
  'Kazachstan': 'Kazakhstan', 'Kirgistan': 'Kyrgyzstan',
  'Korea Południowa': 'South Korea', 'Korea Północna': 'North Korea',
  'Kuwejt': 'Kuwait', 'Laos': 'Laos', 'Liban': 'Lebanon',
  'Malezja': 'Malaysia', 'Mongolia': 'Mongolia', 'Myanmar': 'Myanmar',
  'Nepal': 'Nepal', 'Oman': 'Oman', 'Pakistan': 'Pakistan',
  'Singapur': 'Singapore', 'Sri Lanka': 'Sri Lanka', 'Syria': 'Syria',
  'Tadżykistan': 'Tajikistan', 'Tajlandia': 'Thailand', 'Tajwan': 'Taiwan',
  'Timor Wschodni': 'Timor-Leste', 'Turkmenistan': 'Turkmenistan',
  'Uzbekistan': 'Uzbekistan', 'Wietnam': 'Vietnam',
  'Zjednoczone Emiraty': 'United Arab Emirates',
  // Ameryka Północna
  'Antigua i Barbuda': 'Antigua and Barb.', 'Bahamy': 'Bahamas',
  'Barbados': 'Barbados', 'Dominikana': 'Dominican Rep.',
  'Grenada': 'Grenada', 'Haiti': 'Haiti', 'Jamajka': 'Jamaica',
  'Kanada': 'Canada', 'Kuba': 'Cuba', 'USA': 'United States of America',
  'Trynidad i Tobago': 'Trinidad and Tobago',
  // Ameryka Środkowa
  'Belize': 'Belize', 'Gwatemala': 'Guatemala', 'Honduras': 'Honduras',
  'Kostaryka': 'Costa Rica', 'Meksyk': 'Mexico', 'Nikaragua': 'Nicaragua',
  'Panama': 'Panama', 'Salwador': 'El Salvador',
  // Ameryka Południowa
  'Argentyna': 'Argentina', 'Boliwia': 'Bolivia', 'Brazylia': 'Brazil',
  'Chile': 'Chile', 'Ekwador': 'Ecuador', 'Gujana': 'Guyana',
  'Kolumbia': 'Colombia', 'Paragwaj': 'Paraguay', 'Peru': 'Peru',
  'Urugwaj': 'Uruguay', 'Wenezuela': 'Venezuela',
  // Afryka
  'Algeria': 'Algeria', 'Angola': 'Angola', 'Benin': 'Benin',
  'Botswana': 'Botswana', 'Burkina Faso': 'Burkina Faso', 'Burundi': 'Burundi',
  'Czad': 'Chad', 'Demokratyczna Republika Konga': 'Dem. Rep. Congo',
  'Dżibuti': 'Djibouti', 'Egipt': 'Egypt', 'Erytrea': 'Eritrea',
  'Etiopia': 'Ethiopia', 'Gabon': 'Gabon', 'Gambia': 'Gambia',
  'Ghana': 'Ghana', 'Gwinea': 'Guinea', 'Kamerun': 'Cameroon',
  'Kenia': 'Kenya', 'Kongo': 'Congo', 'Lesotho': 'Lesotho',
  'Liberia': 'Liberia', 'Libia': 'Libya', 'Madagaskar': 'Madagascar',
  'Malawi': 'Malawi', 'Mali': 'Mali', 'Maroko': 'Morocco',
  'Mauretania': 'Mauritania', 'Mauritius': 'Mauritius',
  'Mozambik': 'Mozambique', 'Namibia': 'Namibia', 'Niger': 'Niger',
  'Nigeria': 'Nigeria', 'RPA': 'South Africa', 'Rwanda': 'Rwanda',
  'Senegal': 'Senegal', 'Sierra Leone': 'Sierra Leone', 'Somalia': 'Somalia',
  'Sudan': 'Sudan', 'Sudan Południowy': 'S. Sudan',
  'Tanzania': 'United Rep. of Tanzania', 'Togo': 'Togo', 'Tunezja': 'Tunisia',
  'Uganda': 'Uganda', 'Zambia': 'Zambia', 'Zimbabwe': 'Zimbabwe',
  // Australia i Oceania
  'Australia': 'Australia', 'Fidżi': 'Fiji', 'Nowa Zelandia': 'New Zealand',
  'Papua Nowa Gwinea': 'Papua New Guinea',
  'Polinezja Francuska': 'Fr. Polynesia', 'Samoa': 'Samoa',
  'Wyspy Marshalla': 'Marshall Is.', 'Wyspy Salomona': 'Solomon Is.',
  'Wyspy Cooka': 'Cook Is.', 'Nauru': 'Nauru', 'Palau': 'Palau',
  'Tonga': 'Tonga', 'Tuvalu': 'Tuvalu', 'Vanuatu': 'Vanuatu',
};

// Continent view config for flat map zoom (legacy)
export const CONTINENT_VIEW: Record<string, { center: [number, number]; zoom: number }> = {
  'Gdziekolwiek':       { center: [0, 20],    zoom: 1 },
  'Europa':             { center: [15, 54],   zoom: 4 },
  'Azja':               { center: [90, 35],   zoom: 1.8 },
  'Ameryka Północna':   { center: [-100, 48], zoom: 1.8 },
  'Ameryka Środkowa':   { center: [-83, 12],  zoom: 5 },
  'Ameryka Południowa': { center: [-60, -15], zoom: 2 },
  'Afryka':             { center: [20, 0],    zoom: 2 },
  'Australia i Oceania':{ center: [140, -25], zoom: 2.5 },
};

// Globe projection config for geoOrthographic
// rotate: [-lon, -lat, 0] to bring that point to the front of the globe
// scale: zoom level
export const CONTINENT_GLOBE: Record<string, { rotate: [number,number,number]; scale: number }> = {
  'Gdziekolwiek':       { rotate: [0,   -20,  0], scale: 260 },
  'Europa':             { rotate: [-15, -54,  0], scale: 680 },
  'Azja':               { rotate: [-90, -35,  0], scale: 420 },
  'Ameryka Północna':   { rotate: [100, -48,  0], scale: 420 },
  'Ameryka Środkowa':   { rotate: [83,  -12,  0], scale: 950 },
  'Ameryka Południowa': { rotate: [60,   15,  0], scale: 460 },
  'Afryka':             { rotate: [-20,   0,  0], scale: 460 },
  'Australia i Oceania':{ rotate: [-140,  25, 0], scale: 500 },
};
