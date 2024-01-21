document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const totalPrice = document.getElementById('total-price');

    fetch('products.csv')
        .then(response => response.text())
        .then(csvData => {
            processCSV(csvData);
        })
        .catch(error => {
            console.error('CSVファイルの読み込みに失敗しました:', error);
        });

    function processCSV(csvData) {
        productList.innerHTML = '';
        const products = csvData.split('\n').slice(1);
        products.forEach(product => {
            const [name, price] = product.split(',');
            if (!name || !price) return;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = price;
            checkbox.onchange = updateTotal;

            const label = document.createElement('label');
            label.textContent = `${name} (${price}円)`;
            label.insertBefore(checkbox, label.firstChild);

            productList.appendChild(label);
            productList.appendChild(document.createElement('br'));
        });
    }

    function updateTotal() {
        let sum = 0;
        document.querySelectorAll('#product-list input[type=checkbox]:checked').forEach(checkbox => {
            sum += parseInt(checkbox.value);
        });
        totalPrice.textContent = sum;
    }
});
