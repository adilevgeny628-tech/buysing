document.addEventListener('DOMContentLoaded', function() {
    const newTaskBtn = document.getElementById('newTaskBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    
    newTaskBtn.addEventListener('click', function() {
        createNewTask();
    });
    
    refreshBtn.addEventListener('click', function() {
        refreshData();
    });
    
    function createNewTask() {
        newTaskBtn.disabled = true;
        newTaskBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="spin">
                <circle cx="8" cy="8" r="7" stroke="white" stroke-width="2" stroke-dasharray="4 2"/>
            </svg>
            创建中...
        `;
        
        setTimeout(() => {
            newTaskBtn.disabled = false;
            newTaskBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2 L8 14 M2 8 L14 8" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
                新建产品任务
            `;
            
            showNotification('新产品任务创建成功！', 'success');
            updateProductData();
        }, 2000);
    }
    
    function refreshData() {
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
                    <path d="M2 8 A6 6 0 1 1 14 8" stroke="#0F7AEA" stroke-width="2" stroke-linecap="round"/>
                    <path d="M14 8 L10 4 M14 8 L10 12" stroke="#0F7AEA" stroke-width="2" stroke-linecap="round"/>
                </svg>
                刷新
            `;
            
            showNotification('数据已刷新！', 'success');
            updateProductData();
        }, 1500);
    }
    
    function updateProductData() {
        const productData = generateProductData();
        updatePublicationGrid(productData);
        updateProductTable(productData);
    }
    
    function generateProductData() {
        const products = [];
        const productNames = [
            '智能蓝牙耳机', '便携式充电宝', '无线充电器', '智能手表',
            '运动手环', '蓝牙音箱', '无线鼠标', '机械键盘',
            'USB-C数据线', '手机支架', '平板电脑', '笔记本电脑',
            '智能音箱', '无线耳机', '充电宝', '蓝牙耳机',
            '智能手表', '运动手环', '蓝牙音箱', '无线鼠标',
            '机械键盘', 'USB-C数据线', '手机支架', '平板电脑',
            '智能音箱', '无线耳机', '充电宝', '蓝牙耳机',
            '智能手表', '运动手环', '蓝牙音箱', '无线鼠标',
            '机械键盘', 'USB-C数据线', '手机支架', '平板电脑',
            '智能音箱', '无线耳机', '充电宝', '蓝牙耳机',
            '智能手表', '运动手环', '蓝牙音箱', '无线鼠标',
            '机械键盘', 'USB-C数据线', '手机支架', '平板电脑',
            '智能音箱', '无线耳机', '充电宝', '蓝牙耳机',
            '智能手表', '运动手环', '蓝牙音箱', '无线鼠标',
            '机械键盘', 'USB-C数据线', '手机支架', '平板电脑',
            '智能音箱', '无线耳机', '充电宝', '蓝牙耳机',
            '智能手表', '运动手环', '蓝牙音箱', '无线鼠标',
            '机械键盘', 'USB-C数据线', '手机支架', '平板电脑',
            '智能音箱', '无线耳机', '充电宝', '蓝牙耳机',
            '智能手表', '运动手环', '蓝牙音箱', '无线鼠标',
            '机械键盘', 'USB-C数据线', '手机支架', '平板电脑',
            '智能音箱', '无线耳机', '充电宝', '蓝牙耳机',
            '智能手表', '运动手环', '蓝牙音箱', '无线鼠标',
            '机械键盘', 'USB-C数据线', '手机支架', '平板电脑',
            '智能音箱', '无线耳机', '充电宝', '蓝牙耳机',
            '智能手表', '运动手环', '蓝牙音箱', '无线鼠标'
        ];
        
        const platforms = ['amazon', 'tiktok', 'ebay'];
        const statuses = ['published', 'processing', 'pending'];
        
        for (let i = 0; i < 50; i++) {
            const productPlatforms = [];
            const numPlatforms = Math.floor(Math.random() * 3) + 1;
            for (let j = 0; j < numPlatforms; j++) {
                const platform = platforms[Math.floor(Math.random() * platforms.length)];
                if (!productPlatforms.includes(platform)) {
                    productPlatforms.push(platform);
                }
            }
            
            products.push({
                id: i + 1,
                name: productNames[i % productNames.length],
                sku: `SKU-PROD-${String(i + 1).padStart(3, '0')}`,
                platforms: productPlatforms,
                title: `${productNames[i % productNames.length]} - High Quality Product`,
                sales: Math.floor(Math.random() * 2000) + 500,
                lastUpdate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: statuses[Math.floor(Math.random() * statuses.length)]
            });
        }
        
        return products;
    }
    
    function updatePublicationGrid(products) {
        const publicationGrid = document.getElementById('publicationGrid');
        publicationGrid.innerHTML = '';
        
        products.slice(0, 10).forEach(product => {
            const card = document.createElement('div');
            card.className = 'publication-card';
            card.innerHTML = `
                <div class="publication-card-header">
                    <input type="checkbox" class="publication-checkbox" data-id="${product.id}">
                </div>
                <div class="publication-image">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="4" y="4" width="40" height="40" rx="4" stroke="#0F7AEA" stroke-width="2"/>
                        <circle cx="24" cy="24" r="8" stroke="#9D4EDD" stroke-width="2"/>
                    </svg>
                </div>
                <div class="publication-title">${product.name}</div>
                <div class="publication-platforms">
                    ${product.platforms.map(platform => `
                        <span class="platform-badge ${platform}">${getPlatformName(platform)}</span>
                    `).join('')}
                </div>
                <div class="publication-status ${product.status}">${getStatusText(product.status)}</div>
                <div class="publication-actions">
                    <button class="publication-action-btn" data-action="view" data-id="${product.id}">查看</button>
                    <button class="publication-action-btn" data-action="edit" data-id="${product.id}">编辑</button>
                    <button class="publication-action-btn" data-action="publish" data-id="${product.id}">刊登</button>
                </div>
            `;
            publicationGrid.appendChild(card);
        });
        
        addPublicationCardListeners();
    }
    
    function updateProductTable(products) {
        const tbody = document.getElementById('productTableBody');
        tbody.innerHTML = '';
        
        products.slice(0, 10).forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" class="checkbox-item" data-id="${product.id}"></td>
                <td>
                    <div class="product-cell">
                        <div class="product-image">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="4" y="4" width="32" height="32" rx="4" stroke="#0F7AEA" stroke-width="2"/>
                                <circle cx="20" cy="20" r="6" stroke="#9D4EDD" stroke-width="2"/>
                            </svg>
                        </div>
                        <div class="product-details">
                            <div class="product-name">${product.name}</div>
                            <div class="product-sku">${product.sku}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="platform-tags">
                        ${product.platforms.map(platform => `
                            <span class="platform-tag ${platform}">${getPlatformName(platform)}</span>
                        `).join('')}
                    </div>
                </td>
                <td>
                    <div class="listing-title">
                        ${product.title}
                    </div>
                </td>
                <td>${product.sales.toLocaleString()}</td>
                <td>${product.lastUpdate}</td>
                <td><span class="status-badge ${product.status}">${getStatusText(product.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" title="查看详情" data-action="view" data-id="${product.id}">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" stroke="#0F7AEA" stroke-width="2"/>
                                <circle cx="8" cy="5" r="1" fill="#0F7AEA"/>
                            </svg>
                        </button>
                        <button class="action-btn" title="编辑" data-action="edit" data-id="${product.id}">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 2 L8 14 M2 8 L14 8" stroke="#0F7AEA" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="action-btn" title="删除" data-action="delete" data-id="${product.id}">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 4 L12 12 M12 4 L4 12" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        addProductTableListeners();
    }
    
    function addPublicationCardListeners() {
        const checkboxes = document.querySelectorAll('.publication-checkbox');
        const actionBtns = document.querySelectorAll('.publication-action-btn');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const id = this.getAttribute('data-id');
                console.log('Publication checkbox changed:', id);
            });
        });
        
        actionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const id = this.getAttribute('data-id');
                
                if (action === 'view') {
                    showNotification('查看产品详情', 'success');
                } else if (action === 'edit') {
                    showNotification('编辑产品信息', 'success');
                } else if (action === 'publish') {
                    showNotification('开始刊登产品', 'success');
                }
            });
        });
    }
    
    function addProductTableListeners() {
        const checkboxes = document.querySelectorAll('.checkbox-item');
        const actionBtns = document.querySelectorAll('.action-btn');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const id = this.getAttribute('data-id');
                console.log('Product checkbox changed:', id);
            });
        });
        
        actionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const id = this.getAttribute('data-id');
                
                if (action === 'view') {
                    showNotification('查看产品详情', 'success');
                } else if (action === 'edit') {
                    showNotification('编辑产品信息', 'success');
                } else if (action === 'delete') {
                    showNotification('删除产品', 'success');
                }
            });
        });
    }
    
    function getPlatformName(platform) {
        const platformNames = {
            'amazon': 'Amazon',
            'tiktok': 'TikTok',
            'ebay': 'eBay',
            'other': '其他'
        };
        return platformNames[platform] || '其他';
    }
    
    function getStatusText(status) {
        const statusMap = {
            'published': '已刊登',
            'processing': '处理中',
            'pending': '待处理'
        };
        return statusMap[status] || '未知';
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                ${type === 'success' 
                    ? '<circle cx="10" cy="10" r="8" stroke="#10B981" stroke-width="2"/><path d="M6 10 L9 13 L14 8" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                    : '<circle cx="10" cy="10" r="8" stroke="#EF4444" stroke-width="2"/><path d="M10 6 L10 14 M10 6 L7 9 M10 6 L13 9" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'}
            </svg>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    const searchInputs = document.querySelectorAll('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    searchInputs.forEach(searchInput => {
        searchInput.addEventListener('input', function() {
            filterProducts();
        });
    });
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            filterProducts();
        });
    });
    
    function filterProducts() {
        const searchTerm = searchInputs[0].value.toLowerCase();
        const statusFilter = filterSelects[0].value;
        const platformFilter = filterSelects[1].value;
        
        const publicationCards = document.querySelectorAll('.publication-card');
        const productRows = document.querySelectorAll('#productTableBody tr');
        
        publicationCards.forEach(card => {
            const title = card.querySelector('.publication-title').textContent.toLowerCase();
            const status = card.querySelector('.publication-status').className;
            const platformBadges = card.querySelectorAll('.platform-badge');
            
            let statusMatch = true;
            if (statusFilter !== 'all') {
                statusMatch = status.includes(statusFilter);
            }
            
            let platformMatch = true;
            if (platformFilter !== 'all') {
                platformMatch = Array.from(platformBadges).some(badge => 
                    badge.classList.contains(platformFilter)
                );
            }
            
            const searchMatch = title.includes(searchTerm);
            
            if (searchMatch && statusMatch && platformMatch) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        productRows.forEach(row => {
            const productName = row.querySelector('.product-name').textContent.toLowerCase();
            const status = row.querySelector('.status-badge').className;
            const platformTags = row.querySelectorAll('.platform-tag');
            
            let statusMatch = true;
            if (statusFilter !== 'all') {
                statusMatch = status.includes(statusFilter);
            }
            
            let platformMatch = true;
            if (platformFilter !== 'all') {
                platformMatch = Array.from(platformTags).some(tag => 
                    tag.classList.contains(platformFilter)
                );
            }
            
            const searchMatch = productName.includes(searchTerm);
            
            if (searchMatch && statusMatch && platformMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    const paginationBtns = document.querySelectorAll('.pagination-btn:not(:disabled)');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            paginationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateProductData();
        });
    });
    
    const workflowSteps = document.querySelectorAll('.workflow-step-horizontal');
    workflowSteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNumber = this.getAttribute('data-step');
            showNotification(`已选择步骤 ${stepNumber}`, 'success');
        });
    });
});