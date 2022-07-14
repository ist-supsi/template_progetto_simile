import NotifyButton from  './components/NotifyButton.vue'

//creo un dizionario delle descrizioni degli indicatori, da visualizzare nel tasto info. 
let indicatorDescription = { 
    //temperatura-superficiale
    'water-temperature': 
    `La misura delle temperatura dell'acqua permette di seguire il ciclo termico 
    del lago nel corso dell'anno. Dalla temperatura dipendono processi importanti 
    come la stratificazione/circolazione delle acque, la quantità di ossigeno in 
    coluaione, lo sviluppo delle fioriture algali. Inoltre il monitoraggio a lungo 
    termine delle temperature è utile per valutare la risposta del lago ai 
    cambiamenti climatici.
    `,
    //trasparenza
    'water-SDT': 
    `La trasparenza rappresenta la misura dell’attenuazione della radiazione 
    luminosa lungo la  colonna d’acqua. Dipende dalla presenza nell’acqua di soluti
    e particelle, tra cui le cellule di fitoplancton, che possono assorbire o 
    disperdere la luce. La trasparenza può essere misurata con il Disco di Secchi.
    Una bassa trasperenza puo' essere indicativa della presenza di una fioritura
    algale ma anche di solidi sopsesi dovuti agli apporti a lago, ad esempio dopo 
    forti eventi di precipitazione.
     `,
    //massima-profondita-di-mescolamento 
    'water-depth': 
    `La massima profondità di mescolamento alla circolazione tardo-invernale 
    (tra febbraio e marzo) indica lo strato rimescolato, ovvero lo strato delle 
    acque interessate da omogenizzazione termica e ridistribuzione di ossigeno e 
    nutrienti.
    `,
    //pH
    'pH': 
    `Il pH è un valore numerico che indica l’acidità di una soluzione. Valori 
    compresi tra 6 e 9 sono in genere compatibili con la vita degli organismi 
    acquatici; valori al di fuori di questo range sono solitamente la conseguenza 
    di apporti di sostanze inquinanti acide o basiche. pH elevati, anche superiori
    a 9, si possono rilevare nelle acque superficiali in estate in corrispindenza 
    di fioriture algali. 
    `,
    //conducibilità
    'conducibilità': 
    `La conducibilità indica la capacità dell’acqua di trasmettere elettricità e 
    dipende dagli ioni in soluzione, quindi aumenta all'aumentare della 
    concentrazione dei soluti presenta nell’acqua stessa. La conducibilità puo' 
    quindi indicare aumento/diminuzione nella presenza di soluti, ad esempio a 
    causa di fattori meteo-climatici e idrologici. 
    `,
    //ossigeno-disciolto-concentrazione
    'ossigeno-disciolto-concentrazione': 
    `La presenza di ossigeno nelle acque deriva dallo scambio con l'atmosfera e 
    dai processi biologici operati dagli organismi acquatici (fotosintesi e 
    respirazione). Valori elevati si trovano solitamente nelle acque 
    superficiali nel periodo estivo. Bassi valori (ipossia) o totale assenza 
    di ossigeno (anossia) possono caratterizzare le acque profonde dei laghi 
    eutrofi, in cui la sostanza organica prodotta negli strati superficiali 
    sedimenta e viene decomposta dagli organismi aerobi che sottraggono 
    ossigeno all’acqua. 
    `,
    //ossigeno-disciolto-%-di-saturazione
    'water-O2S': 
    `L'ossigeno, oltre che come concentrazione, può essere espresso come % rispetto
    alla saturazione, ovvero la quantità di ossigeno presente rispetto al valore
    massimo, preso uguale a cento, che si può avere nelle stesse condizioni di 
    salinità, di temperatura e pressione atmosferica. Valori superiodi al 100%
    indicano condizioni di sovrassaturazione. 
    `,
    //Solidi-sospesi-totali
    'Solidi-sospesi-totali': 
    `I solidi sospesi foniscono informazioni sulla presenza di sostanze indisciolte
     nelle acque. Sono correlati alla trasparenza/torbidità.
    `,
    //carico-di-fosforo 
    'water-PTOT': 
    `Il carico di P è la quantità totale di questo elemento che si stima essere 
    apportata al lago nell'arco di un anno. Si calcola come somma degli apporti 
    dai singoli tributari, sulla base di concentrazioni e deflussi, e dall'eventuale
    areale non drenato. 
    `,
    //carico-di-azoto 
    'water-Nload': 
    `Il carico di N è la quantità totale di questo elemento che si stima essere 
    apportata al lago nell'arco di un anno. Si calcola come somma degli apporti 
    dai singoli tributari, sulla base di concentrazioni e deflussi, e dall'eventuale
    areale non drenato.  
    `,
    //concentrazione-di-fosforo
    'water-Pload': 
    `Valore medio annuo delle concentrazioni (medie sulla colonna d'acqua ponderate
    sui volumi) di P totale. La media annua è calcolata a parire dai valori 
    ottenuti nei monitoraggi mensili o con altra frequenza temporale.   
    `,
    //concentrazione-di-azoto
    'concentrazione-di-azoto': 
    `Valore medio annuo delle concentrazioni (medie sulla colonna d'acqua ponderate
    sui volumi) di N totale. La media annua è calcolata a parire dai valori 
    ottenuti nei monitoraggi mensili o con altra frequenza temporale.    
    `,
    //indice-LTLeco
    'indice-LTLeco': 
    `Indice che descrive lo stato trofico di un lago; basato sulla somma di punteggi
    derivanti dal valore di P totale alla circolazione, trasperenza media annua, 
    e valori di ossigeno alla saturazione in ipolimnio a fine stratificazione.  
    `,
    //clorofilla-a
    'water-Chl-a': 
    `La clorofilla è un pigmento presente nel fitoplancton. La sua misura può quindi
    essere utilizzata come indicatore della densità del fitoplancton e della 
    biomassa algale presente. I suoi valori variano nell’arco dell’anno e a seconda
    della profondità, con i massimi nei mesi estivi in coincidenza della maggior 
    produttività algale. La concentrazione è più alta nei laghi più produttivi o 
    eutrofi. L'aumento dei valori di clorofilla può essereutilizzato come segnale 
    dello sviluppo di una fioritura algale.   
    `,
    //altri-pigmenti-algali-ficocianina-e-fitoplancton 
    'water-PC': 
    `Ficocianina e ficoeritrina sono sue pigmenti algali presenti nel fitoplancton 
    ed in particolare nei cianobatteri. La loro misura può quindi essere utilizzata 
    come indicatore della presenza e della densità di questo gruppo e il loro 
    aumento temporale puo' essere un possibile segnale dello sviluppo di una 
    fioritura di cianobatteri.
    `,
    //biovolume-del-fitoplancton 
    'water-Biovol': 
    `Il biovolume totale del fitoplancton è indicativo della produttività algale 
    complessiva di un lago. Il biovolume varia nel corso dell'anno, con i massimi 
    di solito in corrispondenza dei mesi estivi. Viene misurato sulla base 
    dei conteggi degli organismi fitoplanctonici presenti.
    `,
    //indice-IPAM-fitoplancton
    'indice-IPAM-fitoplancton': 
    `L’indice IPAM rappresenta il metodo italiano di valutazione del fitoplancton. 
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
    //cianobatteri
    'cianobatteri': 
    `I cianobatteri sono un gruppo di microrganismi fotosintetici che, in presenza 
    di particolari condizioni ambientali favorevoli, possono raggiungere densità
    molto elevate formando fioriture. Alcune specie di cianobatteri d’acqua dolce 
    producono come metaboliti secondari delle tossine, dette cianotossine. 
    La normativa prevede che per concentrazioni >100000 cell/ml di cianobatteri 
    totali venga sconsigliata o vietata la balneazione per la possibile insorgenza
    di effetti negativi sulla salute umana. Il contributo percentuale dei 
    cianobatteri alla biomassa totale fitoplancton è quindi un indicatore dello
    stato qualitativo delle acque. 
    `,
    //temperatura-dell-aria 
    'air-temperature': 
    `La temperatura dell'aria, così come gli altri parametri rilevati dalle stazioni
    meteorologiche collocate sulle boe/piattaforme, può essere di supporto 
    all'intrepretazione dei parametri limnologici misurati dai sensori o attraverso
    i monitoraggi. 
    `,
    //velocità-del-vento 
    'wind-speed-max': 
    `Velocità e direzione del vento possono essere di supporto all'interpretazione 
    degli altri parametri limnologici rilevati: in partcolare ilvento svolge 
    un ruolo importante nelle dinamiche di stratificazione e mescolamento dei laghi.  
    `,
    //direzione-del-vento
    'wind-direction': 
    `direzione del vento  
    `,
    //non presente nel file excell fornito ma presente su piattaforma
    'air-pressure': 
    `pressione dell'aria
    `,
    //non presente nel file excell fornito ma presente su piattaforma
    'air-relative-humidity': 
    `umidità dell'aria
    `,
    //non presente nel file excell fornito ma presente su piattaforma
    'global-radiation': 
    `radiazione globali
    `,
};

//per accedere alle mie descrizioni
//var indicatorID1 =indicatorDescription["indicatorID1"]; 
//var indicatorID2 =indicatorDescription["indicatorID2"];

export default indicatorDescription;

