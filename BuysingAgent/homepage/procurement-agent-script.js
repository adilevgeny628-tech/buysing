document.addEventListener('DOMContentLoaded', function() {
    const generatePlanBtn = document.getElementById('generatePlanBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    
    generatePlanBtn.addEventListener('click', function() {
        generateProcurementPlan();
    });
    
    refreshBtn.addEventListener('click', function() {
        refreshData();
    });
    
    function generateProcurementPlan() {
        generatePlanBtn.disabled = true;
        generatePlanBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="spin">
                <circle cx="8" cy="8" r="7" stroke="white" stroke-width="2" stroke-dasharray="4 2"/>
            </svg>
            生成中...
        `;
        
        setTimeout(() => {
            generatePlanBtn.disabled = false;
            generatePlanBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2 L8 14 M2 8 L14 8" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
                生成采购计划
            `;
            
            showNotification('采购计划生成成功！', 'success');
            updateProcurementData();
        }, 3000);
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
            updateProcurementData();
        }, 1500);
    }
    
    function updateProcurementData() {
        const procurementData = generateProcurementData();
        updateDashboard(procurementData);
        updateProcurementTable(procurementData);
    }
    
    function generateProcurementData() {
        return {
            budget: {
                total: 125000,
                used: Math.floor(Math.random() * 50000) + 50000,
                remaining: Math.floor(Math.random() * 30000) + 30000,
                pendingOrders: Math.floor(Math.random() * 10) + 5
            },
            suppliers: [
                {
                    name: '深圳电子科技有限公司',
                    rating: (4 + Math.random()).toFixed(1),
                    orders: Math.floor(Math.random() * 10) + 20,
                    amount: Math.floor(Math.random() * 20000) + 30000
                },
                {
                    name: '东莞制造有限公司',
                    rating: (4 + Math.random()).toFixed(1),
                    orders: Math.floor(Math.random() * 10) + 15,
                    amount: Math.floor(Math.random() * 15000) + 25000
                },
                {
                    name: '广州贸易集团',
                    rating: (4 + Math.random()).toFixed(1),
                    orders: Math.floor(Math.random() * 10) + 10,
                    amount: Math.floor(Math.random() * 15000) + 20000
                },
                {
                    name: '佛山电子厂',
                    rating: (4 + Math.random()).toFixed(1),
                    orders: Math.floor(Math.random() * 10) + 5,
                    amount: Math.floor(Math.random() * 10000) + 15000
                }
            ],
            predictions: [
                {
                    product: '智能蓝牙耳机',
                    trend: '上升',
                    sales: Math.floor(Math.random() * 1000) + 2000,
                    recommend: 500,
                    priority: 'urgent'
                },
                {
                    product: '便携式充电宝',
                    trend: '稳定',
                    sales: Math.floor(Math.random() * 500) + 1000,
                    recommend: 300,
                    priority: 'warning'
                },
                {
                    product: '无线充电器',
                    trend: '下降',
                    sales: Math.floor(Math.random() * 300) + 400,
                    recommend: 150,
                    priority: 'normal'
                }
            ],
            suggestions: [
                {
                    priority: 'high',
                    title: '智能蓝牙耳机库存不足',
                    desc: '建议立即采购500件，避免缺货'
                },
                {
                    priority: 'medium',
                    title: '便携式充电宝库存偏低',
                    desc: '建议采购300件，保持安全库存'
                },
                {
                    priority: 'low',
                    title: '优化供应商结构',
                    desc: '建议增加备选供应商，降低风险'
                }
            ]
        };
    }
    
    function updateDashboard(data) {
        const statItems = document.querySelectorAll('.dashboard-card:first-child .stat-item');
        statItems[0].querySelector('.stat-value').textContent = '¥' + data.budget.total.toLocaleString();
        statItems[1].querySelector('.stat-value').textContent = '¥' + data.budget.used.toLocaleString();
        statItems[2].querySelector('.stat-value').textContent = '¥' + data.budget.remaining.toLocaleString();
        statItems[3].querySelector('.stat-value').textContent = data.budget.pendingOrders;
        
        const supplierItems = document.querySelectorAll('.supplier-item');
        data.suppliers.forEach((supplier, index) => {
            if (supplierItems[index]) {
                supplierItems[index].querySelector('.supplier-name').textContent = supplier.name;
                supplierItems[index].querySelector('.supplier-rating').textContent = supplier.rating;
                supplierItems[index].querySelector('.supplier-orders').textContent = '订单: ' + supplier.orders;
                supplierItems[index].querySelector('.supplier-amount').textContent = '金额: ¥' + supplier.amount.toLocaleString();
            }
        });
        
        const predictionItems = document.querySelectorAll('.prediction-item');
        data.predictions.forEach((prediction, index) => {
            if (predictionItems[index]) {
                predictionItems[index].querySelector('.prediction-product').textContent = prediction.product;
                predictionItems[index].querySelector('.prediction-trend').textContent = prediction.trend;
                predictionItems[index].querySelector('.prediction-value').textContent = prediction.sales.toLocaleString();
                
                const recommendBadge = predictionItems[index].querySelector('.recommend-badge');
                recommendBadge.className = 'recommend-badge ' + prediction.priority;
                recommendBadge.textContent = '建议采购 ' + prediction.recommend;
            }
        });
        
        const suggestionItems = document.querySelectorAll('.suggestion-item');
        data.suggestions.forEach((suggestion, index) => {
            if (suggestionItems[index]) {
                suggestionItems[index].className = 'suggestion-item ' + suggestion.priority;
                suggestionItems[index].querySelector('.suggestion-title').textContent = suggestion.title;
                suggestionItems[index].querySelector('.suggestion-desc').textContent = suggestion.desc;
            }
        });
    }
    
    function updateProcurementTable(data) {
        const tbody = document.querySelector('.procurement-table tbody');
        const rows = tbody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const orderNumberCell = row.querySelector('td:nth-child(2)');
            const quantityCell = row.querySelector('td:nth-child(5)');
            const unitPriceCell = row.querySelector('td:nth-child(6)');
            const totalAmountCell = row.querySelector('td:nth-child(7)');
            const expectedDateCell = row.querySelector('td:nth-child(8)');
            const statusCell = row.querySelector('td:nth-child(9)');
            
            if (orderNumberCell && quantityCell && unitPriceCell && totalAmountCell && expectedDateCell && statusCell) {
                const quantity = Math.floor(Math.random() * 400) + 100;
                const unitPrice = Math.floor(Math.random() * 50) + 20;
                const totalAmount = quantity * unitPrice;
                
                quantityCell.textContent = quantity;
                unitPriceCell.textContent = '¥' + unitPrice.toFixed(2);
                totalAmountCell.textContent = '¥' + totalAmount.toLocaleString();
                
                const today = new Date();
                const expectedDate = new Date(today);
                expectedDate.setDate(today.getDate() + Math.floor(Math.random() * 20) + 10);
                expectedDateCell.textContent = expectedDate.toISOString().split('T')[0];
                
                const status = Math.random() > 0.6 ? 'pending' : (Math.random() > 0.3 ? 'processing' : 'completed');
                statusCell.innerHTML = `<span class="status-badge ${status}">${getStatusText(status)}</span>`;
            }
        });
    }
    
    function getStatusText(status) {
        const statusMap = {
            'pending': '待处理',
            'processing': '处理中',
            'completed': '已完成',
            'cancelled': '已取消'
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
    
    const searchInput = document.querySelector('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    searchInput.addEventListener('input', function() {
        filterProcurement();
    });
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            filterProcurement();
        });
    });
    
    function filterProcurement() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusFilter = filterSelects[0].value;
        const supplierFilter = filterSelects[1].value;
        
        const rows = document.querySelectorAll('.procurement-table tbody tr');
        
        rows.forEach(row => {
            const orderNumber = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const productName = row.querySelector('.product-name').textContent.toLowerCase();
            const supplier = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            const status = row.querySelector('.status-badge').className;
            
            let statusMatch = true;
            if (statusFilter !== 'all') {
                statusMatch = status.includes(statusFilter);
            }
            
            let supplierMatch = true;
            if (supplierFilter !== 'all') {
                supplierMatch = supplier.includes(supplierFilter);
            }
            
            const searchMatch = orderNumber.includes(searchTerm) || productName.includes(searchTerm);
            
            if (searchMatch && statusMatch && supplierMatch) {
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
            updateProcurementData();
        });
    });
    
    const suggestionActions = document.querySelectorAll('.suggestion-action');
    suggestionActions.forEach(action => {
        action.addEventListener('click', function() {
            const suggestionItem = this.closest('.suggestion-item');
            const title = suggestionItem.querySelector('.suggestion-title').textContent;
            showNotification(`已创建采购任务："${title}"`, 'success');
        });
    });
});