const devProxyConf = {
    port: 8000,
    host: window.location.hostname,
    name: 'istsos'
};

const proxyConf = {
    port: 80,
    host: 'simile.ddns.net', // window.location.hostname,
    name: 'api/istsos'
};

const config = {
    istsosProxy: devProxyConf
};
module.exports = config;
