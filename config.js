// Configurazione di sviluppo locale
const devProxyConf = {
    port: ':8000',
    host: window.location.hostname,
    name: 'istsos'
};

// Configurazione di deploy su server SUPSI
const proxyConf = {
    port: '',
    // host: 'simile.ddns.net', // window.location.hostname,
    host: window.location.hostname,
    name: 'api/istsos'
};

const config = {
    istsosProxy: devProxyConf,
    verbanoIstsos: {
        proxyEndpoint: 'verbano',
        baseUrl: 'https://limnodata.irsa.cnr.it',
        endpoint:  'maggiorelive'
    },
    larioIstsos: {
        proxyEndpoint: 'lario',
        baseUrl: 'https://limnodata.irsa.cnr.it',
        endpoint:  'lariolive'
    },
    ceresioIstsos: {
        proxyEndpoint: 'ceresio',
        baseUrl: 'https://ecolake.supsi.ch',
        endpoint:  'ceresiohourly'
    },
    vareseIstsos: {
        proxyEndpoint: 'varese',
        baseUrl: 'https://limnodata.irsa.cnr.it',
        endpoint:  'vareselive'
    },
    apikeys: {
        stadiamaps: "5215a8ea-9563-412f-ae94-686f868a6fa3"
    }
};

module.exports = config;
