const API_BASE = 'http://localhost:8081/api';

// Tab Management handled in index.html

// Customer Functions
async function saveCustomer() {
    const customer = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    try {
        const response = await fetch(`${API_BASE}/customers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        });
        
        if (response.ok) {
            alert('Customer saved successfully!');
            document.getElementById('customerForm').reset();
            loadCustomers();
        } else {
            alert('Error saving customer');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function loadCustomers() {
    try {
        const response = await fetch(`${API_BASE}/customers`);
        const customers = await response.json();
        
        const tbody = document.querySelector('#customersTable tbody');
        tbody.innerHTML = '';
        
        customers.forEach(customer => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.firstName} ${customer.lastName}</td>
                <td>${customer.email}</td>
                <td>${customer.phone || ''}</td>
                <td><button class="btn btn-danger" onclick="deleteCustomer(${customer.id})">Delete</button></td>
            `;
        });
    } catch (error) {
        alert('Error loading customers: ' + error.message);
    }
}

async function searchCustomer() {
    const searchTerm = document.getElementById('customerSearch').value;
    if (!searchTerm) return;

    try {
        let url = `${API_BASE}/customers/email/${searchTerm}`;
        if (!searchTerm.includes('@')) {
            url = `${API_BASE}/customers/phone/${searchTerm}`;
        }
        
        const response = await fetch(url);
        if (response.ok) {
            const customer = await response.json();
            const tbody = document.querySelector('#customersTable tbody');
            tbody.innerHTML = `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.firstName} ${customer.lastName}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone || ''}</td>
                    <td><button class="btn btn-danger" onclick="deleteCustomer(${customer.id})">Delete</button></td>
                </tr>
            `;
        } else {
            alert('Customer not found');
        }
    } catch (error) {
        alert('Error searching customer: ' + error.message);
    }
}

