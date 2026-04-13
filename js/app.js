// APP.JS - Core Application Logic for TaxiGo

const APP = {
    currentRole: null,
    user: null,
    orders: {},
    drivers: {},
    
    init() {
        console.log('🚕 Sinfra TaxiGo initialized');
        this.loadUserData();
        this.setupServiceWorker();
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        const clientBtn = document.getElementById('client-btn');
        const driverBtn = document.getElementById('driver-btn');
        const adminBtn = document.getElementById('admin-btn');
        
        if(clientBtn) clientBtn.addEventListener('click', () => this.selectRole('client'));
        if(driverBtn) driverBtn.addEventListener('click', () => this.selectRole('driver'));
        if(adminBtn) adminBtn.addEventListener('click', () => this.selectRole('admin'));
    },
    
    selectRole(role) {
        this.currentRole = role;
        localStorage.setItem('currentRole', role);
        
        switch(role) {
            case 'client':
                window.location.href = 'pages/client.html';
                break;
            case 'driver':
                window.location.href = 'pages/driver.html';
                break;
            case 'admin':
                window.location.href = 'pages/admin.html';
                break;
        }
    },
    
    loadUserData() {
        const stored = localStorage.getItem('userProfile');
        if(stored) {
            this.user = JSON.parse(stored);
        }
    },
    
    saveUserData(data) {
        this.user = data;
        localStorage.setItem('userProfile', JSON.stringify(data));
    },
    
    setupServiceWorker() {
        if('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(() => {
                console.log('ServiceWorker not supported');
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => APP.init());