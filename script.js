// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 1. EVENT LISTENERS SECTION
    // ===============================================
    
    // Color box event listeners
    const colorBoxes = document.querySelectorAll('.color-box');
    const colorDisplay = document.getElementById('color-display');
    
    colorBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Get the background color of the clicked box
            const computedStyle = window.getComputedStyle(this);
            const backgroundColor = computedStyle.backgroundColor;
            
            // Update the display box
            colorDisplay.style.backgroundColor = backgroundColor;
            
            // Update the text in the display
            const colorName = this.id.charAt(0).toUpperCase() + this.id.slice(1);
            colorDisplay.textContent = `${colorName} selected!`;
        });
    });
    
    // Hover demo
    const hoverButton = document.getElementById('hover-button');
    const hoverResult = document.getElementById('hover-result');
    
    hoverButton.addEventListener('mouseenter', function() {
        hoverResult.textContent = 'Mouse entered the button!';
        hoverButton.style.backgroundColor = '#2ecc71';
    });
    
    hoverButton.addEventListener('mouseleave', function() {
        hoverResult.textContent = 'Mouse left the button!';
        hoverButton.style.backgroundColor = '#3498db';
    });
    
    // Add a keyboard event listener to the document
    document.addEventListener('keydown', function(event) {
        if (event.key === 'r') {
            document.getElementById('red').click();
        } else if (event.key === 'g') {
            document.getElementById('green').click();
        } else if (event.key === 'b') {
            document.getElementById('blue').click();
        }
    });
    
    // ===============================================
    // 2. FORM VALIDATION SECTION
    // ===============================================
    const signupForm = document.getElementById('signup-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const formSuccess = document.getElementById('form-success');
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to validate password strength
    function isValidPassword(password) {
        // At least 8 characters, contains both letters and numbers
        return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
    }
    
    // Real-time validation for username
    usernameInput.addEventListener('input', function() {
        if (this.value.length <.4) {
            usernameError.style.display = 'block';
        } else {
            usernameError.style.display = 'none';
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        if (!isValidEmail(this.value)) {
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });
    
    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
        if (!isValidPassword(this.value)) {
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
        
        // Check if confirm password matches
        if (confirmPasswordInput.value && this.value !== confirmPasswordInput.value) {
            confirmPasswordError.style.display = 'block';
        } else {
            confirmPasswordError.style.display = 'none';
        }
    });
    
    // Real-time validation for confirm password
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            confirmPasswordError.style.display = 'block';
        } else {
            confirmPasswordError.style.display = 'none';
        }
    });
    
    // Form submission handler
    signupForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        // Username validation
        if (usernameInput.value.length < 4) {
            usernameError.style.display = 'block';
            isValid = false;
        } else {
            usernameError.style.display = 'none';
        }
        
        // Email validation
        if (!isValidEmail(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Password validation
        if (!isValidPassword(passwordInput.value)) {
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }
        
        // Confirm password validation
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.style.display = 'block';
            isValid = false;
        } else {
            confirmPasswordError.style.display = 'none';
        }
        
        // If all validations pass
        if (isValid) {
            // Show success message
            formSuccess.style.display = 'block';
            
            // Reset the form
            setTimeout(() => {
                signupForm.reset();
                formSuccess.style.display = 'none';
            }, 3000);
        }
    });
    
    // ===============================================
    // 3. INTERACTIVE ELEMENTS SECTION
    // ===============================================
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    
    // Load todos from localStorage if available
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Render existing todos
    function renderTodos() {
        // Clear the current list
        todoList.innerHTML = '';
        
        // Add each todo to the list
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.className = 'todo-item';
            
            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(index));
            
            // Create todo text
            const todoText = document.createElement('span');
            todoText.className = 'todo-text';
            todoText.textContent = todo.text;
            if (todo.completed) {
                todoText.classList.add('completed');
            }
            
            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTodo(index));
            
            // Add elements to the todo item
            todoItem.appendChild(checkbox);
            todoItem.appendChild(todoText);
            todoItem.appendChild(deleteButton);
            
            // Add item to the list
            todoList.appendChild(todoItem);
        });
        
        // Save to localStorage
        saveTodos();
    }
    
    // Add a new todo
    function addTodo() {
        const todoText = todoInput.value.trim();
        
        if (todoText) {
            todos.push({
                text: todoText,
                completed: false
            });
            
            todoInput.value = '';
            renderTodos();
        }
    }
    
    // Toggle todo completion status
    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }
    
    // Delete a todo
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Event listener for the add button
    addTodoButton.addEventListener('click', addTodo);
    
    // Event listener for the enter key in the input field
    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTodo();
        }
    });
    
    // Initialize the todo list
    renderTodos();
});