async function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        try {
            const response = await fetch(`${API_BASE}/customers/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Customer deleted successfully!');
                loadCustomers();
            } else {
                alert('Error deleting customer');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Product Functions
async function saveProduct() {
    const product = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        brand: document.getElementById('productBrand').value,
        price: parseFloat(document.getElementById('productPrice').value)
    };

    try {
        const response = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        
        if (response.ok) {
            alert('Product saved successfully!');
            document.getElementById('productForm').reset();
            loadProducts();
        } else {
            alert('Error saving product');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        const products = await response.json();
        
        const tbody = document.querySelector('#productsTable tbody');
        tbody.innerHTML = '';
        
        products.forEach(product => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.brand}</td>
                <td>&#8377;${product.price}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;
        });
    } catch (error) {
        alert('Error loading products: ' + error.message);
    }
}

async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Product deleted successfully!');
                loadProducts();
            } else {
                alert('Error deleting product');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Payment Functions
async function savePayment() {
    const payment = {
        payerName: document.getElementById('paymentCustomerName').value,
        paymentAmount: parseFloat(document.getElementById('paymentAmount').value),
        paymentDate: document.getElementById('paymentDate').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        paymentStatus: document.getElementById('paymentStatus').value
    };

    try {
        const response = await fetch(`${API_BASE}/payments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment)
        });
        
        if (response.ok) {
            alert('Payment saved successfully!');
            document.getElementById('paymentForm').reset();
            loadPayments();
        } else {
            alert('Error saving payment');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function loadPayments() {
    try {
        const response = await fetch(`${API_BASE}/payments`);
        const payments = await response.json();
        
        const tbody = document.querySelector('#paymentsTable tbody');
        tbody.innerHTML = '';
        
        payments.forEach(payment => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${payment.customerName || '-'}</td>
                <td>&#8377;${payment.paymentAmount}</td>
                <td>${payment.paymentDate}</td>
                <td>${payment.paymentMethod}</td>
                <td>${badge(payment.paymentStatus)}</td>
                <td><button class="btn btn-danger" onclick="deletePayment(${payment.id})">Delete</button></td>
            `;
        });
    } catch (error) {
        alert('Error loading payments: ' + error.message);
    }
}

async function deletePayment(id) {
    if (confirm('Are you sure you want to delete this payment?')) {
        try {
            const response = await fetch(`${API_BASE}/payments/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Payment deleted successfully!');
                loadPayments();
            } else {
                alert('Error deleting payment');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Company Functions
async function saveCompany() {
    const company = {
        name: document.getElementById('companyName').value,
        address: document.getElementById('companyAddress').value,
        phoneNumber: document.getElementById('companyPhone').value
    };

    try {
        const response = await fetch(`${API_BASE}/companies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(company)
        });
        
        if (response.ok) {
            alert('Company saved successfully!');
            document.getElementById('companyForm').reset();
            loadCompanies();
        } else {
            alert('Error saving company');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function loadCompanies() {
    try {
        const response = await fetch(`${API_BASE}/companies`);
        const companies = await response.json();
        
        const tbody = document.querySelector('#companiesTable tbody');
        tbody.innerHTML = '';
        
        companies.forEach(company => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${company.id}</td>
                <td>${company.name}</td>
                <td>${company.address}</td>
                <td>${company.phoneNumber}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteCompany(${company.id})">Delete</button>
                </td>
            `;
        });
    } catch (error) {
        alert('Error loading companies: ' + error.message);
    }
}

async function deleteCompany(id) {
    if (confirm('Are you sure you want to delete this company?')) {
        try {
            const response = await fetch(`${API_BASE}/companies/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Company deleted successfully!');
                loadCompanies();
            } else {
                alert('Error deleting company');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Invoice Functions
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
    document.getElementById('ir-summary-price').textContent = `&#8377;${price.toFixed(2)}`;
    document.getElementById('ir-summary-discount').textContent = discount > 0 ? `${discount}% (-&#8377;${discountAmount})` : 'No discount';
    document.getElementById('ir-summary-total').textContent = `&#8377;${total}`;
    document.getElementById('ir-offer-body').innerHTML = `
        <tr>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;">${description || '-'}</td>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;">&#8377;${price.toFixed(2)}</td>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;">${discount > 0 ? discount + '% (-$' + discountAmount + ')' : '-'}</td>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#16a34a;">&#8377;${total}</td>
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
    try {
        const url = term.includes('@') ? `${API_BASE}/customers/email/${term}` : `${API_BASE}/customers/phone/${term}`;
        const res = await fetch(url);
        if (!res.ok) { alert('Customer not found'); return; }
        const customer = await res.json();
        document.getElementById('invoiceCustomerId').value = customer.id;
        document.getElementById('invoiceCustomerName').value = customer.firstName + ' ' + customer.lastName;
        const offersRes = await fetch(`${API_BASE}/offers/customer/${customer.id}`);
        const offers = await offersRes.json();
        if (!offers.length) { alert('No offers found for this customer'); return; }
        const select = document.getElementById('invoiceOfferSelect');
        select.innerHTML = offers.map(o => `<option value="${o.id}">Offer #${o.id} - ${o.offerDetails} (${o.offerDate})</option>`).join('');
        select.style.display = 'block';
        document.getElementById('invoiceFromSelectBtn').style.display = 'inline-block';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function loadInvoiceFromSelect() {
    const offerId = document.getElementById('invoiceOfferSelect').value;
    if (!offerId) return;
    currentInvoiceOfferId = offerId;
    try {
        const response = await fetch(`${API_BASE}/invoices/offer/${offerId}`);
        if (!response.ok) { alert('Invoice not found'); return; }
        const inv = await response.json();
        document.getElementById('invoiceCustomerName').value = inv.customerName || '';
        document.getElementById('invoiceDescription').value = inv.description || '';
        document.getElementById('invoicePrice').value = inv.price || 0;
        document.getElementById('invoiceDiscount').value = inv.discountPercent || 0;
        generateManualInvoice();
        document.getElementById('ir-number').textContent = `INV-${String(inv.invoiceNo).padStart(5,'0')}`;
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function loadInvoice(offerId) {
    currentInvoiceOfferId = offerId;
    try {
        const response = await fetch(`${API_BASE}/invoices/offer/${offerId}`);
        if (!response.ok) { alert('Invoice not found for offer ID: ' + offerId); return; }
        const inv = await response.json();
        document.getElementById('invoiceCustomerName').value = inv.customerName || '';
        document.getElementById('invoiceDescription').value = inv.description || '';
        document.getElementById('invoicePrice').value = inv.price || 0;
        document.getElementById('invoiceDiscount').value = inv.discountPercent || 0;
        generateManualInvoice();
        document.getElementById('ir-number').textContent = `INV-${String(inv.invoiceNo).padStart(5,'0')}`;
    } catch (error) {
        alert('Error loading invoice: ' + error.message);
    }
}

function downloadInvoicePdf() {
    if (!currentInvoiceOfferId) return;
    window.location.href = `${API_BASE}/invoices/offer/${currentInvoiceOfferId}/pdf`;
}

// Load initial data silently (no error toast on startup)
document.addEventListener('DOMContentLoaded', function() {
    fetch(`${API_BASE}/customers`)
        .then(r => r.json())
        .then(customers => {
            const tbody = document.querySelector('#customersTable tbody');
            customers.forEach(customer => {
                const row = tbody.insertRow();
                row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.firstName} ${customer.lastName}</td>
                <td>${customer.email}</td>
                <td>${customer.phone || ''}</td>
                <td><button class="btn btn-danger" onclick="deleteCustomer(${customer.id})">Delete</button></td>`;
            });
        })
        .catch(() => {});
});

