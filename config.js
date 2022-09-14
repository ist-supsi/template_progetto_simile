// Configurazione di sviluppo locale
const devProxyConf = {
    port: ':8000',
    host: window.location.hostname,
    name: 'istsos'
};

// Configurazione di deploy su server SUPSI
const proxyConf = {
    port: '',
    host: 'simile.ddns.net', // window.location.hostname,
    name: 'api/istsos'
};

const config = {
    istsosProxy: devProxyConf,
    verbanoIstsos: {
        proxyEndpoint: 'verbano',
        baseUrl: 'http://150.145.35.198:2000',
        endpoint:  'maggiorelive'
    },
    larioIstsos: {
        proxyEndpoint: 'lario',
        baseUrl: 'http://150.145.35.198:2000',
        endpoint:  'lariolive'
    },
    ceresioIstsos: {
        proxyEndpoint: 'index',
        baseUrl: 'https://istsos.ddns.net',
        endpoint:  'ceresiohourly'
    }
};

module.exports = config;
