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
    istsosProxy: devProxyConf
};
module.exports = config;
