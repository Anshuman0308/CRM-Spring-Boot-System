const API_BASE = 'http://localhost:8081/api';

// ── Auth ──────────────────────────────────────────────────────────────────────
async function doLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    document.getElementById('loginError').textContent = '';
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) { document.getElementById('loginError').textContent = 'Invalid credentials'; return; }
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        document.getElementById('loginScreen').style.display = 'none';
        loadCustomers();
    } catch (e) {
        document.getElementById('loginError').textContent = 'Connection error';
    }
}

async function refreshTokens() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) { showLogin(); return false; }
    const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
    });
    if (!res.ok) { showLogin(); return false; }
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return true;
}

function showLogin() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    document.getElementById('loginScreen').style.display = 'flex';
}

// Authenticated fetch — auto-refreshes on 401
async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('accessToken');
    options.headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
    let res = await fetch(url, options);
    if (res.status === 401) {
        const ok = await refreshTokens();
        if (!ok) return res;
        options.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        res = await fetch(url, options);
    }
    return res;
}

// On load — if token exists skip login
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('accessToken')) {
        document.getElementById('loginScreen').style.display = 'none';
        loadCustomers();
    }
});

// ── Customers ─────────────────────────────────────────────────────────────────
async function saveCustomer() {
    const customer = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
    const res = await apiFetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    });
    if (res.ok) { alert('Customer saved successfully!'); document.getElementById('customerForm').reset(); loadCustomers(); }
    else alert('Error saving customer');
}

async function loadCustomers() {
    const res = await apiFetch(`${API_BASE}/customers`);
    if (!res.ok) return;
    const customers = await res.json();
    const tbody = document.querySelector('#customersTable tbody');
    tbody.innerHTML = '';
    customers.forEach(c => {
        const row = tbody.insertRow();
        row.innerHTML = `<td>${c.id}</td><td>${c.firstName} ${c.lastName}</td><td>${c.email}</td><td>${c.phone || ''}</td>
            <td><button class="btn btn-danger" onclick="deleteCustomer(${c.id})">Delete</button></td>`;
    });
}

async function searchCustomer() {
    const term = document.getElementById('customerSearch').value;
    if (!term) return;
    const url = term.includes('@') ? `${API_BASE}/customers/email/${term}` : `${API_BASE}/customers/phone/${term}`;
    const res = await apiFetch(url);
    if (!res.ok) { alert('Customer not found'); return; }
    const c = await res.json();
    const tbody = document.querySelector('#customersTable tbody');
    tbody.innerHTML = `<tr><td>${c.id}</td><td>${c.firstName} ${c.lastName}</td><td>${c.email}</td><td>${c.phone || ''}</td>
        <td><button class="btn btn-danger" onclick="deleteCustomer(${c.id})">Delete</button></td></tr>`;
}

async function deleteCustomer(id) {
    if (!confirm('Delete this customer?')) return;
    const res = await apiFetch(`${API_BASE}/customers/${id}`, { method: 'DELETE' });
    if (res.ok) { alert('Customer deleted!'); loadCustomers(); }
    else alert('Error deleting customer');
}

// ── Products ──────────────────────────────────────────────────────────────────
async function saveProduct() {
    const product = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        brand: document.getElementById('productBrand').value,
        price: parseFloat(document.getElementById('productPrice').value)
    };
    const res = await apiFetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    if (res.ok) { alert('Product saved!'); document.getElementById('productForm').reset(); loadProducts(); }
    else alert('Error saving product');
}

async function loadProducts() {
    const res = await apiFetch(`${API_BASE}/products`);
    if (!res.ok) return;
    const products = await res.json();
    const tbody = document.querySelector('#productsTable tbody');
    tbody.innerHTML = '';
    products.forEach(p => {
        const row = tbody.insertRow();
        row.innerHTML = `<td>${p.id}</td><td>${p.name}</td><td>${p.category}</td><td>${p.brand}</td>
            <td>&#8377;${p.price}</td><td><button class="btn btn-danger" onclick="deleteProduct(${p.id})">Delete</button></td>`;
    });
}

async function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;
    const res = await apiFetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
    if (res.ok) { alert('Product deleted!'); loadProducts(); }
    else alert('Error deleting product');
}

// ── Payments ──────────────────────────────────────────────────────────────────
async function savePayment() {
    const payment = {
        payerName: document.getElementById('paymentCustomerName').value,
        paymentAmount: parseFloat(document.getElementById('paymentAmount').value),
        paymentDate: document.getElementById('paymentDate').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        paymentStatus: document.getElementById('paymentStatus').value
    };
    const res = await apiFetch(`${API_BASE}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
    });
    if (res.ok) { alert('Payment saved!'); document.getElementById('paymentForm').reset(); loadPayments(); }
    else alert('Error saving payment');
}

async function loadPayments() {
    const res = await apiFetch(`${API_BASE}/payments`);
    if (!res.ok) return;
    const payments = await res.json();
    const tbody = document.querySelector('#paymentsTable tbody');
    tbody.innerHTML = '';
    payments.forEach(p => {
        const row = tbody.insertRow();
        row.innerHTML = `<td>${p.customerName || '-'}</td><td>&#8377;${p.paymentAmount}</td>
            <td>${p.paymentDate}</td><td>${p.paymentMethod}</td>
            <td>${badge(p.paymentStatus)}</td>
            <td><button class="btn btn-danger" onclick="deletePayment(${p.id})">Delete</button></td>`;
    });
}

async function deletePayment(id) {
    if (!confirm('Delete this payment?')) return;
    const res = await apiFetch(`${API_BASE}/payments/${id}`, { method: 'DELETE' });
    if (res.ok) { alert('Payment deleted!'); loadPayments(); }
    else alert('Error deleting payment');
}

// ── Companies ─────────────────────────────────────────────────────────────────
async function saveCompany() {
    const company = {
        name: document.getElementById('companyName').value,
        address: document.getElementById('companyAddress').value,
        phoneNumber: document.getElementById('companyPhone').value
    };
    const res = await apiFetch(`${API_BASE}/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company)
    });
    if (res.ok) { alert('Company saved!'); document.getElementById('companyForm').reset(); loadCompanies(); }
    else alert('Error saving company');
}

