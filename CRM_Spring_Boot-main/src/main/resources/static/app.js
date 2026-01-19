const API_BASE = 'http://localhost:8080/api';

// Tab Management
function showTab(tabName) {
    document.querySelectorAll('.content').forEach(content => content.classList.add('hidden'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(tabName).classList.remove('hidden');
    event.target.classList.add('active');
}

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
                <td>
                    <button class="btn btn-danger" onclick="deleteCustomer(${customer.id})">Delete</button>
                </td>
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
                    <td>
                        <button class="btn btn-danger" onclick="deleteCustomer(${customer.id})">Delete</button>
                    </td>
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

// Offer Functions
async function saveOffer() {
    const offer = {
        customerId: parseInt(document.getElementById('offerCustomerId').value),
        companyId: parseInt(document.getElementById('offerCompanyId').value),
        offerDetails: document.getElementById('offerDetails').value,
        offerDate: document.getElementById('offerDate').value,
        offerStatus: document.getElementById('offerStatus').value
    };

    try {
        const response = await fetch(`${API_BASE}/offers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(offer)
        });
        
        if (response.ok) {
            alert('Offer saved successfully!');
            document.getElementById('offerForm').reset();
            loadOffers();
        } else {
            alert('Error saving offer');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function loadOffers() {
    try {
        const response = await fetch(`${API_BASE}/offers`);
        const offers = await response.json();
        
        const tbody = document.querySelector('#offersTable tbody');
        tbody.innerHTML = '';
        
        offers.forEach(offer => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${offer.id}</td>
                <td>${offer.customerId}</td>
                <td>${offer.offerDetails}</td>
                <td>${offer.offerDate}</td>
                <td>${offer.offerStatus}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteOffer(${offer.id})">Delete</button>
                </td>
            `;
        });
    } catch (error) {
        alert('Error loading offers: ' + error.message);
    }
}

async function deleteOffer(id) {
    if (confirm('Are you sure you want to delete this offer?')) {
        try {
            const response = await fetch(`${API_BASE}/offers/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Offer deleted successfully!');
                loadOffers();
            } else {
                alert('Error deleting offer');
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
                <td>$${product.price}</td>
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
        offerId: parseInt(document.getElementById('paymentOfferId').value),
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
                <td>${payment.id}</td>
                <td>${payment.offerId}</td>
                <td>$${payment.paymentAmount}</td>
                <td>${payment.paymentDate}</td>
                <td>${payment.paymentMethod}</td>
                <td>${payment.paymentStatus}</td>
                <td>
                    <button class="btn btn-danger" onclick="deletePayment(${payment.id})">Delete</button>
                </td>
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

// Load initial data
document.addEventListener('DOMContentLoaded', function() {
    loadCustomers();
});