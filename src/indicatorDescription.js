
import NotifyButton from  './components/NotifyButton.vue'



//creo un dizionario delle descrizioni degli indicatori, da visualizzare nel tasto info.
let indicatorDescription =

    //temperatura-superficiale

    {
        'water-temperature': {
            title : "Temperatura dell'acqua",
            description: `La misura delle temperatura dell'acqua permette di seguire il ciclo termico
            del lago nel corso dell'anno. Dalla temperatura dipendono processi importanti
            come la stratificazione/circolazione delle acque, la quantità di ossigeno in
            coluaione, lo sviluppo delle fioriture algali. Inoltre il monitoraggio a lungo
            termine delle temperature è utile per valutare la risposta del lago ai
            cambiamenti climatici.
            `,
            breveDescrizione:`Temperatura dell'acqua`,
            // icon:'fa fa-thermometer-three-quarters text-warning',
            icon:'icon-water_temp',
            annuale: false,
        },

        'water-temperature-ptcan1_0': {
            title : "Temperatura superficiale (profondità 1 m)",
            description: `La misura delle temperatura dell'acqua permette di seguire il ciclo termico
            del lago nel corso dell'anno. Dalla temperatura dipendono processi importanti
            come la stratificazione/circolazione delle acque, la quantità di ossigeno in
            coluaione, lo sviluppo delle fioriture algali. Inoltre il monitoraggio a lungo
            termine delle temperature è utile per valutare la risposta del lago ai
            cambiamenti climatici.
            `,
            breveDescrizione:`Temperatura superficiale dell'acqua alla profondità di 1 m`,
            // icon:'fa fa-thermometer-three-quarters text-warning',
            icon:'icon-water_temp',
            // annuale: false,
        },

        'water-temperature-ptcan10_0': {
            title : "Temperatura dell'acqua (profondità 10 m)",
            description: `La misura delle temperatura dell'acqua permette di seguire il ciclo termico
            del lago nel corso dell'anno. Dalla temperatura dipendono processi importanti
            come la stratificazione/circolazione delle acque, la quantità di ossigeno in
            coluaione, lo sviluppo delle fioriture algali. Inoltre il monitoraggio a lungo
            termine delle temperature è utile per valutare la risposta del lago ai
            cambiamenti climatici.
            `,
            breveDescrizione:`Temperatura superficiale dell'acqua alla profondità di 10 m`,
            // icon:'fa fa-thermometer-three-quarters text-warning',
            icon:'icon-water_temp',
            // annuale: false,
        },

        'water-temperature-ptcan30_0': {
            title : "Temperatura dell'acqua (profondità 30 m)",
            description: `La misura delle temperatura dell'acqua permette di seguire il ciclo termico
            del lago nel corso dell'anno. Dalla temperatura dipendono processi importanti
            come la stratificazione/circolazione delle acque, la quantità di ossigeno in
            coluaione, lo sviluppo delle fioriture algali. Inoltre il monitoraggio a lungo
            termine delle temperature è utile per valutare la risposta del lago ai
            cambiamenti climatici.
            `,
            breveDescrizione:`Temperatura superficiale dell'acqua alla profondità di 30 m`,
            // icon:'fa fa-thermometer-three-quarters text-warning',
            icon:'icon-water_temp',
            // annuale: false,
        },

        'sat-water-temperature': {
            title : "Temperatura dell'acqua da satellite",
            description: `Descrizione non presente`,
            breveDescrizione:`Temperatura superficiale dell'acqua misurata da satellite (descrizione provvisoria)`,
            // icon:'fa fa-flask text-primary',
            icon:'icon-water_temp'
        },

        'water-SDT': {
            title : 'Trasparenza',
            description: `La trasparenza rappresenta la misura dell’attenuazione della radiazione
            luminosa lungo la colonna d’acqua. Dipende dalla presenza nell’acqua di soluti
            e particelle, tra cui le cellule di fitoplancton, che possono assorbire o
            disperdere la luce. La trasparenza può essere misurata con il Disco di Secchi.
            Una bassa trasperenza puo' essere indicativa della presenza di una fioritura
            algale ma anche di solidi sopsesi dovuti agli apporti a lago, ad esempio dopo
            forti eventi di precipitazione.
            `,
            breveDescrizione:`Trasparenza delle acque misurata mediante Disco di Secchi`,
            // icon:'fa fa-tint text-primary',
            icon:'icon-water_SDT',
            annuale:true,
            limite : {
                maggiore:5,
                lugano:5
            },
            obiettivo : {
                maggiore:null,
                lugano:null
            },

        },

        'water-depth': {
            title : 'Profondità mescolamento',
            description: `La massima profondità di mescolamento alla circolazione tardo-invernale
            (tra febbraio e marzo) indica lo strato rimescolato, ovvero lo strato delle
            acque interessate da omogenizzazione termica e ridistribuzione di ossigeno e
            nutrienti.
            `,
            breveDescrizione:`Massima profondità di mescolamento alla circolazione tardo-invernale`,
            // icon:'fa fa-arrows-v text-primary',
            icon:'icon-water-depht',
            annuale:true,
            limite : {
                maggiore:null,
                lugano:null
            },
            obiettivo : {
                maggiore:100,
                lugano:60
            },
            reversed: true,
        },

        'MixDepth': {
            title : 'Profondità mescolamento',
            description: `La massima profondità di mescolamento alla circolazione tardo-invernale
            (tra febbraio e marzo) indica lo strato rimescolato, ovvero lo strato delle
            acque interessate da omogenizzazione termica e ridistribuzione di ossigeno e
            nutrienti.
            `,
            breveDescrizione:`Massima profondità di mescolamento alla circolazione tardo-invernale`,
            // icon:'fa fa-arrows-v text-primary',
            icon:'icon-water-depht',
            annuale:true,
            limite : {
                maggiore:null,
                lugano:null
            },
            obiettivo : {
                maggiore:100,
                lugano:60
            },
            reversed: true,
        },

        'water-pH': {
            title : 'pH',
            // title : 'Acidità / Basicità',
            description: `Il pH è un valore numerico che indica l’acidità di una soluzione. Valori
            compresi tra 6 e 9 sono in genere compatibili con la vita degli organismi
            acquatici; valori al di fuori di questo range sono solitamente la conseguenza
            di apporti di sostanze inquinanti acide o basiche. pH elevati, anche superiori
            a 9, si possono rilevare nelle acque superficiali in estate in corrispindenza
            di fioriture algali.
            `,
            breveDescrizione:`pH delle acque alla profondità del sensore`,
            // icon:'fa fa-certificate text-primary',
            icon:'icon-ph',
            annuale:false,
        },

        'water-cond25': {
            title : 'Conducibilità',
            description: `La conducibilità indica la capacità dell’acqua di trasmettere elettricità e
            dipende dagli ioni in soluzione, quindi aumenta all'aumentare della
            concentrazione dei soluti presenta nell’acqua stessa. La conducibilità puo'
            quindi indicare aumento/diminuzione nella presenza di soluti, ad esempio a
            causa di fattori meteo-climatici e idrologici.
            `,
            breveDescrizione:`Conducibilità delle acque alla profondità del sensore`,
            // icon:'fa fa-bolt text-primary',
            icon:'icon-water_conduc',
            annuale:false
        },

        'water-O2D': {
            title : 'Ossigeno disciolto',
            description: `La presenza di ossigeno nelle acque deriva dallo scambio con l'atmosfera e
            dai processi biologici operati dagli organismi acquatici (fotosintesi e
            respirazione). Valori elevati si trovano solitamente nelle acque
            superficiali nel periodo estivo. Bassi valori (ipossia) o totale assenza
            di ossigeno (anossia) possono caratterizzare le acque profonde dei laghi
            eutrofi, in cui la sostanza organica prodotta negli strati superficiali
            sedimenta e viene decomposta dagli organismi aerobi che sottraggono
            ossigeno all’acqua.
            `,
            breveDescrizione:`Ossigeno disciolto alla profondità del sensore/i, espresso come concentrazione`,
            // icon:'fa fa-eercast text-primary',
            icon:'icon-ossigeno_disc_conc',
            annuale:false,
        },


        'water-O2S': {
            title : 'Ossigeno disciolto % S.',
            description: `L'ossigeno, oltre che come concentrazione, può essere espresso come % rispetto
            alla saturazione, ovvero la quantità di ossigeno presente rispetto al valore
            massimo, preso uguale a cento, che si può avere nelle stesse condizioni di
            salinità, di temperatura e pressione atmosferica. Valori superiodi al 100%
            indicano condizioni di sovrassaturazione.
            `,
            breveDescrizione:`Ossigeno disciolto alla profondità del sensore/i, espresso come % rispetto alla saturazione`,
            // icon:'fa fa-flask text-primary',
            icon:'icon-water_O2S',
            annuale:false,

        },

        'Solidi-sospesi-totali': {
            title : 'Solidi sospesi totali',
            description: `I solidi sospesi foniscono informazioni sulla presenza di sostanze indisciolte
            nelle acque. Sono correlati alla trasparenza/torbidità.
            `,
            breveDescrizione:`Concentrazione dei solidi sospesi totali rilevata dalle immagini satellitari`,
            // icon:'fa fa-bandcamp text-primary',
            icon:'icon-solidi_sospesi',
            annuale:false,
        },

        'water-Pload': {
            title : 'Carico di fosforo',
            description: `Il carico di P è la quantità totale di questo elemento che si stima essere
            apportata al lago nell'arco di un anno. Si calcola come somma degli apporti
            dai singoli tributari, sulla base di concentrazioni e deflussi, e dall'eventuale
            areale non drenato.
            `,
            breveDescrizione:`Carico totale annuo di fosforo dal bacino, calcolato sulla base del monitoraggio dei tributari
            principali`,
            // icon:'fa fa-line-chart text-primary',
            icon:'icon-water_pload',
            annuale:true,
            limite : {
                maggiore:200,
                lugano:18
            },
            obiettivo : {
                maggiore:null,
                lugano:null
            },
        },
        'Pload': {
            title : 'Carico di fosforo',
            description: `Il carico di P è la quantità totale di questo elemento che si stima essere
            apportata al lago nell'arco di un anno. Si calcola come somma degli apporti
            dai singoli tributari, sulla base di concentrazioni e deflussi, e dall'eventuale
            areale non drenato.
            `,
            breveDescrizione:`Carico totale annuo di fosforo dal bacino, calcolato sulla base del monitoraggio dei tributari
            principali`,
            // icon:'fa fa-line-chart text-primary',
            icon:'icon-water_pload',
            annuale:true,
            limite : {
                maggiore:200,
                lugano:18
            },
            obiettivo : {
                maggiore:null,
                lugano:null
            },
        },

        'water-Nload': {
            title : 'Carico di azoto',
            description: `Il carico di N è la quantità totale di questo elemento che si stima essere
            apportata al lago nell'arco di un anno. Si calcola come somma degli apporti
            dai singoli tributari, sulla base di concentrazioni e deflussi, e dall'eventuale
            areale non drenato.
            `,
            breveDescrizione:`Carico totale annuo di azoto dal bacino, calcolato sulla base del monitoraggio
            dei tributari principali`,
            // icon:'fa fa-flask text-primary',
            icon:'icon-conc_azoto',
            annuale:true,
            limite : {
                maggiore:null,
                lugano:null
            },
            obiettivo : {
                maggiore:null,
                lugano:null
            },
        },
        'Nload': {
            title : 'Carico di azoto',
            description: `Il carico di N è la quantità totale di questo elemento che si stima essere
            apportata al lago nell'arco di un anno. Si calcola come somma degli apporti
            dai singoli tributari, sulla base di concentrazioni e deflussi, e dall'eventuale
            areale non drenato.
            `,
            breveDescrizione:`Carico totale annuo di azoto dal bacino, calcolato sulla base del monitoraggio
            dei tributari principali`,
            // icon:'fa fa-flask text-primary',
            icon:'icon-conc_azoto',
            annuale:true,
            limite : {
                maggiore:null,
                lugano:null
            },
            obiettivo : {
                maggiore:null,
                lugano:null
            },
        },

        'water-PTOT': {
            title : 'Concentrazione di fosforo',
            description: `Valore medio annuo delle concentrazioni (medie sulla colonna d'acqua ponderate
            sui volumi) di P totale. La media annua è calcolata a parire dai valori
            ottenuti nei monitoraggi mensili o con altra frequenza temporale.
            `,
            breveDescrizione:`Concentrazione media annua di fosforo totale nel lago`,
            // icon:'fa fa-file-powerpoint-o text-primary',
            icon:'icon-water_PTOT',
            annuale:true,
            limite : {
                maggiore:null,
                lugano:30
            },
            obiettivo : {
                maggiore:10,
                lugano:null
            },
        },

        'water-NTOT': {
            title : 'Concentrazione di azoto',
            description: `Valore medio annuo delle concentrazioni (medie sulla colonna d'acqua ponderate
            sui volumi) di N totale. La media annua è calcolata a parire dai valori
            ottenuti nei monitoraggi mensili o con altra frequenza temporale.
            `,
            breveDescrizione:`Concentrazione media annua di azoto totale nel lago`,
            // icon:'fa fa-flask text-primary',
            icon:'icon-conc_azoto',

            annuale:true,
            limite : {
                maggiore:null,
                lugano:null
            },
            obiettivo : {
                maggiore:null,
                lugano:null
            },
        },

        // 'indice-LTLeco': {
        //     title : 'Indice LTLeco',
        //     description: `Indice che descrive lo stato trofico di un lago; basato sulla somma di punteggi
        //     derivanti dal valore di P totale alla circolazione, trasperenza media annua,
        //     e valori di ossigeno alla saturazione in ipolimnio a fine stratificazione.
        //     `,
        //     breveDescrizione:`Valore dell'indice sintetico LTLeco `,
        //     // icon:'fa fa-superpowers text-primary',
        //     icon:'icon-indice_LTleco',
        //     annuale:true,
        // },
        'LTLeco': {
            title : 'Indice LTLeco',
            description: `Indice che descrive lo stato trofico di un lago; basato sulla somma di punteggi
            derivanti dal valore di P totale alla circolazione, trasperenza media annua,
            e valori di ossigeno alla saturazione in ipolimnio a fine stratificazione.
            `,
            breveDescrizione:`Valore dell'indice sintetico LTLeco `,
            // icon:'fa fa-superpowers text-primary',
            icon:'icon-indice_LTleco',
            annuale:true,
            decimals: 0
        },

        'water-Chl-a': {
            title : 'Clorofilla a',
            description: `La clorofilla è un pigmento presente nel fitoplancton. La sua misura può quindi
            essere utilizzata come indicatore della densità del fitoplancton e della
            biomassa algale presente. I suoi valori variano nell’arco dell’anno e a seconda
            della profondità, con i massimi nei mesi estivi in coincidenza della maggior
            produttività algale. La concentrazione è più alta nei laghi più produttivi o
            eutrofi. L'aumento dei valori di clorofilla può essereutilizzato come segnale
            dello sviluppo di una fioritura algale.
            `,
            breveDescrizione:`Concentrazione di clorofilla-a alla profondità del sensore`,
            // icon:'fa fa-flask text-primary',
            icon:'icon-water_CHl_a',
            annuale:false,
        },

        'sat-water-Chl-a': {
            title : 'Clorofilla a',
            description: `Descrizione non presente`,
            breveDescrizione:`Concentrazione di clorofilla-a (descrizione provvisoria)`,
            // icon:'fa fa-flask text-primary',
            icon:'icon-water_CHl_a',
            annuale:false,
        },

        'water-PC': {
            title : 'Ficocianina',
            description: `Ficocianina e ficoeritrina sono sue pigmenti algali presenti nel fitoplancton
            ed in particolare nei cianobatteri. La loro misura può quindi essere utilizzata
            come indicatore della presenza e della densità di questo gruppo e il loro
            aumento temporale puo' essere un possibile segnale dello sviluppo di una
            fioritura di cianobatteri.
            `,
            breveDescrizione:`Concentrazione di ficocianina, pigmento indicatore della presenza di cianobatteri`,
            // icon:'fa fa-flask text-primary',
            icon:'icon-water_PC',
            annuale:false,
        },
        'water-PE': {
            title : 'Ficoeritrina',
            description: `Ficocianina e ficoeritrina sono sue pigmenti algali presenti nel fitoplancton
            ed in particolare nei cianobatteri. La loro misura può quindi essere utilizzata
            come indicatore della presenza e della densità di questo gruppo e il loro
            aumento temporale puo' essere un possibile segnale dello sviluppo di una
            fioritura di cianobatteri.
            `,
            breveDescrizione:`Concentrazione di ficoeritrina, pigmento indicatore della presenza di cianobatteri`,
            // icon:'fa fa-flask text-primary',
            icon:'icon-water_PC',
            annuale:false,
        },

        'water-Biovol': {
            title : 'Biovolume del fitoplancton',
            description: `Il biovolume totale del fitoplancton è indicativo della produttività algale
            complessiva di un lago. Il biovolume varia nel corso dell'anno, con i massimi
            di solito in corrispondenza dei mesi estivi. Viene misurato sulla base
            dei conteggi degli organismi fitoplanctonici presenti.
            `,
            breveDescrizione:`Valore medio annuo del biovolume fitoplanctonico`,
            // icon:'fa fa-circle text-primary',
            icon:'icon-water_biovol',
            annuale:true,
            limite : {
                maggiore:null,
                lugano:null
            },
            obiettivo : {
                maggiore:null,
                lugano:null
            },
        },
        'biovol': {
            title : 'Biovolume del fitoplancton',
            description: `Il biovolume totale del fitoplancton è indicativo della produttività algale
            complessiva di un lago. Il biovolume varia nel corso dell'anno, con i massimi
            di solito in corrispondenza dei mesi estivi. Viene misurato sulla base
            dei conteggi degli organismi fitoplanctonici presenti.
            `,
            breveDescrizione:`Valore medio annuo del biovolume fitoplanctonico`,
            // icon:'fa fa-circle text-primary',
            icon:'icon-water_biovol',
            annuale:true,
            limite : {
                maggiore:null,
                lugano:null
            },
            obiettivo : {
                maggiore:null,
                lugano:null
            },
        },

        'indice-IPAM-fitoplancton': {
            title : 'Indice IPAM fitoplancton',
            description: `L’indice IPAM rappresenta il metodo italiano di valutazione del fitoplancton.
            La valutazione viene effettuata sulla base dei valori di un anno di
            campionamento. Si basa sulla media dei valori di due indici, l’Indice medio
            di biomassa e l’Indice di composizione (PTI - Phytoplancton Trophic Index).
            Il calcolo di questi due indici si basa a sua volta su più componenti:
            concentrazione media di clorofilla a, biovolume medio, PTIot o PTIspecies
            in base alla tipologia, percentuale di cianobatteri per le acque eutrofe.
            L’IPAM può quindi essere considerato un indice prevalentemente trofico.
            Concorre insieme agli indici LFI, MTIspecies/MacroIMMI, LTLeco, SQA inquinanti
            specifici, alla definizione dello Stato Ecologico del Corpo Idrico Corpo Idrico
            superficiale (CI) lacustre.
            `,
            breveDescrizione:`Valore dell'indice IPAM`,
            // icon:'fa fa-italic text-primary',
            icon:'icon-indice_IPAM',
            annuale:true,
        },

        'IPAM': {
            title : 'Indice IPAM fitoplancton',
            description: `L’indice IPAM rappresenta il metodo italiano di valutazione del fitoplancton.
            La valutazione viene effettuata sulla base dei valori di un anno di
            campionamento. Si basa sulla media dei valori di due indici, l’Indice medio
            di biomassa e l’Indice di composizione (PTI - Phytoplancton Trophic Index).
            Il calcolo di questi due indici si basa a sua volta su più componenti:
            concentrazione media di clorofilla a, biovolume medio, PTIot o PTIspecies
            in base alla tipologia, percentuale di cianobatteri per le acque eutrofe.
            L’IPAM può quindi essere considerato un indice prevalentemente trofico.
            Concorre insieme agli indici LFI, MTIspecies/MacroIMMI, LTLeco, SQA inquinanti
            specifici, alla definizione dello Stato Ecologico del Corpo Idrico Corpo Idrico
            superficiale (CI) lacustre.
            `,
            breveDescrizione:`Valore dell'indice IPAM`,
            // icon:'fa fa-italic text-primary',
            icon:'icon-indice_IPAM',
            annuale:true,
        },

        'water-Cyano': {
            title : 'Cianobatteri',
            description: `I cianobatteri sono un gruppo di microrganismi fotosintetici che, in presenza
            di particolari condizioni ambientali favorevoli, possono raggiungere densità
            molto elevate formando fioriture. Alcune specie di cianobatteri d’acqua dolce
            producono come metaboliti secondari delle tossine, dette cianotossine.
            La normativa prevede che per concentrazioni >100000 cell/ml di cianobatteri
            totali venga sconsigliata o vietata la balneazione per la possibile insorgenza
            di effetti negativi sulla salute umana. Il contributo percentuale dei
            cianobatteri alla biomassa totale fitoplancton è quindi un indicatore dello
            stato qualitativo delle acque.
            `,
            breveDescrizione:`% di cianobatteri sullabiomassa fitoplanctonica totale`,
            // icon:'fa  fa-flask text-primary',
            icon:'icon-cianobatteri',
            annuale:false,
        },
        'Ciano%': {
            title : 'Cianobatteri',
            description: `I cianobatteri sono un gruppo di microrganismi fotosintetici che, in presenza
            di particolari condizioni ambientali favorevoli, possono raggiungere densità
            molto elevate formando fioriture. Alcune specie di cianobatteri d’acqua dolce
            producono come metaboliti secondari delle tossine, dette cianotossine.
            La normativa prevede che per concentrazioni >100000 cell/ml di cianobatteri
            totali venga sconsigliata o vietata la balneazione per la possibile insorgenza
            di effetti negativi sulla salute umana. Il contributo percentuale dei
            cianobatteri alla biomassa totale fitoplancton è quindi un indicatore dello
            stato qualitativo delle acque.
            `,
            breveDescrizione:`% di cianobatteri sullabiomassa fitoplanctonica totale`,
            // icon:'fa  fa-flask text-primary',
            icon:'icon-cianobatteri',
            annuale:false,
        },
        'air-temperature': {
            title : 'Temperatura dell\'aria',
            description: `La temperatura dell'aria, così come gli altri parametri rilevati dalle stazioni
            meteorologiche collocate sulle boe/piattaforme, può essere di supporto
            all'intrepretazione dei parametri limnologici misurati dai sensori o attraverso
            i monitoraggi.
            `,
            breveDescrizione:`Temperatura dell'aria rilevata dalla stazione meteo sulla boa/piattaforma`,
            // icon:'fa fa-sun-o text-warning',
            // icon:'fa fa-question-circle-o text-info',
            icon:'icon-air_temperature',
            annuale:false,
        },

        'wind-speed-max': {
            title : 'Velocità del vento',
            description: `Velocità e direzione del vento possono essere di supporto all'interpretazione
            degli altri parametri limnologici rilevati: in partcolare ilvento svolge
            un ruolo importante nelle dinamiche di stratificazione e mescolamento dei laghi.
            `,
            breveDescrizione:`Velocità del vento rilevata dalla stazione meteo sulla boa/piattaforma`,
            // icon:'fa  fa-fighter-jet text-info',
            icon:'icon-wind_speed',
            annuale:false,
        },
        'wind-speed': {
            title : 'Velocità del vento',
            description: `Velocità e direzione del vento possono essere di supporto all'interpretazione
            degli altri parametri limnologici rilevati: in partcolare ilvento svolge
            un ruolo importante nelle dinamiche di stratificazione e mescolamento dei laghi.
            `,
            breveDescrizione:`Velocità del vento rilevata dalla stazione meteo sulla boa/piattaforma`,
            // icon:'fa  fa-fighter-jet text-info',
            icon:'icon-wind_speed',
            annuale:false,
        },

        //non presenti nel file excell fornito ma presenti su piattaforma:

        'wind-direction': {
            title : 'Direzione del vento',
            description: `Direzione e velocità del vento possono essere di supporto all'interpretazione
            degli altri parametri limnologici rilevati: in partcolare ilvento svolge
            un ruolo importante nelle dinamiche di stratificazione e mescolamento dei laghi.
            `,
            breveDescrizione:`Direzione del vento rilevata dalla stazione meteo sulla boa/piattaforma`,
            // icon:'fa fa-flag text-info',
            icon:'icon-wind_direction',
            annuale:false,
        },

        'air-pressure': {
            title : 'Pressione dell\'aria',
            description: `Pressione dell'aria
            `,
            breveDescrizione:`Pressione dell'aria`,
            // icon:'fa fa-arrows-h text-info',
            icon:' icon-air_pressure',
            annuale:false,
        },

        'air-relative-humidity': {
            title : "Umidità dell'aria",
            description: "Umidità dell'aria",
            breveDescrizione: "Umidità dell'aria",
            // icon: 'fa fa-tint text-info',
            icon:' icon-air_humidity',
            annuale:false,
        },

        'global-radiation': {
            title : 'Radiazione globali',
            description: `Radiazione globali
            `,
            breveDescrizione:`Radiazione globali`,
            // icon:'fa fa-bolt text-info',
            // icon:'icon-global_radiation',
            icon:'fa fa-sun-o',
            annuale:false,
        },
        'solar-radiation': {
            title : 'Radiazione solare',
            description: `Radiazione solare
            `,
            breveDescrizione:`Radiazione solare`,
            // icon:'fa fa-bolt text-info',
            // icon:'icon-global_radiation',
            icon:'fa fa-sun-o',
            annuale:false,
        },
        'water-TN': {
            title : 'Media annua di N totale',
            description: `Valore medio annuo delle concentrazioni (medie sulla colonna d'acqua ponderate sui volumi) di N totale.
             La media annua è calcolata a parire dai valori ottenuti nei monitoraggi mensili o con altra frequenza temporale.
            `,
            breveDescrizione:`Valore medio annuo delle concentrazioni di N totale`,
            // icon:'fa fa-bolt text-info',
            icon: 'fa fa-flask',
            annuale:true,
            limite : {
                maggiore:null,
                lugano:null
            },
            obiettivo : {
                maggiore:null,
                lugano:null
            },

        },

        'water-TSS': {
            title : 'Solidi Totali Sospesi',
            description: `Concentrazione media di Solidi Totali Sospesi (TSS)`,
            breveDescrizione:`Concentrazione media di Solidi Totali Sospesi (TSS)`,
            // icon:'fa fa-bolt text-info',
            icon:'icon-water_CHl_a',
            annuale:false,
        },

        'sat-water-TSS': {
            title : 'Solidi Totali Sospesi',
            description: `Concentrazione media di Solidi Totali Sospesi (TSS)`,
            breveDescrizione:`Concentrazione media di Solidi Totali Sospesi (TSS)`,
            // icon:'fa fa-bolt text-info',
            icon:'icon-water_CHl_a',
            annuale:false,
        },

        'water-oxygen-class': {
            title : 'Classi di ossigenazione',
            description: `Il livello di ossigeno presente nei laghi e nei corsi
            d'acqua è comunemente usato come indicatore della qualità dell'acqua.
            indicatore della qualità dell'acqua. Il mantenimento di concentrazioni
            adeguate di ossigeno è di vitale importanza per sostenere pesci,
            invertebrati e altre forme di vita acquatica.`,
            breveDescrizione:`Classi di ossigenazione`,
            // icon:'fa fa-bolt text-info',
            icon:'icon-water_O2S',
            annuale:false,
        },

    };

indicatorDescription['NLoad'] = indicatorDescription['Nload'];
indicatorDescription['Biovol'] = indicatorDescription['biovol'];
indicatorDescription["water-temperature-pH"] = indicatorDescription["water-temperature"]
indicatorDescription['indice-LTLeco'] = indicatorDescription['LTLeco']
    //per accedere alle mie descrizioni
//var indicatorID1 =indicatorDescription["indicatorID1"];
//var indicatorID2 =indicatorDescription["indicatorID2"];

function getCardIcon (name) {


    if(indicatorDescription[name]==undefined || indicatorDescription[name].icon==undefined){
         return 'fa fa-question-circle-o text-info';
    }
    else {
        return indicatorDescription[name].icon;
    }

};

export default {indicatorDescription, getCardIcon};