async function loadCompanies() {
    const res = await apiFetch(`${API_BASE}/companies`);
    if (!res.ok) return;
    const companies = await res.json();
    const tbody = document.querySelector('#companiesTable tbody');
    tbody.innerHTML = '';
    companies.forEach(c => {
        const row = tbody.insertRow();
        row.innerHTML = `<td>${c.id}</td><td>${c.name}</td><td>${c.address}</td><td>${c.phoneNumber}</td>
            <td><button class="btn btn-danger" onclick="deleteCompany(${c.id})">Delete</button></td>`;
    });
}

async function deleteCompany(id) {
    if (!confirm('Delete this company?')) return;
    const res = await apiFetch(`${API_BASE}/companies/${id}`, { method: 'DELETE' });
    if (res.ok) { alert('Company deleted!'); loadCompanies(); }
    else alert('Error deleting company');
}

// ── Invoices ──────────────────────────────────────────────────────────────────
let currentInvoiceOfferId = null;

function generateManualInvoice() {
    const customerId = document.getElementById('invoiceCustomerId').value;
    const customerName = document.getElementById('invoiceCustomerName').value;
    const description = document.getElementById('invoiceDescription').value;
    const price = parseFloat(document.getElementById('invoicePrice').value) || 0;
    const discount = parseFloat(document.getElementById('invoiceDiscount').value) || 0;
    if (!customerName && !customerId) { alert('Please enter a Customer ID or Name'); return; }
    const discountAmount = (price * discount / 100).toFixed(2);
    const total = (price - discountAmount).toFixed(2);
    document.getElementById('ir-number').textContent = customerId ? `INV-${String(customerId).padStart(5,'0')}` : 'INV-DRAFT';
    document.getElementById('ir-customer').innerHTML = `<strong style="font-size:1rem;">${customerName || 'Customer #' + customerId}</strong>`;
    document.getElementById('ir-summary-price').textContent = `\u20B9${price.toFixed(2)}`;
    document.getElementById('ir-summary-discount').textContent = discount > 0 ? `${discount}% (-\u20B9${discountAmount})` : 'No discount';
    document.getElementById('ir-summary-total').textContent = `\u20B9${total}`;
    document.getElementById('ir-offer-body').innerHTML = `
        <tr>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;">${description || '-'}</td>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;">\u20B9${price.toFixed(2)}</td>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;">${discount > 0 ? discount + '% (-\u20B9' + discountAmount + ')' : '-'}</td>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#16a34a;">\u20B9${total}</td>
        </tr>`;
    document.getElementById('invoiceResult').classList.remove('hidden');
    document.getElementById('invoiceResult').scrollIntoView({ behavior: 'smooth' });
}

function searchInvoiceCustomer() {
    document.getElementById('invoiceCustomerList').classList.remove('hidden');
}

async function doSearchInvoiceCustomer() {
    const term = document.getElementById('invoiceCustomerSearch').value;
    if (!term) return;
    const url = term.includes('@') ? `${API_BASE}/customers/email/${term}` : `${API_BASE}/customers/phone/${term}`;
    const res = await apiFetch(url);
    if (!res.ok) { alert('Customer not found'); return; }
    const customer = await res.json();
    document.getElementById('invoiceCustomerId').value = customer.id;
    document.getElementById('invoiceCustomerName').value = customer.firstName + ' ' + customer.lastName;
    const offersRes = await apiFetch(`${API_BASE}/offers/customer/${customer.id}`);
    const offers = await offersRes.json();
    if (!offers.length) { alert('No offers found for this customer'); return; }
    const select = document.getElementById('invoiceOfferSelect');
    select.innerHTML = offers.map(o => `<option value="${o.id}">Offer #${o.id} - ${o.offerDetails} (${o.offerDate})</option>`).join('');
    select.style.display = 'block';
    document.getElementById('invoiceFromSelectBtn').style.display = 'inline-block';
}

async function loadInvoiceFromSelect() {
    const offerId = document.getElementById('invoiceOfferSelect').value;
    if (!offerId) return;
    currentInvoiceOfferId = offerId;
    const res = await apiFetch(`${API_BASE}/invoices/offer/${offerId}`);
    if (!res.ok) { alert('Invoice not found'); return; }
    const inv = await res.json();
    document.getElementById('invoiceCustomerName').value = inv.customerName || '';
    document.getElementById('invoiceDescription').value = inv.description || '';
    document.getElementById('invoicePrice').value = inv.price || 0;
    document.getElementById('invoiceDiscount').value = inv.discountPercent || 0;
    generateManualInvoice();
    document.getElementById('ir-number').textContent = `INV-${String(inv.invoiceNo).padStart(5,'0')}`;
}

function downloadInvoicePdf() {
    if (!currentInvoiceOfferId) return;
    apiFetch(`${API_BASE}/invoices/offer/${currentInvoiceOfferId}/pdf`)
        .then(res => {
            if (!res.ok) { alert('Error downloading PDF'); return; }
            return res.blob();
        })
        .then(blob => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${currentInvoiceOfferId}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
        });
}
