document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

function formatCurrency(amount) {
    return '¥' + amount.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calculateCompound() {
    const principal = parseFloat(document.getElementById('compound-principal').value);
    const rate = parseFloat(document.getElementById('compound-rate').value) / 100;
    const years = parseFloat(document.getElementById('compound-years').value);
    const frequency = parseInt(document.getElementById('compound-frequency').value);

    const n = frequency;
    const t = years;
    const r = rate;

    const finalAmount = principal * Math.pow((1 + r / n), n * t);
    const totalInterest = finalAmount - principal;

    const resultDiv = document.getElementById('compound-result');
    resultDiv.innerHTML = `
        <h3>复利计算结果</h3>
        <div class="result-item">
            <span class="result-label">本金金额</span>
            <span class="result-value">${formatCurrency(principal)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">投资年限</span>
            <span class="result-value">${years} 年</span>
        </div>
        <div class="result-item">
            <span class="result-label">年利率</span>
            <span class="result-value">${(rate * 100).toFixed(2)}%</span>
        </div>
        <div class="result-item">
            <span class="result-label">复利频率</span>
            <span class="result-value">${getFrequencyText(frequency)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">利息收益</span>
            <span class="result-value">${formatCurrency(totalInterest)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">最终金额</span>
            <span class="result-value highlight">${formatCurrency(finalAmount)}</span>
        </div>
    `;
    resultDiv.classList.add('show');
}

function calculateLoan() {
    const amount = parseFloat(document.getElementById('loan-amount').value);
    const rate = parseFloat(document.getElementById('loan-rate').value) / 100;
    const years = parseFloat(document.getElementById('loan-years').value);
    const type = document.getElementById('loan-type').value;

    const monthlyRate = rate / 12;
    const months = years * 12;

    let monthlyPayment, totalPayment, totalInterest;

    if (type === 'equal-payment') {
        monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                        (Math.pow(1 + monthlyRate, months) - 1);
        totalPayment = monthlyPayment * months;
        totalInterest = totalPayment - amount;
    } else {
        const principalPerMonth = amount / months;
        let totalPaymentSum = 0;
        
        for (let i = 1; i <= months; i++) {
            const interest = (amount - principalPerMonth * (i - 1)) * monthlyRate;
            totalPaymentSum += principalPerMonth + interest;
        }
        
        monthlyPayment = principalPerMonth + amount * monthlyRate;
        totalPayment = totalPaymentSum;
        totalInterest = totalPayment - amount;
    }

    const resultDiv = document.getElementById('loan-result');
    resultDiv.innerHTML = `
        <h3>贷款计算结果</h3>
        <div class="result-item">
            <span class="result-label">贷款金额</span>
            <span class="result-value">${formatCurrency(amount)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">贷款期限</span>
            <span class="result-value">${years} 年 (${months} 个月)</span>
        </div>
        <div class="result-item">
            <span class="result-label">年利率</span>
            <span class="result-value">${(rate * 100).toFixed(2)}%</span>
        </div>
        <div class="result-item">
            <span class="result-label">还款方式</span>
            <span class="result-value">${type === 'equal-payment' ? '等额本息' : '等额本金'}</span>
        </div>
        <div class="result-item">
            <span class="result-label">月供${type === 'equal-payment' ? '' : '（首月）'}</span>
            <span class="result-value">${formatCurrency(monthlyPayment)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">总还款额</span>
            <span class="result-value">${formatCurrency(totalPayment)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">总利息</span>
            <span class="result-value highlight">${formatCurrency(totalInterest)}</span>
        </div>
    `;
    resultDiv.classList.add('show');
}

function calculateInvestment() {
    const initial = parseFloat(document.getElementById('invest-initial').value);
    const monthly = parseFloat(document.getElementById('invest-monthly').value);
    const rate = parseFloat(document.getElementById('invest-rate').value) / 100;
    const years = parseFloat(document.getElementById('invest-years').value);

    const monthlyRate = rate / 12;
    const months = years * 12;

    const futureValueInitial = initial * Math.pow(1 + monthlyRate, months);
    const futureValueMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalValue = futureValueInitial + futureValueMonthly;
    const totalInvested = initial + monthly * months;
    const totalProfit = totalValue - totalInvested;

    const resultDiv = document.getElementById('investment-result');
    resultDiv.innerHTML = `
        <h3>投资回报计算结果</h3>
        <div class="result-item">
            <span class="result-label">初始投资</span>
            <span class="result-value">${formatCurrency(initial)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">每月定投</span>
            <span class="result-value">${formatCurrency(monthly)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">投资年限</span>
            <span class="result-value">${years} 年</span>
        </div>
        <div class="result-item">
            <span class="result-label">预期年化收益率</span>
            <span class="result-value">${(rate * 100).toFixed(2)}%</span>
        </div>
        <div class="result-item">
            <span class="result-label">总投入本金</span>
            <span class="result-value">${formatCurrency(totalInvested)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">投资收益</span>
            <span class="result-value">${formatCurrency(totalProfit)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">最终资产</span>
            <span class="result-value highlight">${formatCurrency(totalValue)}</span>
        </div>
    `;
    resultDiv.classList.add('show');
}

function calculateSavings() {
    const goal = parseFloat(document.getElementById('savings-goal').value);
    const initial = parseFloat(document.getElementById('savings-initial').value);
    const rate = parseFloat(document.getElementById('savings-rate').value) / 100;
    const monthly = parseFloat(document.getElementById('savings-monthly').value);

    const monthlyRate = rate / 12;
    
    let months = 0;
    let currentAmount = initial;

    if (currentAmount >= goal) {
        months = 0;
    } else {
        while (currentAmount < goal && months < 1200) {
            currentAmount = currentAmount * (1 + monthlyRate) + monthly;
            months++;
        }
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const totalDeposited = initial + monthly * months;
    const totalInterest = currentAmount - totalDeposited;

    const resultDiv = document.getElementById('savings-result');
    resultDiv.innerHTML = `
        <h3>储蓄计算结果</h3>
        <div class="result-item">
            <span class="result-label">目标金额</span>
            <span class="result-value">${formatCurrency(goal)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">初始存款</span>
            <span class="result-value">${formatCurrency(initial)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">每月存款</span>
            <span class="result-value">${formatCurrency(monthly)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">年利率</span>
            <span class="result-value">${(rate * 100).toFixed(2)}%</span>
        </div>
        <div class="result-item">
            <span class="result-label">所需时间</span>
            <span class="result-value highlight">${years} 年 ${remainingMonths} 个月</span>
        </div>
        <div class="result-item">
            <span class="result-label">总存入金额</span>
            <span class="result-value">${formatCurrency(totalDeposited)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">利息收益</span>
            <span class="result-value">${formatCurrency(totalInterest)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">最终金额</span>
            <span class="result-value">${formatCurrency(currentAmount)}</span>
        </div>
    `;
    resultDiv.classList.add('show');
}

function getFrequencyText(frequency) {
    switch(frequency) {
        case 1: return '每年';
        case 2: return '每半年';
        case 4: return '每季度';
        case 12: return '每月';
        default: return '未知';
    }
}