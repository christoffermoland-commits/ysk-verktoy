import type { DictionaryTerm, CategoryInfo } from '../types/dictionary'

export const DICTIONARY_CATEGORIES: CategoryInfo[] = [
  { id: 'motor-drivverk', label: 'Motor og drivverk' },
  { id: 'bremser', label: 'Bremser' },
  { id: 'chassis', label: 'Chassis og hjuloppheng' },
  { id: 'el-anlegg', label: 'Elektrisk anlegg' },
  { id: 'adr-farlig-gods', label: 'ADR / Farlig gods' },
  { id: 'kjoretoyforskriften', label: 'Kjøretøyforskriften' },
  { id: 'kjore-hviletid', label: 'Kjøre- og hviletid' },
  { id: 'sikkerhet', label: 'Sikkerhet' },
  { id: 'lasting-sikring', label: 'Lasting og sikring' },
  { id: 'hms', label: 'HMS' },
  { id: 'transportoppdrag', label: 'Transportoppdrag' },
  { id: 'trafikklaere', label: 'Trafikklære' },
]

export const dictionaryTerms: DictionaryTerm[] = [
  // Motor og drivverk
  {
    id: 'turbolader',
    term: 'Turbolader',
    definition: 'En turbolader utnytter avgasstrømmen til å drive en turbin som komprimerer innsugningsluften. Dette gir motoren mer effekt uten å øke slagvolumet.',
    category: 'motor-drivverk',
    relatedTerms: ['intercooler', 'ladetrykk'],
  },
  {
    id: 'intercooler',
    term: 'Intercooler (ladeluftkjøler)',
    definition: 'Kjøler ned den komprimerte luften fra turboladeren før den sendes inn i motoren. Kaldere luft er tettere og inneholder mer oksygen, noe som gir bedre forbrenning.',
    category: 'motor-drivverk',
    relatedTerms: ['turbolader'],
  },
  {
    id: 'ladetrykk',
    term: 'Ladetrykk',
    definition: 'Trykket som turboladeren skaper i innsugingsmanifolden. Måles i bar. Høyere ladetrykk gir mer luft til forbrenning og dermed mer effekt.',
    category: 'motor-drivverk',
    relatedTerms: ['turbolader', 'intercooler'],
  },
  {
    id: 'common-rail',
    term: 'Common Rail',
    definition: 'Et drivstoffinnsprøytningssystem der drivstoffet holdes under svært høyt trykk (opptil 2500 bar) i en felles trykkbeholder (rail). Gir presis innsprøytning og bedre forbrenning.',
    category: 'motor-drivverk',
  },
  {
    id: 'dreiemoment',
    term: 'Dreiemoment (Nm)',
    definition: 'Motorens vridkraft målt i newtonmeter. Høyt dreiemoment ved lave turtall er viktig for tunge kjøretøy, da det gir god trekkraft ved oppstart og i stigninger.',
    category: 'motor-drivverk',
  },
  {
    id: 'splittgir',
    term: 'Splittgir',
    definition: 'Et tilleggsgirsystem som deler hvert hovedgir i to (hi/lo). Gir flere girmuligheter uten å øke størrelsen på hovedgirboksen. Vanlig på tyngre lastebiler.',
    category: 'motor-drivverk',
  },
  {
    id: 'rangegroup',
    term: 'Range-group',
    definition: 'Et tilleggsgirsystem som gir to "områder" (range) – lavt og høyt. Kombinert med splittgir kan en 4-trinns girboks gi opptil 16 gir.',
    category: 'motor-drivverk',
  },
  {
    id: 'differensial',
    term: 'Differensial',
    definition: 'En mekanisme i drivakselen som tillater hjulene å rotere med ulik hastighet i svinger. Differensialsperre låser denne funksjonen for bedre grep på glatt underlag.',
    category: 'motor-drivverk',
  },
  {
    id: 'adblue',
    term: 'AdBlue (SCR)',
    definition: 'AdBlue er en vannløsning med urea som sprøytes inn i eksossystemet for å redusere NOx-utslipp. SCR (Selective Catalytic Reduction) er systemet som utfører rensingen. Påbudt på moderne dieselmotorer.',
    category: 'motor-drivverk',
    relatedTerms: ['egr'],
  },
  {
    id: 'egr',
    term: 'EGR (Eksosresirkulering)',
    definition: 'Exhaust Gas Recirculation – sender en del av avgassen tilbake til innsugingen for å senke forbrenningstemperaturen og redusere NOx-utslipp. Brukes sammen med SCR på moderne motorer.',
    category: 'motor-drivverk',
    relatedTerms: ['adblue'],
  },
  {
    id: 'energibaerere',
    term: 'Energibærere',
    definition: 'Ulike drivstofftyper og energikilder for kjøretøy: diesel, biodiesel (HVO), naturgass (CNG/LNG), hydrogen og elektrisitet. Læreplanen krever kunnskap om fordeler, ulemper og infrastruktur for de ulike alternativene.',
    category: 'motor-drivverk',
  },

  // Bremser
  {
    id: 'retarder',
    term: 'Retarder',
    definition: 'En hjelpebremse som brukes til å redusere hastigheten uten å belaste hjulbremsene. Finnes som hydraulisk (Voith) eller elektromagnetisk (Telma) type. Svært viktig i lange nedoverbakker.',
    category: 'bremser',
    relatedTerms: ['motorbremse', 'abs'],
  },
  {
    id: 'motorbremse',
    term: 'Motorbremse (VEB/EVB)',
    definition: 'Utnytter motorens kompresjon til å bremse kjøretøyet. Ekstra motorbremsventil (VEB/EVB) øker bremseeffekten ved å åpne eksosventilene på riktig tidspunkt.',
    category: 'bremser',
    relatedTerms: ['retarder'],
  },
  {
    id: 'abs',
    term: 'ABS (Antiblokkeringssystem)',
    definition: 'Elektronisk system som forhindrer hjulene i å låse seg under bremsing. Gir føreren mulighet til å styre under hard bremsing. Påbudt på alle tunge kjøretøy.',
    category: 'bremser',
    relatedTerms: ['ebs', 'esp'],
  },
  {
    id: 'ebs',
    term: 'EBS (Elektronisk bremsesystem)',
    definition: 'Videreutvikling av ABS. Styrer bremsetrykket elektronisk for raskere og mer presis bremsing. Inkluderer ABS-funksjonen og gir jevnere bremsefordeling.',
    category: 'bremser',
    relatedTerms: ['abs'],
  },
  {
    id: 'esp',
    term: 'ESP (Elektronisk stabilitetsprogram)',
    definition: 'Forhindrer skrens og velt ved å bremse enkelthjul automatisk. Bruker sensorer for å oppdage ustabilitet og griper inn før situasjonen blir kritisk.',
    category: 'bremser',
    relatedTerms: ['abs', 'ebs'],
  },
  {
    id: 'trommelbremse',
    term: 'Trommelbremse',
    definition: 'Bremsetype der bremseskoene presses utover mot en roterende trommel. Vanlig på eldre lastebiler og tilhengere. Tåler høy belastning men har dårligere kjøling enn skivebrems.',
    category: 'bremser',
  },
  {
    id: 'skivebrems',
    term: 'Skivebrems',
    definition: 'Bremsetype der bremseklossene klemmer rundt en roterende skive. Gir bedre kjøling og mer jevn bremsekraft enn trommelbremse. Standard på moderne lastebiler.',
    category: 'bremser',
  },

  // Chassis
  {
    id: 'luftfjering',
    term: 'Luftfjæring',
    definition: 'Fjæringssystem som bruker luftbelger i stedet for bladfjærer. Gir bedre kjørekomfort, kan justere kjørehøyden, og gir jevnere aksellastfordeling.',
    category: 'chassis',
  },
  {
    id: 'bladfjering',
    term: 'Bladfjærer',
    definition: 'Tradisjonelt fjæringssystem med buede stålblader. Robust og enkel konstruksjon. Vanlig på tilhengere og eldre kjøretøy. Hardere fjæring enn luftfjæring.',
    category: 'chassis',
  },
  {
    id: 'boggi',
    term: 'Boggi',
    definition: 'To aksler montert tett sammen på bakre del av kjøretøyet. Fordeler vekten over flere aksler og tillater høyere totalvekt. Kan ha løftbar aksel.',
    category: 'chassis',
  },
  {
    id: 'svingskive',
    term: 'Svingskive (femtehjulskopling)',
    definition: 'Koplingspunktet mellom trekkbil og semitrailer. Semitrailerens svingbolt (kingpin) låses i svingskiven. Må smøres jevnlig og kontrolleres for slitasje.',
    category: 'chassis',
    relatedTerms: ['kingpin'],
  },
  {
    id: 'kingpin',
    term: 'Kingpin (svingbolt)',
    definition: 'Bolten under fronten på en semitrailer som festes i trekkbilens svingskive. Standardisert diameter (2" eller 3.5"). Slitasje her er en vanlig årsak til underkjenning.',
    category: 'chassis',
    relatedTerms: ['svingskive'],
  },
  {
    id: 'pabygg',
    term: 'Påbygg',
    definition: 'Oppbygget på lastebilens chassis tilpasset transporttype. Eksempler: kapell (presenning), kjøle-/fryseskap, flak, tankpåbygg, krokløft og tippkasse. Valg av påbygg påvirker nyttelast og bruksområde.',
    category: 'chassis',
  },

  // Elektrisk anlegg
  {
    id: 'can-buss',
    term: 'CAN-buss',
    definition: 'Controller Area Network – et digitalt kommunikasjonssystem som kobler sammen alle elektroniske styreenheter i kjøretøyet. Reduserer kabelmengden og muliggjør avansert diagnostikk.',
    category: 'el-anlegg',
  },
  {
    id: 'ecu',
    term: 'ECU (Elektronisk styreenhet)',
    definition: 'En datamaskin som styrer en bestemt funksjon i kjøretøyet, for eksempel motor, girkasse eller bremser. Moderne lastebiler har mange ECU-er koblet via CAN-buss.',
    category: 'el-anlegg',
    relatedTerms: ['can-buss'],
  },
  {
    id: 'feilkode',
    term: 'Feilkode (DTC)',
    definition: 'Diagnostic Trouble Code. Når en ECU oppdager en feil, lagres en kode som kan leses ut med diagnoseverktøy. Viktig for feilsøking og verkstedbesøk.',
    category: 'el-anlegg',
    relatedTerms: ['ecu'],
  },

  // ADR / Farlig gods
  {
    id: 'adr',
    term: 'ADR',
    definition: 'Europeisk avtale om internasjonal transport av farlig gods på vei. Stiller krav til kjøretøy, emballering, merking og opplæring av sjåfør.',
    category: 'adr-farlig-gods',
  },
  {
    id: 'un-nummer',
    term: 'UN-nummer',
    definition: 'Firesifret identifikasjonsnummer tildelt av FN for hvert farlig stoff. For eksempel: UN 1202 = diesel, UN 1203 = bensin. Vises på oransje fareskilter.',
    category: 'adr-farlig-gods',
  },
  {
    id: 'fareseddel',
    term: 'Fareseddel',
    definition: 'Diamantformet merke som viser fareklassen til godset. Plasseres på kolli og kjøretøy. Fargekoder og symboler angir type fare (brannfarlig, giftig, etsende osv.).',
    category: 'adr-farlig-gods',
  },
  {
    id: 'transportdokument-adr',
    term: 'Transportdokument (farlig gods)',
    definition: 'Obligatorisk dokument som følger med all transport av farlig gods. Inneholder UN-nummer, stoffnavn, fareklasse, mengde og avsender/mottaker.',
    category: 'adr-farlig-gods',
  },

  // Kjøretøyforskriften
  {
    id: 'totalvekt',
    term: 'Tillatt totalvekt',
    definition: 'Maksimal vekt kjøretøyet er godkjent for inkludert egenvekt og last. Står i vognkortet og på kjøretøyets typeskilt. Må aldri overskrides.',
    category: 'kjoretoyforskriften',
  },
  {
    id: 'egenvekt',
    term: 'Egenvekt',
    definition: 'Kjøretøyets vekt uten last, men med fulle tanker (drivstoff, olje, kjølevæske) og standardutstyr. Grunnlaget for å beregne hvor mye last du kan ta med.',
    category: 'kjoretoyforskriften',
  },
  {
    id: 'nyttelast',
    term: 'Nyttelast',
    definition: 'Differansen mellom tillatt totalvekt og egenvekt. Den faktiske vekten du kan laste på kjøretøyet. Nyttelast = Tillatt totalvekt − Egenvekt.',
    category: 'kjoretoyforskriften',
    relatedTerms: ['totalvekt', 'egenvekt'],
  },
  {
    id: 'aksellast',
    term: 'Aksellast',
    definition: 'Vekten som hviler på én aksel. Hver bruksklasse (BK10, BK8, BK6) har egne grenser for tillatt aksellast. Feil lastfordeling kan gi ulovlig aksellast selv om totalvekten er lovlig.',
    category: 'kjoretoyforskriften',
  },
  {
    id: 'd-verdi',
    term: 'D-verdi',
    definition: 'Et mål på koplingens styrke mellom trekkbil og tilhenger, målt i kN. Bestemmer hvor tungt tilhengertoget kan være. Beregnes ut fra totalvektene til bil og tilhenger.',
    category: 'kjoretoyforskriften',
  },
  {
    id: 'bruksklasse',
    term: 'Bruksklasse (BK10/BK8/BK6)',
    definition: 'Klassifisering av veiens bæreevne. BK10 tillater 10 tonn aksellast (riksveier), BK8 tillater 8 tonn, BK6 tillater 6 tonn. Bestemmer hvor tungt du kan kjøre.',
    category: 'kjoretoyforskriften',
  },
  {
    id: 'vognkort',
    term: 'Vognkort',
    definition: 'Offentlig registreringsdokument for kjøretøyet. Del 1 skal alltid være med i kjøretøyet. Inneholder tekniske data som tillatt totalvekt, aksellast, egenvekt, akselavstand og D-verdi.',
    category: 'kjoretoyforskriften',
    relatedTerms: ['totalvekt', 'egenvekt', 'd-verdi'],
  },

  // Kjøre- og hviletid
  {
    id: 'fartsskrivar',
    term: 'Fartsskriver (takograf)',
    definition: 'Apparat som registrerer kjøretid, pauser, hvile og annen arbeidstid. Digital fartsskriver bruker sjåførkort. Påbudt for kjøretøy over 3,5 tonn.',
    category: 'kjore-hviletid',
  },
  {
    id: 'sjaforkort',
    term: 'Sjåførkort',
    definition: 'Personlig smartkort som settes inn i den digitale fartsskriveren. Registrerer all aktivitet for den enkelte sjåfør. Må fornyes hvert 5. år.',
    category: 'kjore-hviletid',
    relatedTerms: ['fartsskrivar'],
  },
  {
    id: 'yrkessjaforkompetanse',
    term: 'Yrkessjåførkompetanse (YSK)',
    definition: 'Obligatorisk kompetansebevis for yrkessjåfører. Krever 140 timers grunnutdanning eller 35 timers etterutdanning hvert 5. år. Dokumenteres med kode 95 på førerkortet.',
    category: 'kjore-hviletid',
  },

  // Sikkerhet
  {
    id: 'blindsone',
    term: 'Blindsone',
    definition: 'Områder rundt kjøretøyet som føreren ikke kan se i speilene. Store kjøretøy har betydelige blindsoner, spesielt på høyre side. Moderne lastebiler har blindsonekameraer.',
    category: 'sikkerhet',
  },
  {
    id: 'aebs',
    term: 'AEBS (Nødbremsassistent)',
    definition: 'Advanced Emergency Braking System. Oppdager hindringer foran kjøretøyet med radar/kamera og bremser automatisk hvis føreren ikke reagerer. Påbudt på nye tunge kjøretøy.',
    category: 'sikkerhet',
  },
  {
    id: 'ldws',
    term: 'LDWS (Kjørefeltassistent)',
    definition: 'Lane Departure Warning System. Varsler føreren med lyd/vibrasjon hvis kjøretøyet er i ferd med å forlate kjørefeltet uten å bruke blinklys.',
    category: 'sikkerhet',
  },

  // Lasting og sikring
  {
    id: 'sikringskraft',
    term: 'Sikringskraft',
    definition: 'Kraften som kreves for å holde lasten på plass under transport. Fremover: 80% av lastens vekt, sideveis: 50%, bakover: 50%. Beregnes etter EN 12195.',
    category: 'lasting-sikring',
  },
  {
    id: 'surring',
    term: 'Surring (nedspänning)',
    definition: 'Metode for å sikre last ved å spenne stropper over lasten ned mot lasteplanet. Friksjonskraften mellom last og gulv er avgjørende for antall stropper som trengs.',
    category: 'lasting-sikring',
    relatedTerms: ['sikringskraft'],
  },
  {
    id: 'lc-verdi',
    term: 'LC-verdi (Lashing Capacity)',
    definition: 'Stroppens sikringskapasitet i daN. Angir hvor mye kraft stroppen kan utøve. Står merket på stroppen sammen med STF-verdi.',
    category: 'lasting-sikring',
  },
  {
    id: 'stf-verdi',
    term: 'STF-verdi (Standard Tension Force)',
    definition: 'Forspenningskraften som en strammeinnretning (ratchet) kan gi. Oppgis i daN. Viktig for å beregne antall stropper ved nedspänning.',
    category: 'lasting-sikring',
    relatedTerms: ['lc-verdi'],
  },
  {
    id: 'friksjon',
    term: 'Friksjonskoeffisient (µ)',
    definition: 'Mål på friksjonen mellom last og lastegulv. Tre på stål: ca. 0.3, gummimatte: ca. 0.6. Høyere friksjon = færre stropper. Antiglimatter øker friksjonen.',
    category: 'lasting-sikring',
  },
  {
    id: 'lastsikringsutstyr',
    term: 'Lastsikringsutstyr',
    definition: 'Fellesbetegnelse for utstyr brukt til å sikre last: spennbånd, kjettinger, stålwire, stopper, friksjonsmateriell og sikringsnett. Alt utstyr skal være CE-merket og kontrolleres jevnlig for skader.',
    category: 'lasting-sikring',
    relatedTerms: ['surring', 'sikringskraft'],
  },

  // HMS (nytt fra læreplanen)
  {
    id: 'risikovurdering',
    term: 'Risikovurdering',
    definition: 'Systematisk gjennomgang av farer knyttet til et arbeidsoppdrag. Sjåføren skal kunne identifisere risiko, vurdere sannsynlighet og konsekvens, og iverksette tiltak for å redusere risikoen.',
    category: 'hms',
    relatedTerms: ['sja', 'verneutstyr'],
  },
  {
    id: 'sja',
    term: 'Sikker jobbanalyse (SJA)',
    definition: 'En systematisk gjennomgang av arbeidsoppgaver for å avdekke farer før arbeidet starter. Brukes spesielt ved uvanlige eller risikofylte oppdrag. Dokumenteres skriftlig.',
    category: 'hms',
    relatedTerms: ['risikovurdering'],
  },
  {
    id: 'verneutstyr',
    term: 'Verneutstyr (PPE)',
    definition: 'Personlig verneutstyr som vernesko, hjelm, vernebriller, hansker og refleksvest. Påbudt på mange laste- og losseplasser. Sjåføren er ansvarlig for å bruke riktig verneutstyr.',
    category: 'hms',
    relatedTerms: ['risikovurdering', 'hms-kort'],
  },
  {
    id: 'hms-kort',
    term: 'HMS-kort',
    definition: 'Personlig identitetskort som dokumenterer at innehaveren er lovlig ansatt og registrert i norsk arbeidsliv. Påbudt å bære synlig på mange arbeidsplasser innen bygg, anlegg og transport.',
    category: 'hms',
  },
  {
    id: 'forstehjelp',
    term: 'Førstehjelp',
    definition: 'Akutt hjelp ved ulykker og skader. Yrkessjåfører skal kunne livreddende førstehjelp: frie luftveier, sideleie, hjerte-lunge-redning (HLR), stanse blødninger og varsle nødetater (113).',
    category: 'hms',
  },
  {
    id: 'ergonomi',
    term: 'Ergonomi',
    definition: 'Tilpasning av arbeidsmiljøet for å forebygge belastningsskader. For sjåfører: riktig sittestilling, stolinnstilling, løfteteknikk ved lasting/lossing, og pauser for å motvirke vibrasjon og stillesitting.',
    category: 'hms',
  },
  {
    id: 'kosthold-sovn',
    term: 'Kosthold og søvn',
    definition: 'Læreplanen fremhever betydningen av riktig kosthold, tilstrekkelig søvn og fravær av rusmidler for trafikksikker kjøring. Trøtthet er en av de vanligste årsakene til ulykker med tunge kjøretøy.',
    category: 'hms',
  },

  // Transportoppdrag (nytt fra læreplanen)
  {
    id: 'cmr-fraktbrev',
    term: 'CMR-fraktbrev',
    definition: 'Internasjonalt fraktbrev som reguleres av CMR-konvensjonen. Brukes ved grensekryssende godstransport. Dokumenterer avtale mellom avsender, transportør og mottaker, og regulerer ansvarsforholdet.',
    category: 'transportoppdrag',
    relatedTerms: ['fraktbrev'],
  },
  {
    id: 'fraktbrev',
    term: 'Fraktbrev',
    definition: 'Dokument som følger godset under transport. Bekrefter transportavtalen mellom avsender og transportør. Inneholder opplysninger om avsender, mottaker, godstype, vekt og leveringsvilkår.',
    category: 'transportoppdrag',
    relatedTerms: ['cmr-fraktbrev'],
  },
  {
    id: 'kabotasje',
    term: 'Kabotasje',
    definition: 'Innenriks godstransport utført av et utenlandsk transportforetak. I Norge er det tillatt med inntil 3 kabotasjeoppdrag innen 7 dager etter at den internasjonale transporten er avsluttet.',
    category: 'transportoppdrag',
  },
  {
    id: 'anbudsprosess',
    term: 'Anbudsprosess',
    definition: 'Prosess der en oppdragsgiver inviterer transportselskaper til å gi tilbud på transportoppdrag. Sjåføren bør forstå hvordan anbud fungerer, da det påvirker arbeidsforhold, priser og kvalitetskrav.',
    category: 'transportoppdrag',
    relatedTerms: ['bestillerrolle'],
  },
  {
    id: 'bestillerrolle',
    term: 'Bestillerrolle',
    definition: 'Rollen til den som bestiller transporttjenester. Bestilleren har ansvar for å velge seriøse transportører og påse at lover og regler følges, inkludert krav til lønns- og arbeidsvilkår.',
    category: 'transportoppdrag',
    relatedTerms: ['anbudsprosess', 'paseplikt'],
  },
  {
    id: 'paseplikt',
    term: 'Påseplikt',
    definition: 'Lovpålagt plikt for den som bestiller transport til å kontrollere at transportøren oppfyller kravene til lønns- og arbeidsvilkår. Gjelder også for sjåfører som er innleid eller underentreprenører.',
    category: 'transportoppdrag',
    relatedTerms: ['bestillerrolle'],
  },
  {
    id: 'kundeservice',
    term: 'Kundeservice',
    definition: 'Sjåførens rolle som bedriftens ansikt utad. Innebærer profesjonell opptreden, god kommunikasjon med kunder, punktlig levering og forsiktig godshåndtering. Viktig for bedriftens omdømme.',
    category: 'transportoppdrag',
  },
  {
    id: 'regularitet',
    term: 'Regularitet',
    definition: 'Evnen til å holde fastsatte ruter og tidspunkt. Viktig nøkkeltall i transportbransjen, spesielt for rute- og distribusjonstransport. Påvirker kundetilfredshet og lønnsomhet.',
    category: 'transportoppdrag',
  },
  {
    id: 'godsbehandling',
    term: 'Godsbehandling',
    definition: 'Korrekt håndtering av gods ved lasting, transport og lossing. Inkluderer bruk av hjelpemidler (truck, jekketralle), temperaturkontroll for kjøle-/frysevarer, og forsiktig behandling av skadefølsomt gods.',
    category: 'transportoppdrag',
    relatedTerms: ['lastsikringsutstyr'],
  },
  {
    id: 'partssamarbeid',
    term: 'Partssamarbeid',
    definition: 'Samarbeid mellom arbeidsgiver, arbeidstaker og tillitsvalgte for å ivareta et godt arbeidsmiljø. Inkluderer verneombud, arbeidsmiljøutvalg (AMU), tariffavtaler og den norske arbeidslivsmodellen.',
    category: 'transportoppdrag',
  },

  // Trafikklære (nytt fra læreplanen)
  {
    id: 'defensiv-kjoring',
    term: 'Defensiv kjøring',
    definition: 'Kjørestil som handler om å forutse farer og ta hensyn til andre trafikanters feil. Innebærer å holde god avstand, tilpasse fart, og alltid ha en plan B i trafikken.',
    category: 'trafikklaere',
    relatedTerms: ['okonomisk-kjoring'],
  },
  {
    id: 'okonomisk-kjoring',
    term: 'Økonomisk kjøring',
    definition: 'Kjøreteknikk som reduserer drivstofforbruk og slitasje. Inkluderer jevn hastighet, bruk av cruise control, unngå unødig tomgangskjøring, riktig girvalg og planlegging av ruten.',
    category: 'trafikklaere',
    relatedTerms: ['defensiv-kjoring', 'energibaerere'],
  },
  {
    id: 'driftsstans',
    term: 'Driftsstans',
    definition: 'Uplanlagt stopp på grunn av teknisk feil eller uhell. Sjåføren skal kunne sikre kjøretøyet med varseltrekant og lys, varsle riktig instans, og utføre enkel feilsøking og nødreparasjon.',
    category: 'trafikklaere',
    relatedTerms: ['daglig-kontroll'],
  },
  {
    id: 'daglig-kontroll',
    term: 'Daglig kontroll',
    definition: 'Sjåførens lovpålagte kontroll av kjøretøyet før kjøring. Inkluderer sjekk av bremser, lys, dekk, væskenivåer, speil, kopling (tilhenger) og lastsikring. Dokumenteres i kontrollskjema.',
    category: 'trafikklaere',
    relatedTerms: ['driftsstans'],
  },
  {
    id: 'laerling',
    term: 'Lærling',
    definition: 'Person som er ansatt i en lærebedrift for å få opplæring i yrkessjåførfaget. Læretiden er normalt 2 år (1 år i skole + 1 år i bedrift, evt. 2 år rett i bedrift). Avsluttes med fagprøve.',
    category: 'trafikklaere',
    relatedTerms: ['fagprove'],
  },
  {
    id: 'fagprove',
    term: 'Fagprøve',
    definition: 'Avsluttende prøve i yrkessjåførfaget. Består av planlegging, gjennomføring, vurdering og dokumentasjon av et transportoppdrag. Bestått fagprøve gir fagbrev som yrkessjåfør.',
    category: 'trafikklaere',
    relatedTerms: ['laerling'],
  },
]
