document.addEventListener('DOMContentLoaded', function() {
    const optimizeBtn = document.getElementById('optimizeBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    
    optimizeBtn.addEventListener('click', function() {
        startOptimization();
    });
    
    refreshBtn.addEventListener('click', function() {
        refreshData();
    });
    
    function startOptimization() {
        optimizeBtn.disabled = true;
        optimizeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="spin">
                <circle cx="8" cy="8" r="7" stroke="white" stroke-width="2" stroke-dasharray="4 2"/>
            </svg>
            优化中...
        `;
        
        setTimeout(() => {
            optimizeBtn.disabled = false;
            optimizeBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2 L8 14 M2 8 L14 8" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
                开始优化
            `;
            
            showNotification('Listing优化完成！', 'success');
            updateOptimizationData();
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
            updateOptimizationData();
        }, 1500);
    }
    
    function updateOptimizationData() {
        const optimizationData = generateOptimizationData();
        updateDashboard(optimizationData);
        updateListingTable(optimizationData);
    }
    
    function generateOptimizationData() {
        return {
            totalListings: Math.floor(Math.random() * 20) + 80,
            optimizedListings: Math.floor(Math.random() * 30) + 40,
            pendingListings: Math.floor(Math.random() * 15) + 15,
            optimizingListings: Math.floor(Math.random() * 10) + 5,
            effects: {
                exposure: Math.floor(Math.random() * 20) + 35,
                clickRate: Math.floor(Math.random() * 15) + 25,
                conversionRate: Math.floor(Math.random() * 15) + 20,
                sales: Math.floor(Math.random() * 20) + 30
            },
            keywords: [
                {
                    name: 'wireless earbuds',
                    rank: '#' + (Math.floor(Math.random() * 5) + 1),
                    trend: Math.random() > 0.3 ? 'up' : (Math.random() > 0.5 ? 'down' : 'stable'),
                    change: Math.floor(Math.random() * 5) + 1
                },
                {
                    name: 'bluetooth headphones',
                    rank: '#' + (Math.floor(Math.random() * 5) + 3),
                    trend: Math.random() > 0.3 ? 'up' : (Math.random() > 0.5 ? 'down' : 'stable'),
                    change: Math.floor(Math.random() * 5) + 1
                },
                {
                    name: 'noise cancelling',
                    rank: '#' + (Math.floor(Math.random() * 5) + 6),
                    trend: Math.random() > 0.3 ? 'up' : (Math.random() > 0.5 ? 'down' : 'stable'),
                    change: Math.floor(Math.random() * 3) + 1
                },
                {
                    name: 'sports earphones',
                    rank: '#' + (Math.floor(Math.random() * 5) + 10),
                    trend: Math.random() > 0.3 ? 'up' : (Math.random() > 0.5 ? 'down' : 'stable'),
                    change: Math.floor(Math.random() * 3) + 1
                }
            ],
            suggestions: [
                {
                    priority: 'high',
                    title: '添加高搜索量关键词',
                    desc: '建议添加"wireless earbuds"到标题'
                },
                {
                    priority: 'medium',
                    title: '优化产品图片',
                    desc: '建议添加产品使用场景图'
                },
                {
                    priority: 'low',
                    title: '优化产品描述',
                    desc: '建议添加更多产品特性说明'
                }
            ]
        };
    }
    
    function updateDashboard(data) {
        const statItems = document.querySelectorAll('.dashboard-card:first-child .stat-item');
        statItems[0].querySelector('.stat-value').textContent = data.totalListings;
        statItems[1].querySelector('.stat-value').textContent = data.optimizedListings;
        statItems[2].querySelector('.stat-value').textContent = data.pendingListings;
        statItems[3].querySelector('.stat-value').textContent = data.optimizingListings;
        
        const effectMetrics = document.querySelectorAll('.metric-item');
        effectMetrics[0].querySelector('.metric-value').textContent = '+' + data.effects.exposure + '%';
        effectMetrics[0].querySelector('.metric-progress').style.width = data.effects.exposure + '%';
        effectMetrics[1].querySelector('.metric-value').textContent = '+' + data.effects.clickRate + '%';
        effectMetrics[1].querySelector('.metric-progress').style.width = data.effects.clickRate + '%';
        effectMetrics[2].querySelector('.metric-value').textContent = '+' + data.effects.conversionRate + '%';
        effectMetrics[2].querySelector('.metric-progress').style.width = data.effects.conversionRate + '%';
        effectMetrics[3].querySelector('.metric-value').textContent = '+' + data.effects.sales + '%';
        effectMetrics[3].querySelector('.metric-progress').style.width = data.effects.sales + '%';
        
        const keywordItems = document.querySelectorAll('.keyword-item');
        data.keywords.forEach((keyword, index) => {
            if (keywordItems[index]) {
                keywordItems[index].querySelector('.keyword-name').textContent = keyword.name;
                keywordItems[index].querySelector('.keyword-rank').textContent = '排名 ' + keyword.rank;
                
                const trendElement = keywordItems[index].querySelector('.keyword-trend');
                trendElement.className = 'keyword-trend ' + keyword.trend;
                trendElement.innerHTML = `
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        ${keyword.trend === 'up' 
                            ? '<path d="M6 2 L6 10 M2 6 L6 2 L10 6" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                            : keyword.trend === 'down'
                                ? '<path d="M6 10 L6 2 M2 6 L6 10 L10 6" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                                : '<path d="M2 6 L10 6" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>'}
                    </svg>
                    ${keyword.trend === 'up' ? '+' : (keyword.trend === 'down' ? '-' : '')}${keyword.change}
                `;
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
    
    function updateListingTable(data) {
        const tbody = document.querySelector('.listing-table tbody');
        const rows = tbody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const exposureCell = row.querySelector('td:nth-child(6)');
            const clickRateCell = row.querySelector('td:nth-child(7)');
            const conversionRateCell = row.querySelector('td:nth-child(8)');
            const statusCell = row.querySelector('td:nth-child(9)');
            
            if (exposureCell && clickRateCell && conversionRateCell && statusCell) {
                exposureCell.textContent = Math.floor(Math.random() * 10000) + 5000;
                clickRateCell.textContent = (Math.random() * 2 + 2).toFixed(1) + '%';
                conversionRateCell.textContent = (Math.random() * 1.5 + 1.5).toFixed(1) + '%';
                
                const status = Math.random() > 0.6 ? 'optimized' : (Math.random() > 0.3 ? 'optimizing' : 'pending');
                statusCell.innerHTML = `<span class="status-badge ${status}">${getStatusText(status)}</span>`;
            }
        });
    }
    
    function getStatusText(status) {
        const statusMap = {
            'optimized': '已优化',
            'optimizing': '优化中',
            'pending': '待优化'
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
        filterListings();
    });
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            filterListings();
        });
    });
    
    function filterListings() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusFilter = filterSelects[0].value;
        const platformFilter = filterSelects[1].value;
        
        const rows = document.querySelectorAll('.listing-table tbody tr');
        
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
            updateOptimizationData();
        });
    });
    
    const suggestionActions = document.querySelectorAll('.suggestion-action');
    suggestionActions.forEach(action => {
        action.addEventListener('click', function() {
            const suggestionItem = this.closest('.suggestion-item');
            const title = suggestionItem.querySelector('.suggestion-title').textContent;
            showNotification(`已应用优化建议："${title}"`, 'success');
        });
    });
});