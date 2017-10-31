const host = window.location.hostname;

const hosts = {
    'dev': ['localhost', '127.0.0.1'],
    'public': ['promo.maximarkets.org', 'promo.maximarkets.pp.ua']
};

const root = {
    'dev': '',
    'public': ''
}

export const apiLinks = {
    logout: {
        dev: '',
        public: '../dashboard/logout.php'
    },
    actions: {
        dev: 'http://promo.maximarkets.org/rlp/api/core/actions.php',
        public: '../api/core/actions.php'
    },
    upload: {
        dev: 'http://promo.maximarkets.org/rlp/api/core/uploadFile.php',
        public: '../api/core/uploadFile.php'
    }
};

export let currentHost;

for (let key in hosts) {
    if (hosts[key].includes(host)) currentHost = key;
}

export let rootFolder = root[currentHost];
