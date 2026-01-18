document.addEventListener('DOMContentLoaded', function() {
    const syncInventoryBtn = document.getElementById('syncInventoryBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    
    syncInventoryBtn.addEventListener('click', function() {
        syncInventory();
    });
    
    refreshBtn.addEventListener('click', function() {
        refreshData();
    });
    
    function syncInventory() {
        syncInventoryBtn.disabled = true;
        syncInventoryBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="spin">
                <circle cx="8" cy="8" r="7" stroke="white" stroke-width="2" stroke-dasharray="4 2"/>
            </svg>
            同步中...
        `;
        
        setTimeout(() => {
            syncInventoryBtn.disabled = false;
            syncInventoryBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2 L8 14 M2 8 L14 8" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
                同步库存
            `;
            
            showNotification('库存同步成功！', 'success');
            updateInventoryData();
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
            updateInventoryData();
        }, 1500);
    }
    
    function updateInventoryData() {
        const inventoryData = generateInventoryData();
        updateDashboard(inventoryData);
        updateInventoryTable(inventoryData);
    }
    
    function generateInventoryData() {
        return {
            totalInventory: Math.floor(Math.random() * 5000) + 10000,
            totalProducts: Math.floor(Math.random() * 20) + 80,
            lowStock: Math.floor(Math.random() * 10) + 20,
            outOfStock: Math.floor(Math.random() * 5) + 3,
            platforms: [
                { name: 'Amazon', count: Math.floor(Math.random() * 2000) + 4000, percentage: 42 },
                { name: 'TikTok Shop', count: Math.floor(Math.random() * 1500) + 3000, percentage: 31 },
                { name: 'eBay', count: Math.floor(Math.random() * 1000) + 2000, percentage: 20 },
                { name: '其他平台', count: Math.floor(Math.random() * 500) + 500, percentage: 7 }
            ],
            alerts: [
                {
                    type: 'urgent',
                    title: '智能蓝牙耳机',
                    message: '库存不足，仅剩 ' + Math.floor(Math.random() * 30) + ' 件'
                },
                {
                    type: 'warning',
                    title: '便携式充电宝',
                    message: '库存偏低，建议补货'
                },
                {
                    type: 'info',
                    title: '无线充电器',
                    message: '库存充足，无需补货'
                }
            ],
            predictions: [
                {
                    product: '智能蓝牙耳机',
                    trend: '上升',
                    sales: Math.floor(Math.random() * 500) + 1000
                },
                {
                    product: '便携式充电宝',
                    trend: '稳定',
                    sales: Math.floor(Math.random() * 300) + 400
                },
                {
                    product: '无线充电器',
                    trend: '下降',
                    sales: Math.floor(Math.random() * 200) + 100
                }
            ]
        };
    }
    
    function updateDashboard(data) {
        const statItems = document.querySelectorAll('.dashboard-card:first-child .stat-item');
        statItems[0].querySelector('.stat-value').textContent = data.totalInventory.toLocaleString();
        statItems[1].querySelector('.stat-value').textContent = data.totalProducts;
        statItems[2].querySelector('.stat-value').textContent = data.lowStock;
        statItems[3].querySelector('.stat-value').textContent = data.outOfStock;
        
        const platformItems = document.querySelectorAll('.platform-item');
        data.platforms.forEach((platform, index) => {
            if (platformItems[index]) {
                platformItems[index].querySelector('.platform-count').textContent = platform.count.toLocaleString();
                platformItems[index].querySelector('.progress-bar').style.width = platform.percentage + '%';
            }
        });
        
        const alertItems = document.querySelectorAll('.alert-item');
        data.alerts.forEach((alert, index) => {
            if (alertItems[index]) {
                alertItems[index].querySelector('.alert-title').textContent = alert.title;
                alertItems[index].querySelector('.alert-message').textContent = alert.message;
            }
        });
        
        const predictionItems = document.querySelectorAll('.prediction-item');
        data.predictions.forEach((prediction, index) => {
            if (predictionItems[index]) {
                predictionItems[index].querySelector('.prediction-product').textContent = prediction.product;
                predictionItems[index].querySelector('.prediction-trend').textContent = prediction.trend;
                predictionItems[index].querySelector('.prediction-value').textContent = prediction.sales.toLocaleString();
            }
        });
    }
    
    function updateInventoryTable(data) {
        const tbody = document.querySelector('.inventory-table tbody');
        const rows = tbody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const stockCell = row.querySelector('td:nth-child(5)');
            const statusCell = row.querySelector('td:nth-child(6)');
            const salesCell = row.querySelector('td:nth-child(7)');
            const restockCell = row.querySelector('td:nth-child(8)');
            
            if (stockCell && statusCell && salesCell && restockCell) {
                const stock = Math.floor(Math.random() * 1000);
                stockCell.textContent = stock;
                
                let status, restock;
                if (stock === 0) {
                    status = 'out';
                    restock = 'urgent';
                } else if (stock < 100) {
                    status = 'low';
                    restock = 'urgent';
                } else if (stock < 300) {
                    status = 'warning';
                    restock = 'warning';
                } else {
                    status = 'normal';
                    restock = 'normal';
                }
                
                statusCell.innerHTML = `<span class="status-badge ${status}">${getStatusText(status)}</span>`;
                salesCell.textContent = Math.floor(Math.random() * 1000) + 500;
                restockCell.innerHTML = `<span class="restock-badge ${restock}">${getRestockText(restock)}</span>`;
            }
        });
    }
    
    function getStatusText(status) {
        const statusMap = {
            'normal': '正常',
            'warning': '偏低',
            'low': '低库存',
            'out': '缺货'
        };
        return statusMap[status] || '未知';
    }
    
    function getRestockText(restock) {
        const restockMap = {
            'normal': '无需补货',
            'warning': '建议补货',
            'urgent': '紧急补货'
        };
        return restockMap[restock] || '未知';
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
    
    const searchInput = document.querySelector('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    searchInput.addEventListener('input', function() {
        filterInventory();
    });
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            filterInventory();
        });
    });
    
    function filterInventory() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusFilter = filterSelects[0].value;
        const platformFilter = filterSelects[1].value;
        
        const rows = document.querySelectorAll('.inventory-table tbody tr');
        
        rows.forEach(row => {
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
            updateInventoryData();
        });
    });
    
    const alertActions = document.querySelectorAll('.alert-action');
    alertActions.forEach(action => {
        action.addEventListener('click', function() {
            const alertItem = this.closest('.alert-item');
            const title = alertItem.querySelector('.alert-title').textContent;
            showNotification(`已为"${title}"创建补货任务`, 'success');
        });
    });
});