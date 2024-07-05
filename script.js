document.addEventListener('DOMContentLoaded', loadFormData);

const registroForm = document.querySelector('#customerForm');

registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombres = document.querySelector('#nombres').value.trim();
    const apellidos = document.querySelector('#apellidos').value.trim();
    const email = document.querySelector('#email').value.trim();
    const cedula = document.querySelector('#cedula').value.trim();
    const telefono = document.querySelector('#telefono').value.trim();
    const direccion = document.querySelector('#direccion').value.trim();

    const Clientes = JSON.parse(localStorage.getItem('Clientes')) || [];
    const isClienteRegistered = Clientes.find(cliente => cliente.cedula === cedula);

    if (isClienteRegistered) {
        return alert('El cliente ya está registrado!');
    }

    if (validateForm(nombres, apellidos, email, cedula, telefono, direccion)) {
        Clientes.push({ cedula, apellidos, nombres, direccion, telefono, email });
        localStorage.setItem('Clientes', JSON.stringify(Clientes));
        alert('Registro Exitoso!');
        registroForm.reset();
        window.location.href = 'registro.html';
    }
});

function validateForm(nombres, apellidos, email, cedula, telefono, direccion) {
    let isValid = true;

    const nombrePattern = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nombrePattern.test(nombres)) {
        showError('nombresError', 'Solo letras y espacios.');
        isValid = false;
    } else {
        clearError('nombresError');
    }

    if (!nombrePattern.test(apellidos)) {
        showError('apellidosError', 'Solo letras y espacios.');
        isValid = false;
    } else {
        clearError('apellidosError');
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        showError('emailError', 'Ingrese un correo electrónico válido.');
        isValid = false;
    } else {
        clearError('emailError');
    }

    const cedulaPattern = /^\d{10}$/;
    if (!cedulaPattern.test(cedula)) {
        showError('cedulaError', 'Debe contener 10 dígitos.');
        isValid = false;
    } else {
        clearError('cedulaError');
    }

    const telefonoPattern = /^\d{10}$/;
    if (!telefonoPattern.test(telefono)) {
        showError('telefonoError', 'Debe contener 10 dígitos.');
        isValid = false;
    } else {
        clearError('telefonoError');
    }

    const direccionPattern = /^[A-Za-z0-9À-ÿ\s]+$/;
    if (!direccionPattern.test(direccion)) {
        showError('direccionError', 'Solo letras, números y espacios.');
        isValid = false;
    } else {
        clearError('direccionError');
    }

    return isValid;
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.innerText = message;
    errorElement.style.display = 'block';
}

function clearError(id) {
    const errorElement = document.getElementById(id);
    errorElement.innerText = '';
    errorElement.style.display = 'none';
}

function loadFormData() {
    const Clientes = JSON.parse(localStorage.getItem('Clientes')) || [];
    if (Clientes.length > 0) {
        const lastCliente = Clientes[Clientes.length - 1];
        document.querySelector('#nombres').value = lastCliente.nombres;
        document.querySelector('#apellidos').value = lastCliente.apellidos;
        document.querySelector('#email').value = lastCliente.email;
        document.querySelector('#cedula').value = lastCliente.cedula;
        document.querySelector('#telefono').value = lastCliente.telefono;
        document.querySelector('#direccion').value = lastCliente.direccion;
    }
}
