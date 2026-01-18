document.addEventListener('DOMContentLoaded', function() {
    initSidebarInteractions();
    initProcessCardInteractions();
    initHeaderActions();
    initNavbarInteractions();
    initDataFlowAnimation();
    initScrollAnimations();
    initLoopAnimation();
    initDashboardSummary();
});

function initSidebarInteractions() {
    const menuItems = document.querySelectorAll('.saas-menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initProcessCardInteractions() {
    const processCards = document.querySelectorAll('.saas-process-card');
    
    processCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const phase = this.getAttribute('data-phase');
            const phaseIcon = this.querySelector('.saas-phase-icon');
            
            if (phaseIcon) {
                phaseIcon.style.transform = 'scale(1.1) rotate(5deg)';
            }
            
            this.style.boxShadow = '0 12px 40px rgba(15, 122, 234, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            const phaseIcon = this.querySelector('.saas-phase-icon');
            
            if (phaseIcon) {
                phaseIcon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            this.style.boxShadow = '';
        });
        
        card.addEventListener('click', function() {
            const phase = this.getAttribute('data-phase');
            showPhaseDetails(phase);
        });
    });
}

function showPhaseDetails(phase) {
    const phaseNames = [
        '卖家注册登录',
        '产品开发与分析',
        '视觉内容创作',
        'Listing智能生成',
        '发布与平台审核',
        '订单管理',
        '客服服务',
        '采购与库存管理',
        '补货与发货',
        '数据复盘与优化'
    ];
    
    alert(`阶段${phase}: ${phaseNames[phase]}\n\n点击查看详细功能说明`);
}

function initHeaderActions() {
    const buttons = document.querySelectorAll('.saas-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function initNavbarInteractions() {
    const navLinks = document.querySelectorAll('.saas-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const logoutBtn = document.querySelector('.saas-logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('确定要退出登录吗？')) {
                window.location.href = 'index.html';
            }
        });
    }
}

function initDataFlowAnimation() {
    const dataFlowBg = document.querySelector('.data-flow-bg');
    
    if (dataFlowBg) {
        const particles = [];
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(15, 122, 234, 0.3);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            dataFlowBg.appendChild(particle);
            particles.push({
                element: particle,
                x: Math.random() * 100,
                y: Math.random() * 100,
                speedX: (Math.random() - 0.5) * 0.08,
                speedY: (Math.random() - 0.5) * 0.08
            });
        }

        function animateParticles() {
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0) particle.x = 100;
                if (particle.x > 100) particle.x = 0;
                if (particle.y < 0) particle.y = 100;
                if (particle.y > 100) particle.y = 0;

                particle.element.style.left = particle.x + '%';
                particle.element.style.top = particle.y + '%';
                particle.element.style.opacity = Math.random() * 0.5 + 0.2;
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const processCards = document.querySelectorAll('.saas-process-card');
    processCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

function initLoopAnimation() {
    const loopIndicator = document.querySelector('.saas-loop-indicator');
    
    if (loopIndicator) {
        const loopLine = loopIndicator.querySelector('.saas-loop-line');
        const loopArrow = loopIndicator.querySelector('.saas-loop-arrow');
        
        let isAnimating = true;
        
        function animateLoop() {
            if (!isAnimating) return;
            
            loopLine.style.opacity = Math.sin(Date.now() / 1000) * 0.5 + 0.5;
            
            requestAnimationFrame(animateLoop);
        }
        
        animateLoop();
        
        loopIndicator.addEventListener('mouseenter', () => {
            isAnimating = false;
            loopLine.style.opacity = '1';
        });
        
        loopIndicator.addEventListener('mouseleave', () => {
            isAnimating = true;
        });
    }
}

function initConnectionLines() {
    const connectionLines = document.querySelectorAll('.saas-connection-line');
    
    connectionLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transition = `opacity 0.5s ease ${index * 0.15}s`;
        
        setTimeout(() => {
            line.style.opacity = '1';
        }, 500 + index * 150);
    });
}

