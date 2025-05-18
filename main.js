// إدارة الحالة
const state = {
    user: null,
    tasks: [],
    rewards: [],
    points: 0,
    isNightMode: false
};

// التحكم في النوافذ المنبثقة
const modals = {
    login: document.getElementById('loginModal'),
    addTask: document.getElementById('addTaskModal')
};

// أزرار إغلاق النوافذ المنبثقة
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        Object.values(modals).forEach(modal => {
            modal.style.display = 'none';
        });
    });
});

// إغلاق النافذة المنبثقة عند النقر خارجها
window.addEventListener('click', (event) => {
    Object.values(modals).forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// زر تسجيل الدخول
document.getElementById('loginBtn').addEventListener('click', () => {
    modals.login.style.display = 'block';
});

// نموذج تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // هنا يتم إضافة منطق تسجيل الدخول مع Firebase
        console.log('محاولة تسجيل الدخول:', { email, password });
        modals.login.style.display = 'none';
    } catch (error) {
        console.error('خطأ في تسجيل الدخول:', error);
        alert('حدث خطأ في تسجيل الدخول. الرجاء المحاولة مرة أخرى.');
    }
});

// إضافة مهمة جديدة
document.getElementById('addTaskBtn').addEventListener('click', () => {
    modals.addTask.style.display = 'block';
});

document.getElementById('addTaskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const time = document.getElementById('taskTime').value;
    const points = document.getElementById('taskPoints').value;

    try {
        const task = {
            id: Date.now().toString(),
            title,
            time,
            points: parseInt(points),
            completed: false,
            createdAt: new Date()
        };

        // إضافة المهمة إلى القائمة
        state.tasks.push(task);
        renderTasks();
        modals.addTask.style.display = 'none';
        e.target.reset();
    } catch (error) {
        console.error('خطأ في إضافة المهمة:', error);
        alert('حدث خطأ في إضافة المهمة. الرجاء المحاولة مرة أخرى.');
    }
});

// عرض المهام
function renderTasks() {
    const tasksGrid = document.querySelector('.tasks-grid');
    const addTaskCard = tasksGrid.querySelector('.add-task-card');
    
    // إزالة جميع المهام الحالية
    Array.from(tasksGrid.children).forEach(child => {
        if (!child.classList.contains('add-task-card')) {
            child.remove();
        }
    });

    // إضافة المهام الجديدة
    state.tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p>الوقت: ${task.time}</p>
            <p>النقاط: ${task.points} 🌟</p>
            <button onclick="completeTask('${task.id}')" 
                    class="complete-btn ${task.completed ? 'completed' : ''}">
                ${task.completed ? 'تم ✓' : 'إكمال المهمة'}
            </button>
        `;
        tasksGrid.insertBefore(taskCard, addTaskCard);
    });
}

// إكمال المهمة
function completeTask(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
        task.completed = true;
        state.points += task.points;
        updatePoints();
        renderTasks();
        playSuccessSound();
    }
}

// تحديث النقاط
function updatePoints() {
    document.getElementById('userPoints').textContent = state.points;
}

// تشغيل صوت النجاح
function playSuccessSound() {
    const audio = new Audio('sounds/success.mp3');
    audio.play().catch(console.error);
}

// الوضع الليلي
function toggleNightMode() {
    state.isNightMode = !state.isNightMode;
    document.body.classList.toggle('night-mode', state.isNightMode);
}

// تهيئة التطبيق
function initApp() {
    renderTasks();
    updatePoints();
    
    // التحقق من الوقت لتفعيل الوضع الليلي تلقائياً
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) {
        toggleNightMode();
    }
}

// بدء التطبيق
initApp(); 