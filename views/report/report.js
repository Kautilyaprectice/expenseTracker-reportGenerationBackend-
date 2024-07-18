const currentDate = new Date();
const currentMonth = currentDate.toLocaleString('default', {month: 'long'});
const currentYear = currentDate.getFullYear();

document.getElementById('current-date').innerHTML = currentDate.toLocaleString();
document.getElementById('current-month').innerHTML = currentMonth;
document.getElementById('current-year').innerHTML = currentYear;

const expenseData = [];
const yearlyReportData = [];
const notesReportData = [];

const expenseTableBody = document.getElementById('expenseBody');
expenseData.forEach((expense) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
        <td>${expense.expense}</td>
    `;
    expenseTableBody.appendChild(row);
});

const yearlyReportBody = document.getElementById('yearlyReportBody');
yearlyReportData.forEach((report) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${report.month}</td>
        <td>${report.expense}</td>
    `;
    yearlyReportBody.appendChild(row);
});

const notesReportBody = document.getElementById('notesReportBody');
notesReportData.forEach((report) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${report.date}</td>
        <td>${report.notes}</td>
    `;
    notesReportBody.appendChild(row);
});

const dailyFilterButton = document.getElementById('daily');
const weeklyFilterButton = document.getElementById('weekly');
const monthlyFilterButton = document.getElementById('monthly');

dailyFilterButton.addEventListener('click', () => {
    const currentDate = new Date();

    const dailyExpensesData = expenseData.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (expenseDate.getFullYear() === currentDate.getFullYear() &&
            expenseDate.getMonth() === currentDate.getMonth() &&
            expenseDate.getDate() === currentDate.getDate());
    });
    const expensesTableBody = document.getElementById('expenses-tbody');
    expensesTableBody.innerHTML = '';

    dailyExpensesData.forEach((expense) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>${expense.income}</td>
            <td>${expense.expense}</td>
        `;
        expensesTableBody.appendChild(row);
    });
});

weeklyFilterButton.addEventListener('click', () => {
    const currentDate = new Date();
    const startOfWeek = currentDate.getDate() - currentDate.getDay() + 1;
    const endOfWeek = startOfWeek + 6;
  
    const weeklyExpensesData = expenseData.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (expenseDate.getFullYear() === currentDate.getFullYear() &&
            expenseDate.getMonth() === currentDate.getMonth() &&
            expenseDate.getDate() >= startOfWeek &&
            expenseDate.getDate() <= endOfWeek);
    });
    const expensesTableBody = document.getElementById('expenses-tbody');
    expensesTableBody.innerHTML = '';
  
    weeklyExpensesData.forEach((expense) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>${expense.expense}</td>
        `;
        expensesTableBody.appendChild(row);
    });
});
  
monthlyFilterButton.addEventListener('click', () => {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    const monthlyExpensesData = expenseData.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (expenseDate.getFullYear() === currentDate.getFullYear() &&
            expenseDate.getMonth() === currentDate.getMonth());
        });
    const expensesTableBody = document.getElementById('expenses-tbody');
    expensesTableBody.innerHTML = '';
  
    monthlyExpensesData.forEach((expense) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>${expense.expense}</td>
        `;
        expensesTableBody.appendChild(row);
        });
});