document.addEventListener('DOMContentLoaded', initConnectionLines);

function initPhaseIndicators() {
    const phaseIndicators = document.querySelectorAll('.saas-phase-indicator');
    
    phaseIndicators.forEach((indicator, index) => {
        indicator.style.animation = `pulse 2s ease-in-out ${index * 0.2}s infinite`;
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: translateY(-50%) scale(1);
                box-shadow: 0 0 10px rgba(15, 122, 234, 0.5);
            }
            50% {
                transform: translateY(-50%) scale(1.2);
                box-shadow: 0 0 20px rgba(15, 122, 234, 0.8);
            }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', initPhaseIndicators);

function initTooltip() {
    const processCards = document.querySelectorAll('.saas-process-card');
    
    processCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const phase = this.getAttribute('data-phase');
            const phaseTitle = this.querySelector('.saas-phase-title').textContent;
            const phaseDesc = this.querySelector('.saas-phase-desc').textContent;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'saas-tooltip';
            tooltip.innerHTML = `
                <div class="saas-tooltip-title">${phaseTitle}</div>
                <div class="saas-tooltip-desc">${phaseDesc}</div>
            `;
            
            tooltip.style.cssText = `
                position: fixed;
                background: rgba(18, 18, 26, 0.95);
                border: 1px solid rgba(15, 122, 234, 0.3);
                border-radius: 8px;
                padding: 1rem;
                max-width: 300px;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
                box-shadow: 0 8px 30px rgba(15, 122, 234, 0.2);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.right + 10 + 'px';
            tooltip.style.top = rect.top + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initTooltip);

function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const tooltips = document.querySelectorAll('.saas-tooltip');
            tooltips.forEach(tooltip => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initKeyboardNavigation);

function initResponsiveSidebar() {
    const sidebar = document.querySelector('.saas-sidebar');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'saas-menu-toggle';
    menuToggle.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="3" y1="6" x2="21" y2="6" stroke="white" stroke-width="2"/>
            <line x1="3" y1="12" x2="21" y2="12" stroke="white" stroke-width="2"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="white" stroke-width="2"/>
        </svg>
    `;
    menuToggle.style.cssText = `
        display: none;
        position: fixed;
        top: 80px;
        left: 1rem;
        z-index: 1000;
        background: rgba(15, 122, 234, 0.9);
        border: none;
        border-radius: 8px;
        padding: 0.75rem;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(menuToggle);
    
    function checkResponsive() {
        if (window.innerWidth <= 1024) {
            menuToggle.style.display = 'block';
            sidebar.style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            sidebar.style.display = 'block';
        }
    }
    
    menuToggle.addEventListener('click', function() {
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'block';
            sidebar.style.position = 'fixed';
            sidebar.style.top = '70px';
            sidebar.style.left = '0';
            sidebar.style.right = '0';
            sidebar.style.zIndex = '999';
            sidebar.style.background = 'rgba(18, 18, 26, 0.98)';
        } else {
            sidebar.style.display = 'none';
        }
    });
    
    window.addEventListener('resize', checkResponsive);
    checkResponsive();
}

document.addEventListener('DOMContentLoaded', initResponsiveSidebar);

function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'saas-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0A0A0F;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 3px solid rgba(15, 122, 234, 0.1);
        border-top-color: #0F7AEA;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    });
}

let globalCurrency = 'usd';
const globalExchangeRate = 7.2;

function initDashboardSummary() {
    const currencyBtns = document.querySelectorAll('.currency-btn');
    const refreshBtn = document.getElementById('refreshDashboardBtn');
    
    currencyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currencyBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            globalCurrency = this.getAttribute('data-currency');
            updateDashboardData();
            updateProductSKUsData();
        });
    });
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            refreshDashboardData();
        });
    }
    
    function generateOrderData() {
        const todayOrders = Math.floor(Math.random() * 100) + 50;
        const todaySalesUSD = Math.floor(Math.random() * 50000) + 10000;
        const monthOrders = Math.floor(Math.random() * 2000) + 1000;
        const monthSalesUSD = Math.floor(Math.random() * 500000) + 200000;
        
        const pendingOrders = Math.floor(Math.random() * 50) + 10;
        const shippedOrders = Math.floor(Math.random() * 100) + 50;
        const completedOrders = Math.floor(Math.random() * 200) + 100;
        const refundedOrders = Math.floor(Math.random() * 20) + 5;
        
        const avgOrderValueUSD = todaySalesUSD / todayOrders;
        const conversionRate = (Math.random() * 5 + 2).toFixed(2);
        
        return {
            todayOrders,
            todaySalesUSD,
            monthOrders,
            monthSalesUSD,
            pendingOrders,
            shippedOrders,
            completedOrders,
            refundedOrders,
            avgOrderValueUSD,
            conversionRate
        };
    }
    
    function formatCurrency(amount, currency) {
        if (currency === 'cny') {
            return '¥' + (amount * globalExchangeRate).toLocaleString('zh-CN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        } else {
            return '$' + amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    }
    
    function updateDashboardData() {
        const data = generateOrderData();
        
        document.getElementById('todayOrders').textContent = data.todayOrders.toLocaleString();
        document.getElementById('todaySales').textContent = formatCurrency(data.todaySalesUSD, globalCurrency);
        document.getElementById('monthOrders').textContent = data.monthOrders.toLocaleString();
        document.getElementById('monthSales').textContent = formatCurrency(data.monthSalesUSD, globalCurrency);
        
        document.getElementById('pendingOrders').textContent = data.pendingOrders.toLocaleString();
        document.getElementById('shippedOrders').textContent = data.shippedOrders.toLocaleString();
        document.getElementById('completedOrders').textContent = data.completedOrders.toLocaleString();
        document.getElementById('refundedOrders').textContent = data.refundedOrders.toLocaleString();
        document.getElementById('avgOrderValue').textContent = formatCurrency(data.avgOrderValueUSD, globalCurrency);
        document.getElementById('conversionRate').textContent = data.conversionRate + '%';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('lastUpdatedTime').textContent = '更新于: ' + timeString;
    }
    
    function refreshDashboardData() {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="spin">
                <circle cx="8" cy="8" r="7" stroke="#0F7AEA" stroke-width="2" stroke-dasharray="4 2"/>
            </svg>
            刷新中...
        `;
        
        setTimeout(() => {
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8 A6 6 0 0 1 14 8" stroke="#0F7AEA" stroke-width="2" stroke-linecap="round"/>
                    <path d="M14 8 A6 6 0 0 1 2 8" stroke="#0F7AEA" stroke-width="2" stroke-linecap="round"/>
                </svg>
                刷新
            `;
            updateDashboardData();
        }, 1000);
    }
    
    updateDashboardData();
    
    setInterval(updateDashboardData, 10000);
    
    initProductSKUs();
}

function initProductSKUs() {
    let products = generateProductData();
    
    const skuFilter = document.getElementById('skuFilter');
    const skuSearch = document.getElementById('skuSearch');
    
    if (skuFilter) {
        skuFilter.addEventListener('change', function() {
            filterAndDisplayProducts();
        });
    }
    
    if (skuSearch) {
        skuSearch.addEventListener('input', function() {
            filterAndDisplayProducts();
        });
    }
    
    function generateProductData() {
        const productNames = [
            '无线蓝牙耳机 Pro', '智能手表 Ultra', '便携式充电宝 20000mAh', 'USB-C 数据线 3米',
            '无线充电器 15W', '手机支架 铝合金', '蓝牙音箱 防水', '智能手环 运动版',
            'Type-C 扩展坞', '无线鼠标 静音', '机械键盘 RGB', '网络摄像头 1080P',
            '平板电脑支架', '笔记本散热器', '无线充电宝 10000mAh', '智能插座 WiFi',
            'LED 台灯 护眼', '手机壳 硅胶', '屏幕保护膜 钢化', '车载充电器 双口'
        ];
        
        const skus = [];
        for (let i = 0; i < 20; i++) {
            const priceUSD = Math.floor(Math.random() * 100) + 10;
            const orders = Math.floor(Math.random() * 500) + 10;
            const revenueUSD = priceUSD * orders;
            const stock = Math.floor(Math.random() * 200);
            
            let stockStatus = 'normal';
            if (stock === 0) {
                stockStatus = 'out';
            } else if (stock < 20) {
                stockStatus = 'low';
            }
            
            skus.push({
                sku: `SKU-${String(i + 1).padStart(4, '0')}`,
                name: productNames[i],
                priceUSD: priceUSD,
                revenueUSD: revenueUSD,
                orders: orders,
                stock: stock,
                stockStatus: stockStatus
            });
        }
        
        return skus;
    }
    
    function formatCurrency(amount, currency) {
        if (currency === 'cny') {
            return '¥' + (amount * globalExchangeRate).toLocaleString('zh-CN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        } else {
            return '$' + amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    }
    
    function updateStats() {
        const totalProducts = products.length;
        const lowStockCount = products.filter(p => p.stockStatus === 'low').length;
        const outOfStockCount = products.filter(p => p.stockStatus === 'out').length;
        const totalRevenueUSD = products.reduce((sum, p) => sum + p.revenueUSD, 0);
        const totalOrders = products.reduce((sum, p) => sum + p.orders, 0);
        
        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('lowStockCount').textContent = lowStockCount;
        document.getElementById('outOfStockCount').textContent = outOfStockCount;
        document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenueUSD, globalCurrency);
        document.getElementById('totalOrders').textContent = totalOrders.toLocaleString();
    }
    
    function renderProducts(productsToRender) {
        const tbody = document.getElementById('skusTableBody');
        tbody.innerHTML = '';
        
        productsToRender.forEach(product => {
            const tr = document.createElement('tr');
            
            const stockClass = product.stockStatus === 'low' ? 'low' : (product.stockStatus === 'out' ? 'out' : '');
            const statusClass = product.stockStatus;
            const statusText = product.stockStatus === 'normal' ? '库存正常' : (product.stockStatus === 'low' ? '库存不足' : '缺货');
            
            tr.innerHTML = `
                <td><span class="sku-code">${product.sku}</span></td>
                <td><span class="product-name">${product.name}</span></td>
                <td><span class="sku-price">${formatCurrency(product.priceUSD, globalCurrency)}</span></td>
                <td><span class="sku-revenue">${formatCurrency(product.revenueUSD, globalCurrency)}</span></td>
                <td><span class="sku-orders">${product.orders}</span></td>
                <td><span class="sku-stock ${stockClass}">${product.stock}</span></td>
                <td><span class="sku-status ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="sku-actions">
                        <button class="sku-action-btn">查看</button>
                        <button class="sku-action-btn">编辑</button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
    }
    
    function filterAndDisplayProducts() {
        const filterValue = skuFilter ? skuFilter.value : 'all';
        const searchValue = skuSearch ? skuSearch.value.toLowerCase() : '';
        
        let filteredProducts = products;
        
        if (filterValue !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.stockStatus === filterValue);
        }
        
        if (searchValue) {
            filteredProducts = filteredProducts.filter(p => 
                p.sku.toLowerCase().includes(searchValue) || 
                p.name.toLowerCase().includes(searchValue)
            );
        }
        
        renderProducts(filteredProducts);
    }
    
    function updateProductData() {
        products = generateProductData();
        filterAndDisplayProducts();
        updateStats();
    }
    
    window.updateProductSKUsData = function() {
        filterAndDisplayProducts();
        updateStats();
    };
    
    updateProductData();
    
    setInterval(updateProductData, 10000);
}

document.addEventListener('DOMContentLoaded', initLoadingAnimation);